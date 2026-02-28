import { motion } from "framer-motion";
import { Link } from "wouter";
import { Hero3D } from "@/components/home/Hero3D";
import { Counter } from "@/components/ui/Counter";
import { FEATURED_PROJECTS } from "@/data/projects";

// Marquee Words
const MARQUEE_WORDS = ["UI Design", "Automation", "Cloud Architecture", "Branding", "SaaS Development"];

const EXPERTISE = [
  {
    title: "Intelligent Automation",
    description: "Streamlining workflows with AI-driven pipelines that reduce overhead by up to 60%.",
    letter: "A"
  },
  {
    title: "Experience Design",
    description: "Immersive, high-performance interfaces designed to captivate and convert.",
    letter: "B"
  },
  {
    title: "Product Strategy",
    description: "Comprehensive roadmapping for new-age digital ventures and legacy migrations.",
    letter: "C"
  },
  {
    title: "SaaS Development",
    description: "Scalable, secure, and robust software as a service solutions for modern enterprises.",
    letter: "D"
  },
  {
    title: "Custom CRM Solutions",
    description: "Tailored customer relationship management systems to boost your sales and retention.",
    letter: "E"
  },
  {
    title: "SEO Optimization",
    description: "Technical SEO and content strategy to ensure your brand dominates search results.",
    letter: "F"
  }
];

const STATS = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 45000, suffix: "", label: "Hours Automated" },
  { value: 12, suffix: "+", label: "Global Awards" },
  { value: 99, suffix: "%", label: "Client Retention" }
];

export default function Home() {
  return (
    <div className="bg-matteCarbon min-h-screen">
      <Hero3D />

      {/* Services Marquee */}
      <section className="bg-brushedAnthracite border-y border-white/5 py-8 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12 px-6">
              {MARQUEE_WORDS.map((word, j) => (
                <div key={j} className="flex items-center space-x-12">
                  <span className="text-4xl md:text-6xl font-heading font-bold text-white/5 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                    {word}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-liquidSilver opacity-30"></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-4xl md:text-6xl font-bold text-whiteChrome mb-6"
              >
                CORE EXPERTISE
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-liquidSilver text-lg"
              >
                We merge engineering precision with artistic flair to deliver digital products that dominate markets.
              </motion.p>
            </div>
            <div className="text-whiteChrome font-bold tracking-widest text-sm">01 / 06</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERTISE.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-brushedAnthracite p-10 border border-white/5 transition-all duration-700 hover:bg-mercuryGlow hover:text-matteCarbon"
              >
                <div className="h-12 w-12 border border-liquidSilver mb-12 flex items-center justify-center group-hover:border-matteCarbon transition-colors">
                  <span className="font-heading text-xl">{item.letter}</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{item.title}</h3>
                <p className="text-liquidSilver group-hover:text-matteCarbon transition-colors font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-whiteChrome text-matteCarbon py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {STATS.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-7xl font-heading font-bold mb-4 tracking-tighter">
                <Counter value={stat.value} />{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-whiteChrome">SELECTED WORK</h2>
            <Link href="/projects">
              <a className="hidden md:inline-block text-sm uppercase tracking-widest font-bold text-liquidSilver hover:text-whiteChrome border-b border-liquidSilver pb-1">View All</a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {FEATURED_PROJECTS.map((project, i) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group ${i % 2 !== 0 ? "md:mt-32" : ""}`}
                >
                  <div className="relative aspect-[4/5] bg-brushedAnthracite mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-matteCarbon/40 group-hover:bg-matteCarbon/20 transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-matteCarbon/40 backdrop-blur-sm z-10">
                      {project.caseStudyUrl && (
                        <a 
                          href={project.caseStudyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full hover:bg-whiteChrome hover:text-matteCarbon transition-colors"
                        >
                          View Case Study
                        </a>
                      )}
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full hover:bg-whiteChrome hover:text-matteCarbon transition-colors"
                        >
                          View Repo
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full hover:bg-whiteChrome hover:text-matteCarbon transition-colors"
                        >
                          Live Preview
                        </a>
                      )}
                      {!project.caseStudyUrl && !project.repoUrl && !project.liveUrl && (
                        <span className="text-whiteChrome font-bold uppercase tracking-widest border border-whiteChrome px-6 py-3 rounded-full">View Case Study</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-heading font-bold text-whiteChrome mb-2">{project.title}</h3>
                      <p className="text-liquidSilver">{project.subtitle || project.tech}</p>
                    </div>
                    <span className="text-sm font-bold tracking-widest text-ashGrey">{project.year}</span>
                  </div>
                </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center md:hidden">
             <Link href="/projects">
              <a className="inline-block text-sm uppercase tracking-widest font-bold text-liquidSilver hover:text-whiteChrome border-b border-liquidSilver pb-1">View All Projects</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}