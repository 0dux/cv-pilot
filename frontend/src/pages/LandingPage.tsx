import { FloatingNav } from "@/components/ui/floating-navbar";

const LandingPage = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav navItems={navItems} />

      <div className="min-h-screen">1st div</div>
      <div className="min-h-screen bg-red-600"></div>
    </div>
  );
};

export default LandingPage;
