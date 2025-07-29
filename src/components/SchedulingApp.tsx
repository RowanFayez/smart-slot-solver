import { useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar as CalendarIcon, Users, Clock, Vote, Check, X } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type SchedulingStep = 'calendar' | 'participants' | 'type' | 'availability' | 'processing' | 'results' | 'polling';
type SchedulingType = 'one_vs_one' | 'one_vs_group' | 'group_vs_group';

interface Participant {
  id?: string;
  name: string;
  email: string;
  group_name?: string;
  availability?: Date[];
}

interface ScheduledEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  participants: string[];
}

const SchedulingApp = () => {
  const [currentStep, setCurrentStep] = useState<SchedulingStep>('calendar');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [schedulingType, setSchedulingType] = useState<SchedulingType>();
  const [projectId, setProjectId] = useState<string>();
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [pollResults, setPollResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDates(prev => {
      const exists = prev.some(d => d.toDateString() === date.toDateString());
      if (exists) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      }
      return [...prev, date];
    });
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate CSV parsing
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      
      const parsedParticipants: Participant[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= 2) {
          parsedParticipants.push({
            name: values[0]?.trim() || '',
            email: values[1]?.trim() || '',
            group_name: values[2]?.trim() || undefined
          });
        }
      }
      setParticipants(parsedParticipants);
      toast({
        title: "Participants loaded",
        description: `${parsedParticipants.length} participants imported successfully`
      });
    };
    reader.readAsText(file);
  };

  const addParticipant = () => {
    setParticipants(prev => [...prev, { name: '', email: '', group_name: '' }]);
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    setParticipants(prev => prev.map((p, i) => 
      i === index ? { ...p, [field]: value } : p
    ));
  };

  const createProject = async () => {
    try {
      const { data, error } = await supabase
        .from('scheduling_projects')
        .insert({
          name: projectName,
          description: projectDescription,
          scheduling_type: schedulingType,
          status: 'collecting_availability'
        })
        .select()
        .single();

      if (error) throw error;
      
      setProjectId(data.id);
      
      // Insert participants
      const participantData = participants.map(p => ({
        project_id: data.id,
        name: p.name,
        email: p.email,
        group_name: p.group_name || null
      }));
      
      await supabase.from('participants').insert(participantData);
      
      setCurrentStep('availability');
      toast({
        title: "Project created",
        description: "Now collecting participant availability"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
    }
  };

  const processScheduling = async () => {
    setCurrentStep('processing');
    
    // Simulate algorithm processing
    setTimeout(async () => {
      try {
        // Create dummy scheduled events
        const events = [
          {
            project_id: projectId!,
            title: `${schedulingType?.replace('_', ' ')} Meeting 1`,
            start_time: selectedDates[0]?.toISOString() || new Date().toISOString(),
            end_time: new Date(selectedDates[0]?.getTime() + 3600000 || Date.now() + 3600000).toISOString(),
            participants: participants.slice(0, 2).map(p => p.name)
          }
        ];
        
        const { data, error } = await supabase
          .from('scheduled_events')
          .insert(events)
          .select();
          
        if (error) throw error;
        
        setScheduledEvents(data);
        setCurrentStep('results');
        
        // Create poll
        await supabase.from('polls').insert({
          project_id: projectId!,
          question: 'Is this schedule acceptable for you?'
        });
        
        toast({
          title: "Schedule generated",
          description: "Algorithm has found optimal time slots"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process scheduling",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const startPolling = () => {
    setCurrentStep('polling');
    toast({
      title: "Poll started",
      description: "Participants can now vote on the schedule"
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'calendar':
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <CalendarIcon className="h-6 w-6 mr-2" />
                Select Available Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex justify-center">
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates || [])}
                    className="rounded-md border shadow-lg p-4"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Describe your scheduling requirements"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Selected Dates</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDates.map((date, index) => (
                        <Badge key={index} variant="secondary">
                          {format(date, 'MMM dd, yyyy')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setCurrentStep('participants')} 
                disabled={selectedDates.length === 0 || !projectName}
                className="w-full"
                size="lg"
              >
                Continue to Participants
              </Button>
            </CardContent>
          </Card>
        );

      case 'participants':
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="h-6 w-6 mr-2" />
                Add Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">Upload CSV File</Label>
                    <div className="mt-2">
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload participants CSV
                          </span>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <Button onClick={addParticipant} variant="outline" className="w-full">
                    Add Participant Manually
                  </Button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {participants.map((participant, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 p-2 border rounded">
                      <Input
                        placeholder="Name"
                        value={participant.name}
                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Email"
                        value={participant.email}
                        onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                      />
                      <Input
                        placeholder="Group (optional)"
                        value={participant.group_name || ''}
                        onChange={(e) => updateParticipant(index, 'group_name', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                onClick={() => setCurrentStep('type')} 
                disabled={participants.length === 0}
                className="w-full"
                size="lg"
              >
                Continue to Scheduling Type
              </Button>
            </CardContent>
          </Card>
        );

      case 'type':
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Select Scheduling Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div 
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    schedulingType === 'one_vs_one' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSchedulingType('one_vs_one')}
                >
                  <h3 className="font-semibold text-lg">One vs One</h3>
                  <p className="text-muted-foreground">Individual meetings between two participants</p>
                </div>
                <div 
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    schedulingType === 'one_vs_group' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSchedulingType('one_vs_group')}
                >
                  <h3 className="font-semibold text-lg">One vs Group</h3>
                  <p className="text-muted-foreground">One participant meeting with multiple groups</p>
                </div>
                <div 
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    schedulingType === 'group_vs_group' ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSchedulingType('group_vs_group')}
                >
                  <h3 className="font-semibold text-lg">Group vs Group</h3>
                  <p className="text-muted-foreground">Multiple groups meeting with each other</p>
                </div>
              </div>
              <Button 
                onClick={createProject} 
                disabled={!schedulingType}
                className="w-full"
                size="lg"
              >
                Create Project & Collect Availability
              </Button>
            </CardContent>
          </Card>
        );

      case 'availability':
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Clock className="h-6 w-6 mr-2" />
                Collecting Participant Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg mb-4">
                  Participants are being notified to submit their availability
                </p>
                <div className="space-y-2">
                  {participants.map((participant, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <span>{participant.name}</span>
                      <Badge variant={Math.random() > 0.5 ? "default" : "secondary"}>
                        {Math.random() > 0.5 ? "Submitted" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={processScheduling} className="w-full" size="lg">
                Start Algorithm Processing
              </Button>
            </CardContent>
          </Card>
        );

      case 'processing':
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Processing Schedule</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="animate-spin h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-lg">Algorithm is finding optimal time slots...</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Analyzing participant availability</p>
                <p>✓ Detecting conflicts</p>
                <p>⟳ Optimizing schedule...</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'results':
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Check className="h-6 w-6 mr-2" />
                Generated Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {scheduledEvents.map((event, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-muted-foreground">
                      {format(new Date(event.start_time), 'PPP p')} - {format(new Date(event.end_time), 'p')}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">Participants: </span>
                      {event.participants.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={startPolling} className="w-full" size="lg">
                Start Participant Poll
              </Button>
            </CardContent>
          </Card>
        );

      case 'polling':
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Vote className="h-6 w-6 mr-2" />
                Participant Poll Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-lg">Is this schedule acceptable for you?</p>
              </div>
              <div className="space-y-4">
                {participants.map((participant, index) => {
                  const response = Math.random() > 0.3 ? 'accept' : Math.random() > 0.5 ? 'reject' : 'suggest_change';
                  return (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">{participant.name}</span>
                      <div className="flex items-center space-x-2">
                        {response === 'accept' && (
                          <Badge className="bg-green-500">
                            <Check className="h-3 w-3 mr-1" />
                            Accepted
                          </Badge>
                        )}
                        {response === 'reject' && (
                          <Badge variant="destructive">
                            <X className="h-3 w-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                        {response === 'suggest_change' && (
                          <Badge variant="secondary">Suggest Change</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center pt-4">
                <p className="text-lg font-semibold">
                  Poll Results: {Math.floor(Math.random() * 20 + 70)}% Acceptance Rate
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Smart Scheduling System
            </span>
          </h1>
          <div className="flex justify-center items-center space-x-4 text-sm">
            {['Calendar', 'Participants', 'Type', 'Availability', 'Processing', 'Results', 'Poll'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  index <= ['calendar', 'participants', 'type', 'availability', 'processing', 'results', 'polling'].indexOf(currentStep)
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 hidden sm:inline">{step}</span>
                {index < 6 && <div className="w-8 h-px bg-border ml-2" />}
              </div>
            ))}
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default SchedulingApp;