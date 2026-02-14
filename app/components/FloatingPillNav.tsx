"use client"

import { motion } from "framer-motion"
import { Home, Layers, FolderOpen } from "lucide-react"

export default function FloatingPillNav() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    const navItems = [
        { icon: Home, label: "Home", sectionId: "hero" },
        { icon: Layers, label: "About", sectionId: "tech-stack" },
        { icon: FolderOpen, label: "Projects", sectionId: "projects" },
    ]

    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full px-6 py-3 shadow-xl">
                <div className="flex items-center gap-6">
                    {navItems.map((item, index) => (
                        <button
                            key={item.label}
                            onClick={() => scrollToSection(item.sectionId)}
                            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300"
                        >
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-outfit text-sm font-medium hidden md:inline">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.nav>
    )
}
