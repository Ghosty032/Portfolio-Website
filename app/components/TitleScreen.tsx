"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function TitleScreen() {
    const [count, setCount] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const startNum = useRef(Math.floor(Math.random() * 32));

    // Phase 1: Countdown from random number to 99
    useEffect(() => {
        let current = startNum.current;
        const target = 100;

        const interval = setInterval(() => {
            current += 1;
            setCount(current);

            if (current >= target) {
                clearInterval(interval);
                // Reveal the "press anywhere" text
                setTimeout(() => {
                    setIsDone(true);
                    gsap.fromTo(
                        textRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                    );
                }, 300);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    // Phase 2: Click to dismiss
    const handleDismiss = () => {
        if (!isDone || dismissed) return;
        setDismissed(true);

        const tl = gsap.timeline();

        // Step 1: Fade out the number
        tl.to(numberRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: "power2.in",
        });

        // Step 2: Fade out the text
        tl.to(
            textRef.current,
            {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.in",
            },
            "-=0.2"
        );

        // Step 3: Fade out the entire overlay
        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                if (overlayRef.current) {
                    overlayRef.current.style.pointerEvents = "none";
                    overlayRef.current.style.display = "none";
                }
            },
        });
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleDismiss}
            className="fixed inset-0 z-[100] bg-zinc-900 flex flex-col items-center justify-center cursor-pointer select-none font-pixelify-sans">

            {/* Corner Borders */}
            <div className="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-white/30"></div>
            <div className="absolute top-8 right-8 w-32 h-32 border-t-4 border-r-4 border-white/30"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 border-b-4 border-l-4 border-white/30"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-white/30"></div>

            <div
                ref={numberRef}
                className="text-white text-[12rem] leading-none tabular-nums font-pixelify-sans"
            >
                {String(count).padStart(2, "0")}
            </div>

            <div
                ref={textRef}
                className="text-white/60 text-lg mt-8 tracking-widest uppercase opacity-0 font-stalinist-one text-2xl"
            >
                Click to Continue
            </div>
        </div>
    );
}
