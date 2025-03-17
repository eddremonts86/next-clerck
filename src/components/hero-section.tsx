"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

export function HeroSection({
  title = "Creating exceptional digital experiences",
  subtitle = "Frontend engineer specializing in design and user experience",
  ctaPrimary = "View Projects",
  ctaSecondary = "Contact",
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left space-y-6 md:w-1/2"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4"
          >
            Frontend Engineer
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
          >
            {title.split(" ").map((word, i, arr) =>
              i === 1 ? (
                <span key={i} className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ),
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-[600px]"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => scrollToSection("projects")}
              >
                {ctaPrimary}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="rounded-full" onClick={() => scrollToSection("contact")}>
                {ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-20 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="Developer portrait"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        onClick={() => scrollToSection("about")}
      >
        <ArrowDownIcon className="h-8 w-8 text-primary" />
      </motion.div>
    </section>
  )
}

