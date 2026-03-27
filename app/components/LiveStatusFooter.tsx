"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Disc, Github, Linkedin, Coffee, Instagram, Mail } from "lucide-react"

interface SpotifyData {
    isPlaying: boolean
    title?: string
    artist?: string
    album?: string
    albumImageUrl?: string
    songUrl?: string
}

export default function LiveStatusFooter() {
    const [spotify, setSpotify] = useState<SpotifyData | null>(null)

    // Fetch Spotify data
    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const response = await fetch("/api/spotify/now-playing")
                const data = await response.json()
                setSpotify(data)
            } catch (error) {
                console.error("Failed to fetch Spotify data:", error)
                setSpotify({ isPlaying: false })
            }
        }

        fetchSpotify()
        const interval = setInterval(fetchSpotify, 30000) // Poll every 30 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-zinc-950 border-t border-zinc-800 py-16 px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Availability Status */}
                    <div className="space-y-4">
                        <h3 className="font-clash text-zinc-400 text-sm uppercase tracking-wider font-bold">
                            Availability
                        </h3>
                        <p className="font-chillax text-zinc-400 text-sm leading-relaxed">
                            Feel free to reach out and contact me for any changes and suggestions or simply have a chat.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                            </div>
                            <span className="font-chillax text-zinc-200 text-lg">Available for work</span>
                        </div>
                    </div>

                    {/* Spotify Live Card */}
                    <div className="space-y-4">
                        <h3 className="font-clash font-bold text-zinc-400 text-sm uppercase tracking-wider">
                            Now Playing
                        </h3>
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                {/* Album Art */}
                                <div className="w-16 h-16 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                    {spotify?.isPlaying && spotify.albumImageUrl ? (
                                        <img
                                            src={spotify.albumImageUrl}
                                            alt={spotify.album}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Disc className="w-8 h-8 text-zinc-500" />
                                    )}
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {spotify?.songUrl ? (
                                            <a
                                                href={spotify.songUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-chillax text-zinc-300 text-sm truncate hover:text-white transition-colors"
                                            >
                                                {spotify.title}
                                            </a>
                                        ) : (
                                            <p className="font-chillax text-zinc-300 text-sm truncate">
                                                {spotify?.title || "Not Playing"}
                                            </p>
                                        )}
                                        {/* CSS Equalizer - only show when playing */}
                                        {spotify?.isPlaying && (
                                            <div className="flex items-end gap-0.5 h-4">
                                                <div className="w-0.5 bg-green-500 rounded-full animate-equalizer-1"></div>
                                                <div className="w-0.5 bg-green-500 rounded-full animate-equalizer-2"></div>
                                                <div className="w-0.5 bg-green-500 rounded-full animate-equalizer-3"></div>
                                                <div className="w-0.5 bg-green-500 rounded-full animate-equalizer-4"></div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="font-chillax text-zinc-500 text-xs truncate">
                                        {spotify?.artist || "Spotify"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connect - 2x2 Grid */}
                    <div className="space-y-4 pl-0 md:pl-30 flex flex-col items-center md:items-start">
                        <h3 className="font-clash font-bold text-zinc-400 text-sm uppercase tracking-wider">
                            Connect
                        </h3>
                        <div className="grid grid-cols-2 gap-3 justify-items-center md:justify-items-start">
                            <a
                                href="https://github.com/ghosty032"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 font-chillax text-zinc-300 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5 mix-blend-difference" />
                                <span className="mix-blend-difference">GitHub</span>
                            </a>
                            <a
                                href="https://www.instagram.com/sanskxxr1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 font-chillax text-zinc-300 hover:text-white transition-colors"
                            >
                                <Instagram className="w-5 h-5 mix-blend-difference" />
                                <span className="mix-blend-difference">Instagram</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sanskaar-thukral-128118253/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 font-chillax text-zinc-300 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-5 h-5 mix-blend-difference" />
                                <span className="mix-blend-difference">LinkedIn</span>
                            </a>
                            <a
                                href="mailto:tsanskaar@gmail.com"
                                className="group flex items-center gap-3 font-chillax text-zinc-300 hover:text-white transition-colors"
                            >
                                <Mail className="w-5 h-5 mix-blend-difference" />
                                <span className="mix-blend-difference">Gmail</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Signature */}
                <div className="pt-8 border-t border-zinc-800">
                    <div className="flex items-center justify-center gap-2 font-chillax text-zinc-500 text-sm">
                        <span>Built using</span>
                        <span className="font-clash text-zinc-400">Next.js</span>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}
