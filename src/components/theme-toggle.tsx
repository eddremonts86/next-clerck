"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20"
        aria-label="Toggle theme"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}

