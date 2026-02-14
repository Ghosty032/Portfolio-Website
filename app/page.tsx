import FloatingPillNav from "./components/FloatingPillNav";
import TitleScreen from "./components/TitleScreen";
import HeroBackground from "./components/HeroBackground";
import ProjectSection from "./components/ProjectSection";
import LiveStatusFooter from "./components/LiveStatusFooter";
import MiniBentoGrid from "./components/MiniBentoGrid";
import StarryBackground from "./components/StarryBackground";

export default function Home() {
  return (
    <>
      <div id="hero">
        <TitleScreen />
        <HeroBackground />
      </div>
      <FloatingPillNav />
      {/* Starry background for Tech Stack and Projects sections */}
      <div className="relative">
        <StarryBackground />
        <div id="tech-stack" className="relative z-10">
          <MiniBentoGrid />
        </div>
        <div id="projects" className="relative z-10">
          <ProjectSection />
        </div>
      </div>
      <LiveStatusFooter />
    </>
  );
}
