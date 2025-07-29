import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Cog, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle, 
  Bell,
  ArrowRight
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      number: "01",
      title: "Data Collection",
      description: "System collects availability, preferences, and constraints from all participants including blackout days, preferred times, and priority levels.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cog,
      number: "02", 
      title: "Intelligent Matching",
      description: "Advanced algorithms analyze all constraints and preferences to create optimal schedule combinations for maximum satisfaction.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: AlertCircle,
      number: "03",
      title: "Conflict Detection",
      description: "Real-time monitoring identifies potential conflicts, double-bookings, or constraint violations before they become problems.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Lightbulb,
      number: "04",
      title: "Smart Recommendations",
      description: "When conflicts arise, the recommendation engine suggests alternative solutions including constraint relaxation or priority adjustments.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      number: "05",
      title: "Auto-Resolution",
      description: "System automatically implements approved solutions and dynamically re-schedules all affected appointments across the network.",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Bell,
      number: "06",
      title: "Notifications",
      description: "All participants receive instant notifications about schedule confirmations, changes, and reminders through their preferred channels.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent system follows a sophisticated 6-step process to ensure 
            optimal scheduling with minimal human intervention.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group hover:shadow-elegant transition-all duration-300 border-border">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Number Badge */}
                      <div className="flex-shrink-0">
                        <Badge variant="outline" className="text-2xl font-bold px-4 py-2 bg-gradient-primary text-primary-foreground border-0">
                          {step.number}
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                        <step.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary-foreground rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;