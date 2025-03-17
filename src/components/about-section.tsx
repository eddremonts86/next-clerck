"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { CodeIcon, PaletteIcon, UsersIcon, ZapIcon } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { services, stats } from "@/constants/about"

interface AboutSectionProps {
  title?: string
  subtitle?: string
  services?: typeof services
  stats?: typeof stats
}

export function AboutSection({
  title = "About me",
  subtitle = "Software engineer passionate about creating exceptional digital experiences",
  services: servicesProp = services,
  stats: statsProp = stats,
}: AboutSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <CodeIcon className="h-10 w-10 text-purple-500" />
      case "palette":
        return <PaletteIcon className="h-10 w-10 text-pink-500" />
      case "zap":
        return <ZapIcon className="h-10 w-10 text-blue-500" />
      case "users":
        return <UsersIcon className="h-10 w-10 text-green-500" />
      default:
        return <CodeIcon className="h-10 w-10 text-purple-500" />
    }
  }

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-500/5 to-transparent" />
      <div className="absolute -left-32 top-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center space-y-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-primary/10">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                  alt="Developer working"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">My Story</h3>
              <p className="text-muted-foreground">
                With over 5 years of experience in frontend development, I specialize in creating intuitive and
                attractive user interfaces. My passion for clean code and exceptional user experiences has led me to
                work on challenging and exciting projects.
              </p>
              <p className="text-muted-foreground">
                I believe the best software combines technical functionality with intuitive design. I focus on creating
                solutions that not only work perfectly but also provide an exceptional experience for end users.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {statsProp.map((stat, index) => (
                  <ScrollReveal key={index} delay={0.5 + index * 0.1}>
                    <div className="space-y-2">
                      <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="pt-20">
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-center mb-12">My Services</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesProp.map((service, index) => (
              <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <motion.div
                      className="mb-4 p-3 rounded-2xl bg-background"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {getIcon(service.icon)}
                    </motion.div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

