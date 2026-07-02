"use client";

import { useEffect, useRef, useCallback } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    const animateRing = useCallback(() => {
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

        if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
        }

        rafRef.current = requestAnimationFrame(animateRing);
    }, []);

    useEffect(() => {
        // Only enable on desktop
        if (!window.matchMedia("(min-width: 768px)").matches) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        document.body.style.cursor = "none";

        const onMove = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
            }
        };

        const interactables = () => document.querySelectorAll("a, button, .magnetic-btn, [role='button']");

        const onEnter = () => {
            if (ringRef.current) {
                ringRef.current.style.transform += " scale(1.5)";
                ringRef.current.style.borderColor = "#ffffff";
            }
        };

        const onLeave = () => {
            if (ringRef.current) {
                ringRef.current.style.borderColor = "#c5f258";
            }
        };

        window.addEventListener("mousemove", onMove);
        rafRef.current = requestAnimationFrame(animateRing);

        // Attach hover listeners
        const elements = interactables();
        elements.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        // MutationObserver to pick up dynamically added elements
        const observer = new MutationObserver(() => {
            const fresh = interactables();
            fresh.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
            observer.disconnect();
            const els = interactables();
            els.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, [animateRing]);

    return (
        <>
            {/* Dot — small, snappy */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-accentLime rounded-full pointer-events-none z-[999] mix-blend-difference hidden md:block"
            />
            {/* Ring — follows with lag */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 border border-accentLime rounded-full pointer-events-none z-[999] mix-blend-difference transition-[border-color] duration-300 ease-out hidden md:block"
            />
        </>
    );
}
