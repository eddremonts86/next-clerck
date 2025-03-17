"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })

  const getDirection = () => {
    switch (direction) {
      case "up":
        return { y: 40 }
      case "down":
        return { y: -40 }
      case "left":
        return { x: 40 }
      case "right":
        return { x: -40 }
      default:
        return { y: 40 }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirection(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

