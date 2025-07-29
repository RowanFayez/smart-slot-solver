import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-hero border-0 shadow-elegant">
          <CardContent className="p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
                Ready to Transform Your Scheduling?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join organizations worldwide who have eliminated scheduling conflicts 
                and maximized efficiency with our intelligent automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="secondary" size="xl" className="text-lg bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Button>
                <Button variant="outline" size="xl" className="text-lg bg-transparent text-primary-foreground border-white/30 hover:bg-white/10">
                  <Users className="mr-2 h-5 w-5" />
                  Contact Sales
                </Button>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-8 text-primary-foreground/90">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <p className="text-sm">Conflict Resolution Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <p className="text-sm">Time Savings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <p className="text-sm">Automated Operation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;