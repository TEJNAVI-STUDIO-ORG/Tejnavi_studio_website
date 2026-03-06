"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-whiteChrome rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                scale: isHovering ? 4 : 1,
                opacity: 1,
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 1
            }}
        />
    );
}
