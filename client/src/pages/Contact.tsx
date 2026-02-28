import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative z-10">
        
        <div className="md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-8 leading-tight">
              LET'S START <br /> <span className="text-liquidSilver italic">TALKING.</span>
            </h1>
            <p className="text-xl text-ashGrey font-light mb-12 max-w-md">
              Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <Mail className="text-liquidSilver mr-6 mt-1" size={24} />
                <div>
                  <h4 className="text-sm tracking-widest uppercase font-bold text-whiteChrome mb-2">Email</h4>
                  <a href="mailto:hello@tejnavi.studio" className="text-ashGrey hover:text-whiteChrome transition-colors text-lg">hello@tejnavi.studio</a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-liquidSilver mr-6 mt-1" size={24} />
                <div>
                  <h4 className="text-sm tracking-widest uppercase font-bold text-whiteChrome mb-2">Office</h4>
                  <p className="text-ashGrey text-lg">Mumbai, India<br/>(Remote Worldwide)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2"
        >
          <form className="bg-brushedAnthracite p-8 md:p-12 border border-white/5 space-y-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Your Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors placeholder:text-white/20"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors placeholder:text-white/20"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">What are you looking for?</label>
              <select className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors appearance-none">
                <option value="web" className="bg-brushedAnthracite">Website Development</option>
                <option value="app" className="bg-brushedAnthracite">Mobile App</option>
                <option value="saas" className="bg-brushedAnthracite">SaaS Platform</option>
                <option value="other" className="bg-brushedAnthracite">Other / Not Sure</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Project Details</label>
              <textarea 
                rows={4}
                className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors placeholder:text-white/20 resize-none"
                placeholder="Tell us about your timeline, budget, and goals..."
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full bg-whiteChrome text-matteCarbon py-5 font-bold uppercase tracking-widest text-sm hover:bg-mercuryGlow transition-all duration-300 flex items-center justify-center group"
            >
              Send Message
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}