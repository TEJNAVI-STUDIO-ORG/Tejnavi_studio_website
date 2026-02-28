import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';

function AnimatedSphere() {
  return (
    <mesh position={[0, 0, 0]} scale={2.2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        color="#222222"
        wireframe={false}
        emissive="#111111"
        shininess={100}
      />
    </mesh>
  );
}

export function Hero3D() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-matteCarbon px-6">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1.5} color="#F5F5F5" />
          <directionalLight position={[-2, -5, -2]} intensity={0.5} color="#1A1A1A" />
          <AnimatedSphere />
        </Canvas>
      </div>

      <div className="absolute inset-0 metallic-grid opacity-20 z-0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl pointer-events-none">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-whiteChrome mb-8 leading-[0.9]"
        >
          WHERE YOUR <br /> IDEAS FIND{" "}
          <motion.span
            className="inline-block italic text-liquidSilver pointer-events-auto"
            whileHover={{ y: -6, scale: 1.06, rotate: -1 }}
            transition={{ type: "spring", stiffness: 520, damping: 18 }}
          >
            LIGHT
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-liquidSilver text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide"
        >
          Premium digital craftsmanship engineered for high-growth enterprises and visionary brands.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto"
        >
          <a href="/quote" className="inline-block bg-whiteChrome text-matteCarbon px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-liquidSilver transition-all duration-500 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Get a Quote
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-whiteChrome to-transparent"></div>
      </motion.div>
    </div>
  );
}