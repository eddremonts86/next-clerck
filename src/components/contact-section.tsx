"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { contactInfo, socialLinks } from "@/constants/contact"

interface ContactSectionProps {
  title?: string
  subtitle?: string
  contactInfo?: typeof contactInfo
  socialLinks?: typeof socialLinks
}

export function ContactSection({
  title = "Contact",
  subtitle = "Have a project in mind? Let's talk!",
  contactInfo: contactInfoProp = contactInfo,
  socialLinks: socialLinksProp = socialLinks,
}: ContactSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
    // Here you would typically send the form data to your backend
  }

  const getIcon = (iconName: string, color: string) => {
    const colorClass = `text-${color}-600`
    switch (iconName) {
      case "mail":
        return <MailIcon className={`h-5 w-5 ${colorClass}`} />
      case "phone":
        return <PhoneIcon className={`h-5 w-5 ${colorClass}`} />
      case "map-pin":
        return <MapPinIcon className={`h-5 w-5 ${colorClass}`} />
      case "github":
        return <GithubIcon className="h-5 w-5" />
      case "linkedin":
        return <LinkedinIcon className="h-5 w-5" />
      case "twitter":
        return <TwitterIcon className="h-5 w-5" />
      default:
        return <MailIcon className={`h-5 w-5 ${colorClass}`} />
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Contact background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {title}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">{subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <ScrollReveal direction="left">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden h-full">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Contact"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
              </div>
              <CardContent className="p-6 relative">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfoProp.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full bg-${item.color}-600/10`}
                      >
                        {getIcon(item.icon, item.color)}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    {socialLinksProp.map((link, index) => (
                      <motion.div key={index} whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full bg-background/50 hover:bg-${link.color}-600/10 hover:text-${link.color}-600`}
                          as="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getIcon(link.icon, link.color)}
                          <span className="sr-only">{link.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] bg-background/50"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

