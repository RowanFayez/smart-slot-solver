import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">SmartSchedule</span>
            </div>
            <p className="text-background/80 mb-4 max-w-md">
              The most intelligent scheduling system that eliminates conflicts, 
              maximizes efficiency, and adapts to your organization's needs automatically.
            </p>
            <Badge variant="outline" className="bg-transparent border-background/30 text-background">
              AI-Powered Scheduling
            </Badge>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">Healthcare</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Corporate</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Sports Teams</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>&copy; 2024 SmartSchedule. All rights reserved. Built with intelligent automation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;