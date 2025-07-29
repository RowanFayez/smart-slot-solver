import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Zap, Clock } from "lucide-react";
import heroImage from "@/assets/hero-scheduling.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Smart AutoScheduling
              </span>
              <br />
              <span className="text-foreground">System</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              An Intelligent, Conflict-Free, and Scalable Scheduling Solution that automatically 
              distributes appointments, resolves conflicts, and adapts to changes in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="xl" className="text-lg">
              <Zap className="mr-2 h-5 w-5" />
              Try Demo
            </Button>
            <Button variant="outline" size="xl" className="text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              View Features
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-elegant hover:shadow-glow transition-all duration-300 group animate-fade-in">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-float">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto-Scheduling</h3>
              <p className="text-muted-foreground text-sm">
                Automatically matches users with providers based on availability and preferences
              </p>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-elegant hover:shadow-glow transition-all duration-300 group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-float">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conflict Resolution</h3>
              <p className="text-muted-foreground text-sm">
                Detects and resolves scheduling conflicts with intelligent recommendations
              </p>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-elegant hover:shadow-glow transition-all duration-300 group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-float">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-muted-foreground text-sm">
                Dynamically re-schedules when participants change their availability
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;