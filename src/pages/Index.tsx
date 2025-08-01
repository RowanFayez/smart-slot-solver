import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SchedulingDemo from "@/components/SchedulingDemo";
import AlgorithmBreakdown from "@/components/AlgorithmBreakdown";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <SchedulingDemo />
        <AlgorithmBreakdown />
        <UseCases />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
