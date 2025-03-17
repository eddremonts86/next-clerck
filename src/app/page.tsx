import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavBar } from "@/components/nav-bar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

