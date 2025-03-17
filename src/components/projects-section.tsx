"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { projects } from "@/constants/projects"

interface ProjectsSectionProps {
  title?: string
  subtitle?: string
  projects?: typeof projects
  featuredTitle?: string
  otherTitle?: string
}

export function ProjectsSection({
  title = "My Projects",
  subtitle = "A selection of my most recent work",
  projects: projectsProp = projects,
  featuredTitle = "Featured Projects",
  otherTitle = "Other Projects",
}: ProjectsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl -z-10" />

      <div className="container px-4 md:px-6">
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

        {/* Featured Projects */}
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-xl font-bold mb-8">{featuredTitle}</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsProp
              .filter((project) => project.featured)
              .map((project, index) => (
                <ScrollReveal key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
                  <motion.div
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
                    <Card className="relative h-full overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6`}
                        >
                          <div className="flex gap-4">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full bg-background/80 backdrop-blur-sm"
                              >
                                <ExternalLinkIcon className="h-4 w-4 mr-2" />
                                Demo
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full bg-background/80 backdrop-blur-sm"
                              >
                                <GithubIcon className="h-4 w-4 mr-2" />
                                Code
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-secondary/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
          </div>
        </div>

        {/* Other Projects */}
        <div ref={ref}>
          <ScrollReveal>
            <h3 className="text-xl font-bold mb-8">{otherTitle}</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsProp
              .filter((project) => !project.featured)
              .map((project, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group h-full"
                  >
                    <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs bg-background/50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <div className="flex gap-3 w-full">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                            <Button size="sm" variant="outline" className="rounded-full w-full">
                              <ExternalLinkIcon className="h-3 w-3 mr-2" />
                              Demo
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                            <Button size="sm" variant="outline" className="rounded-full w-full">
                              <GithubIcon className="h-3 w-3 mr-2" />
                              Code
                            </Button>
                          </motion.div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

