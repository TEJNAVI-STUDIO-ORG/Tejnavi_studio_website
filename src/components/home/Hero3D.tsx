"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

/* ── 3D Sphere with continuous rotation ── */
function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.25;
            meshRef.current.rotation.x += delta * 0.08;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2.4}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshPhongMaterial color="#1a1a1a" wireframe={false} emissive="#111111" shininess={120} />
        </mesh>
    );
}

/* ── Word-by-word stagger animation ── */
const heroWords = ["WHERE", "YOUR", "IDEAS", "FIND"];

const wordContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordItem = {
    hidden: { y: 50, opacity: 0, rotateX: 40 },
    visible: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ── Magnetic CTA Button ── */
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * 0.2);
        y.set((e.clientY - cy) * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block"
        >
            <Link
                href={href}
                className="group relative inline-flex items-center bg-whiteChrome text-matteCarbon px-10 py-5 font-bold uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
                <span className="relative z-10">Get a Quote</span>
                {/* Border shimmer on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <span className="absolute inset-0 border border-white/30 animate-pulse" />
                </span>
            </Link>
        </motion.div>
    );
}

/* ── Main Hero Component ── */
export function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const glowX = useSpring(mouseX, { stiffness: 60, damping: 30 });
    const glowY = useSpring(mouseY, { stiffness: 60, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    /* Clip-path reveal state for "LIGHT" */
    const [lightRevealed, setLightRevealed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setLightRevealed(true), 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-matteCarbon">
            {/* Cursor-following radial glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(600px circle at ${glowX.get() * 100}% ${glowY.get() * 100}%, rgba(255,255,255,0.04), transparent 60%)`,
                }}
            />

            {/* Animated dot grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Content grid: left text, right 3D */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-32 pb-24 lg:pt-0 lg:pb-0 lg:min-h-screen">
                {/* Left: Heading + CTA */}
                <div className="flex flex-col justify-center">
                    <motion.div
                        variants={wordContainer}
                        initial="hidden"
                        animate="visible"
                        className="mb-8"
                    >
                        <div className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] text-whiteChrome leading-[0.92]">
                            {heroWords.map((word) => (
                                <motion.span
                                    key={word}
                                    variants={wordItem}
                                    className="inline-block mr-[0.3em]"
                                    style={{ perspective: 600 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                            <br />
                            {/* "LIGHT" with clip-path wipe reveal */}
                            <motion.span
                                className="inline-block italic text-liquidSilver"
                                initial={{ clipPath: "inset(0 100% 0 0)" }}
                                animate={lightRevealed ? { clipPath: "inset(0 0% 0 0)" } : {}}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -6, scale: 1.04, rotate: -1 }}
                            >
                                LIGHT
                            </motion.span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="font-[var(--font-body)] text-liquidSilver text-lg md:text-xl max-w-lg mb-10 font-light tracking-wide leading-relaxed"
                    >
                        Premium digital craftsmanship engineered for high-growth enterprises
                        and visionary brands.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <MagneticButton href="/quote">Get a Quote</MagneticButton>
                    </motion.div>
                </div>

                {/* Right: 3D sphere */}
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-60 mix-blend-screen">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[2, 5, 2]} intensity={1.5} color="#F5F5F5" />
                            <directionalLight position={[-2, -5, -2]} intensity={0.5} color="#1A1A1A" />
                            <AnimatedSphere />
                        </Canvas>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-whiteChrome to-transparent" />
            </motion.div>
        </div>
    );
}
