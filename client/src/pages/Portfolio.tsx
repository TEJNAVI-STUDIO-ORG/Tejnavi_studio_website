import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CATEGORIES = ["All", "Web", "App", "SaaS", "E-commerce", "CRM", "SEO"];

const PROJECTS = [
  {
    id: 1,
    title: "Lumina Analytics",
    category: "SaaS",
    tech: "React, Node.js, Python",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    year: "2026"
  },
  {
    id: 2,
    title: "Nexus FinTech",
    category: "App",
    tech: "React Native, Go",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
    year: "2025"
  },
  {
    id: 3,
    title: "Aura Commerce",
    category: "E-commerce",
    tech: "Next.js, Shopify",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    year: "2025"
  },
  {
    id: 4,
    title: "Vertex CRM",
    category: "CRM",
    tech: "Vue.js, PostgreSQL",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    year: "2024"
  },
  {
    id: 5,
    title: "Zenith Search",
    category: "SEO",
    tech: "Technical SEO, Content",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c205?auto=format&fit=crop&q=80&w=1000",
    year: "2026"
  },
  {
    id: 6,
    title: "Nova Dashboard",
    category: "SaaS",
    tech: "React, Tailwind",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000",
    year: "2025"
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6">
            SELECTED <span className="text-liquidSilver italic">WORK</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-12">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase font-bold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-whiteChrome text-matteCarbon' 
                    : 'bg-transparent text-liquidSilver border border-white/10 hover:border-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`group ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-brushedAnthracite grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-matteCarbon/40 group-hover:bg-matteCarbon/10 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-matteCarbon/40 backdrop-blur-sm z-10">
                    <span className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full">View Case Study</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-whiteChrome mb-1">{project.title}</h3>
                    <p className="text-ashGrey text-sm">{project.tech}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs uppercase tracking-widest text-liquidSilver font-bold mb-1">{project.category}</span>
                    <span className="text-ashGrey text-sm">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}