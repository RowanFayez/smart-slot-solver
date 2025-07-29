import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  RefreshCw, 
  Users, 
  AlertTriangle, 
  Target, 
  Bell,
  Lightbulb,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Auto-Scheduler Engine",
      description: "Matches multiple users with providers based on availability, preferences, and constraints using advanced algorithms.",
      badge: "AI-Powered"
    },
    {
      icon: AlertTriangle,
      title: "Conflict Detection & Resolution",
      description: "Detects double-booking and overlapping slots, offering quick resolution suggestions with chain updates.",
      badge: "Real-Time"
    },
    {
      icon: Lightbulb,
      title: "Recommendation System",
      description: "Suggests solutions when no perfect match exists, including constraint modifications and priority adjustments.",
      badge: "Intelligent"
    },
    {
      icon: Users,
      title: "Multi-Group Support",
      description: "Supports one-to-one, one-to-many, and many-to-many matching for complex scheduling scenarios.",
      badge: "Flexible"
    },
    {
      icon: Target,
      title: "Advanced Constraints",
      description: "Handles daily limits, blackout days, preferred times, priority levels, and instructor preferences.",
      badge: "Customizable"
    },
    {
      icon: RefreshCw,
      title: "Auto-ReScheduling",
      description: "Automatically adjusts schedules for all affected parties when cancellations or changes occur.",
      badge: "Adaptive"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Sends reminders and notifications to all parties with schedule changes and confirmations.",
      badge: "Connected"
    },
    {
      icon: CheckCircle,
      title: "Poll-Based Confirmations",
      description: "Optional polling feature for group consensus and participant confirmation before finalizing.",
      badge: "Collaborative"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent scheduling system comes packed with advanced features 
            designed to eliminate manual coordination and maximize efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;