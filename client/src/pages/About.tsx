import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-8 leading-tight">
            ENGINEERING <br /> <span className="text-liquidSilver italic">TOMORROW.</span>
          </h1>
          <p className="text-xl text-ashGrey font-light leading-relaxed max-w-2xl">
            Tejnavi Studio is a premier digital product agency. We partner with ambitious brands to design and build world-class websites, applications, and digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square bg-brushedAnthracite grayscale hover:grayscale-0 transition-all duration-1000 relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-matteCarbon to-gunmetal/30 mix-blend-overlay"></div>
             {/* We'll use a placeholder for the studio image */}
             <div className="absolute inset-0 flex items-center justify-center text-ashGrey/20 font-heading text-4xl font-bold">STUDIO</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-heading font-bold text-whiteChrome mb-6">Our Philosophy</h2>
            <div className="space-y-6 text-ashGrey font-light">
              <p>
                We believe that great software is indistinguishable from magic. It requires a perfect balance of deep technical engineering and meticulous design.
              </p>
              <p>
                Unlike traditional agencies that churn out templates, we act as your dedicated product team. We challenge assumptions, propose better solutions, and execute with precision.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-bold text-whiteChrome mb-12">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="group">
                <div className="aspect-[3/4] bg-brushedAnthracite mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500"></div>
                </div>
                <h3 className="text-xl font-heading font-bold text-whiteChrome mb-1">Jane Doe</h3>
                <p className="text-liquidSilver text-sm tracking-widest uppercase font-bold">Partner / Design</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}