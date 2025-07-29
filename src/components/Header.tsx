import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SmartSchedule
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#use-cases" className="text-foreground hover:text-primary transition-colors">
            Use Cases
          </a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;