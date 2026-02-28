import { motion } from "framer-motion";
import { Link } from "wouter";

const SERVICES = [
  {
    id: "01",
    title: "Web Application Development",
    description: "High-performance, scalable web applications built with modern frameworks like React, Next.js, and Node.js. We focus on speed, security, and seamless user experiences.",
    features: ["Custom Dashboards", "SaaS Platforms", "Progressive Web Apps", "E-commerce Solutions"]
  },
  {
    id: "02",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that live in the pockets of your users. Built with React Native or Flutter for iOS and Android.",
    features: ["iOS & Android Apps", "UI/UX Design", "API Integration", "App Store Deployment"]
  },
  {
    id: "03",
    title: "UI/UX Experience Design",
    description: "We don't just make it look pretty; we engineer how it feels. Deep user research combined with premium aesthetic execution.",
    features: ["User Research", "Wireframing", "Interactive Prototypes", "Design Systems"]
  },
  {
    id: "04",
    title: "Intelligent Automation & AI",
    description: "Transforming workflows by integrating AI models and automating repetitive tasks, reducing overhead and increasing efficiency.",
    features: ["OpenAI Integration", "Workflow Automation", "Custom LLM Solutions", "Data Processing pipelines"]
  }
];

export default function Services() {
  return (
    <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6">
            OUR <span className="text-liquidSilver italic">EXPERTISE</span>
          </h1>
          <p className="text-xl text-ashGrey font-light leading-relaxed">
            We provide end-to-end digital product engineering. From the initial concept to the final deployment, our team ensures world-class quality at every step.
          </p>
        </motion.div>

        <div className="space-y-8">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="group bg-brushedAnthracite border border-white/5 p-8 md:p-12 hover:bg-mercuryGlow transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="md:w-1/3">
                  <div className="text-liquidSilver font-heading font-bold text-xl mb-4 group-hover:text-matteCarbon transition-colors">
                    {service.id}
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-whiteChrome group-hover:text-matteCarbon transition-colors mb-4">
                    {service.title}
                  </h2>
                </div>
                
                <div className="md:w-2/3 flex flex-col justify-between">
                  <p className="text-liquidSilver group-hover:text-matteCarbon/80 transition-colors text-lg mb-8 font-light">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {service.features.map(feature => (
                      <div key={feature} className="flex items-center text-sm text-ashGrey group-hover:text-matteCarbon/60 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-liquidSilver group-hover:bg-matteCarbon mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link href="/quote">
                      <a className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-whiteChrome group-hover:text-matteCarbon border-b border-whiteChrome/20 group-hover:border-matteCarbon/20 pb-1 transition-colors">
                        Discuss Project
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}