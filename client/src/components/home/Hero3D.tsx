import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.2}>
      <MeshDistortMaterial
        color="#222222"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
      />
    </Sphere>
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
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
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
          WHERE YOUR <br /> IDEAS FIND <span className="italic text-liquidSilver">LIGHT</span>
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