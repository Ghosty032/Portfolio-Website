"use client";
import { useState } from "react";
import Link from "next/link";

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed top-8 left-8 z-50 flex flex-col justify-center items-center w-16 h-16 space-y-1.5 focus:outline-none bg-transparent hover:bg-black/50 rounded-full transition-colors duration-300"
                aria-label="Toggle menu"
            >
                <span
                    className={`block w-8 h-0.5 bg-white transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                ></span>
                <span
                    className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "opacity-0" : "opacity-100"
                        }`}
                ></span>
                <span
                    className={`block w-8 h-0.5 bg-white transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                ></span>
            </button>

            {/* Menu panel with curved right edge */}
            <div
                className={`fixed top-0 left-0 w-[30vw] h-screen z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* SVG background with curved right edge */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 450 450"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M 0 0 L 300 0 Q 400 220 300 450 L 0 450 Z"
                        fill="black"
                    />
                </svg>

                {/* Menu content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-[62%] space-y-8 text-white font-grotesk text-5xl font-bold uppercase tracking-wider">
                    <Link href="/" onClick={toggleMenu} className="hover:text-gray-400 font-outfit transition-colors">
                        Home
                    </Link>
                    <Link href="#about" onClick={toggleMenu} className="hover:text-gray-400 font-outfit transition-colors">
                        About
                    </Link>
                    <Link href="#projects" onClick={toggleMenu} className="hover:text-gray-400 font-outfit transition-colors">
                        Projects
                    </Link>
                    <Link href="#contact" onClick={toggleMenu} className="hover:text-gray-400 font-outfit transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
        </>
    );
}
