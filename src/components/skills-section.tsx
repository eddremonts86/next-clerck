"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useState, useEffect } from "react"
import { skills, categories, otherTechnologies } from "@/constants/skills"

interface SkillsSectionProps {
  title?: string
  subtitle?: string
  skills?: typeof skills
  categories?: typeof categories
  otherTechnologies?: string[]
}

export function SkillsSection({
  title = "My Skills",
  subtitle = "Technologies and tools I work with",
  skills: skillsProp = skills,
  categories: categoriesProp = categories,
  otherTechnologies: otherTechnologiesProp = otherTechnologies,
}: SkillsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [skillLevels, setSkillLevels] = useState<{ [key: string]: number }>(
    skillsProp.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {}),
  )

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setSkillLevels(skillsProp.reduce((acc, skill) => ({ ...acc, [skill.name]: skill.level }), {}))
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [inView, skillsProp])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Skills background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title.split(" ").map((word, i) =>
                i === 1 ? (
                  <span key={i} className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                ),
              )}
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">{subtitle}</p>
          </div>
        </ScrollReveal>

        <div ref={ref} className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesProp.map((category, categoryIndex) => (
              <ScrollReveal key={categoryIndex} direction="up" delay={0.2 * categoryIndex}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-1 rounded-full bg-gradient-to-b ${category.color}`} />
                    <h3 className="text-xl font-bold">{category.label}</h3>
                  </div>

                  <div className="space-y-4">
                    {skillsProp
                      .filter((skill) => skill.category === category.name)
                      .map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 relative">
                                <Image
                                  src={skill.icon || "/placeholder.svg"}
                                  alt={skill.name}
                                  fill
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <span>{skill.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{skillLevels[skill.name]}%</span>
                          </div>
                          <Progress
                            value={skillLevels[skill.name]}
                            className={`h-2 bg-muted/50`}
                            indicatorClassName={`bg-gradient-to-r ${category.color}`}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="pt-8">
              <h3 className="text-xl font-bold text-center mb-8">Other Technologies</h3>
              <motion.div variants={container} className="flex flex-wrap justify-center gap-3">
                {otherTechnologiesProp.map((tech, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-base bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

