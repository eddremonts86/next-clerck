"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { navItems } from "@/constants/navigation";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
interface NavBarProps {
    items?: typeof navItems;
}

export function NavBar({ items = navItems }: NavBarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const sections = items.map((item) => item.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: "smooth",
            });
        }
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md shadow-md"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("hero");
                        }}
                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                        DEV<span className="text-primary">.FOLIO</span>
                    </a>

                    <div className="hidden md:flex items-center space-x-8">
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href.substring(1));
                                    }}
                                    className={`text-foreground/80 hover:text-primary transition-colors duration-200 py-2 ${
                                        activeSection === item.href.substring(1)
                                            ? "text-primary"
                                            : ""
                                    }`}
                                >
                                    {item.name}
                                    {activeSection ===
                                        item.href.substring(1) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </a>
                            </div>
                        ))}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                onClick={() => scrollToSection("contact")}
                            >
                                Contact Me
                            </Button>
                        </motion.div>
                        <div className="flex items-center space-x-8">
                            <SignedOut>
                                <SignInButton />
                                <SignUpButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <MenuIcon className="h-6 w-6" />
                    </Button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-background md:hidden"
                    >
                        <div className="flex flex-col h-full p-6">
                            <div className="flex justify-between items-center mb-8">
                                <a
                                    href="#hero"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("hero");
                                    }}
                                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
                                >
                                    DEV
                                    <span className="text-primary">.FOLIO</span>
                                </a>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <XIcon className="h-6 w-6" />
                                </Button>
                            </div>

                            <div className="flex flex-col space-y-6">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <a
                                            href={item.href}
                                            className={`text-xl font-medium transition-colors duration-200 ${
                                                activeSection ===
                                                item.href.substring(1)
                                                    ? "text-primary"
                                                    : "text-foreground/80 hover:text-primary"
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection(
                                                    item.href.substring(1)
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                        onClick={() =>
                                            scrollToSection("contact")
                                        }
                                    >
                                        Contact Me
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
