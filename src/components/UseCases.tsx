import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  GraduationCap, 
  Building, 
  Phone, 
  Trophy,
  Landmark
} from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: Stethoscope,
      title: "Healthcare",
      subtitle: "Doctors & Patients",
      description: "Intelligent distribution of appointment slots across doctors and patients. Automatically reschedules when doctors cancel, minimizing disruption.",
      features: ["Doctor availability management", "Patient preference matching", "Emergency rescheduling", "Conflict resolution"],
      badge: "Critical"
    },
    {
      icon: GraduationCap,
      title: "Education",
      subtitle: "Instructors & Students",
      description: "Schedules tutoring sessions and group classes, matching student availability with instructor schedules for optimal learning outcomes.",
      features: ["1-to-1 tutoring", "Group sessions", "Course scheduling", "Instructor assignments"],
      badge: "Academic"
    },
    {
      icon: Building,
      title: "Corporate",
      subtitle: "Training & Meetings",
      description: "Assigns employees to training sessions and meetings while respecting shift timings and avoiding room conflicts.",
      features: ["Training assignments", "Room booking", "Shift management", "Department coordination"],
      badge: "Enterprise"
    },
    {
      icon: Phone,
      title: "Call Centers",
      subtitle: "Customer Support",
      description: "Distributes calls based on agent availability, skills, and workload to optimize customer service efficiency.",
      features: ["Skill-based routing", "Load balancing", "Language matching", "Queue management"],
      badge: "Service"
    },
    {
      icon: Trophy,
      title: "Sports Teams",
      subtitle: "Training & Matches",
      description: "Schedules team training and matches considering player availability, field booking, and referee schedules.",
      features: ["Team coordination", "Field management", "Referee scheduling", "Multi-team matches"],
      badge: "Sports"
    },
    {
      icon: Landmark,
      title: "Banking",
      subtitle: "Customer Appointments",
      description: "Matches customers with financial advisors based on expertise, availability, and customer preferences.",
      features: ["Advisor matching", "Expertise alignment", "Customer preferences", "Branch coordination"],
      badge: "Financial"
    }
  ];

  return (
    <section id="use-cases" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Industry Applications
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From healthcare to education, our smart scheduling system adapts to any industry's 
            unique requirements and constraints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <useCase.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {useCase.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-1">
                  {useCase.title}
                </CardTitle>
                <p className="text-sm text-primary font-medium">
                  {useCase.subtitle}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="leading-relaxed">
                  {useCase.description}
                </CardDescription>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Key Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;