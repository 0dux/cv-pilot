import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

const LandingPage = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] overflow-hidden">
        <AnimatedGradientBackground
          topOffset={10}
          animationSpeed={0.04}
          Breathing={true}
          breathingRange={4}
        />
        <div className="absolute flex items-center justify-center min-h-[90vh] w-full">
          <h1 className="text-4xl font-bold text-white">CV Pilot</h1>
        </div>
      </div>
      {/* End Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedGradientBackground
          topOffset={10}
          containerClassName="rotate-180"
          animationSpeed={0.04}
          Breathing={true}
          breathingRange={4}
        />
      </div>
    </div>
  );
};

export default LandingPage;
