import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Calendar, Clock, Users, ChevronRight, Play, Pause } from "lucide-react";

const SchedulingDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [conflicts, setConflicts] = useState(0);
  const [resolved, setResolved] = useState(0);

  const demoSteps = [
    "Collecting user availability...",
    "Analyzing constraints...", 
    "Detecting conflicts...",
    "Generating recommendations...",
    "Auto-resolving conflicts...",
    "Finalizing schedules..."
  ];

  const participants = [
    { name: "Dr. Smith", role: "Doctor", available: "9AM-5PM", status: "scheduled" },
    { name: "Patient A", role: "Patient", available: "10AM-2PM", status: "scheduled" },
    { name: "Patient B", role: "Patient", available: "2PM-6PM", status: "conflict" },
    { name: "Prof. Johnson", role: "Instructor", available: "1PM-4PM", status: "rescheduled" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= demoSteps.length - 1) {
            setIsRunning(false);
            return 0;
          }
          if (prev === 2) setConflicts(3);
          if (prev === 4) setResolved(3);
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startDemo = () => {
    setIsRunning(true);
    setStep(0);
    setConflicts(0);
    setResolved(0);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch our intelligent algorithm in action as it resolves scheduling conflicts in real-time
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Algorithm Visualization */}
          <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Smart Algorithm Engine</span>
                <Button 
                  onClick={startDemo} 
                  variant={isRunning ? "secondary" : "hero"}
                  disabled={isRunning}
                  className="ml-4"
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Demo
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {demoSteps.map((stepText, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                    index <= step ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index < step ? 'bg-primary text-primary-foreground' : 
                    index === step ? 'bg-primary animate-pulse-glow text-primary-foreground' : 
                    'bg-muted-foreground/20'
                  }`}>
                    {index < step ? '✓' : index + 1}
                  </div>
                  <span className={`transition-all duration-500 ${
                    index <= step ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {stepText}
                  </span>
                  {index === step && isRunning && (
                    <div className="ml-auto">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    </div>
                  )}
                </div>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{conflicts}</div>
                  <p className="text-xs text-muted-foreground">Conflicts Detected</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{resolved}</div>
                  <p className="text-xs text-muted-foreground">Auto-Resolved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Participants */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Live Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {participants.map((participant, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-500 animate-fade-in hover:shadow-md ${
                    participant.status === 'scheduled' ? 'bg-green-50 border-green-200' :
                    participant.status === 'conflict' ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-sm text-muted-foreground">{participant.role}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {participant.available}
                      </div>
                    </div>
                    <Badge 
                      variant={
                        participant.status === 'scheduled' ? 'default' :
                        participant.status === 'conflict' ? 'destructive' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {participant.status}
                    </Badge>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-gradient-secondary rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Generated Schedule
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Dr. Smith ↔ Patient A</span>
                    <span className="text-primary font-medium">10:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prof. Johnson ↔ Student Group</span>
                    <span className="text-primary font-medium">2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dr. Smith ↔ Patient B</span>
                    <span className="text-blue-600 font-medium">4:00 PM (Rescheduled)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SchedulingDemo;