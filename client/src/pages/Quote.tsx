import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const SERVICE_TYPES = [
  { id: "web", label: "Website", basePrice: 2000 },
  { id: "app", label: "Mobile App", basePrice: 5000 },
  { id: "saas", label: "SaaS Platform", basePrice: 8000 },
  { id: "uiux", label: "UI/UX Design", basePrice: 3000 }
];

const FEATURES = [
  { id: "auth", label: "User Login System", price: 800 },
  { id: "payments", label: "Payment Gateway", price: 1200 },
  { id: "admin", label: "Admin Panel", price: 1500 },
  { id: "api", label: "Third-party API Integration", price: 1000 },
  { id: "chat", label: "Live Chat/Messaging", price: 1800 },
  { id: "analytics", label: "Advanced Analytics", price: 2000 }
];

const TIMELINES = [
  { id: "relaxed", label: "Relaxed (8-12 weeks)", multiplier: 1 },
  { id: "standard", label: "Standard (4-8 weeks)", multiplier: 1.2 },
  { id: "rush", label: "Rush (2-4 weeks)", multiplier: 1.5 }
];

export default function Quote() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    serviceType: "",
    features: [] as string[],
    timeline: "standard"
  });

  const toggleFeature = (featureId: string) => {
    setSelections(prev => {
      if (prev.features.includes(featureId)) {
        return { ...prev, features: prev.features.filter(id => id !== featureId) };
      } else {
        return { ...prev, features: [...prev.features, featureId] };
      }
    });
  };

  const calculateEstimate = () => {
    let total = 0;
    
    const baseService = SERVICE_TYPES.find(s => s.id === selections.serviceType);
    if (baseService) total += baseService.basePrice;
    
    selections.features.forEach(featId => {
      const feature = FEATURES.find(f => f.id === featId);
      if (feature) total += feature.price;
    });
    
    const timeline = TIMELINES.find(t => t.id === selections.timeline);
    if (timeline) total *= timeline.multiplier;
    
    return Math.round(total);
  };

  return (
    <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Column - Form */}
        <div className="lg:w-2/3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome mb-4">
              PROJECT <span className="text-liquidSilver italic">ESTIMATOR</span>
            </h1>
            <p className="text-ashGrey mb-12">Select your requirements below for an instant ballpark estimate.</p>
          </motion.div>

          <div className="space-y-16">
            {/* Step 1: Service Type */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">01</span>
                What are we building?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICE_TYPES.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelections({...selections, serviceType: service.id})}
                    className={`p-6 text-left border transition-all duration-300 ${
                      selections.serviceType === service.id 
                        ? 'border-whiteChrome bg-white/5' 
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{service.label}</span>
                      {selections.serviceType === service.id && <Check size={20} className="text-whiteChrome" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Features */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className={!selections.serviceType ? 'opacity-50 pointer-events-none' : ''}
            >
              <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">02</span>
                Required Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURES.map(feature => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-4 text-left border transition-all duration-300 flex items-center ${
                      selections.features.includes(feature.id)
                        ? 'border-whiteChrome bg-white/5' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border mr-4 flex items-center justify-center ${
                      selections.features.includes(feature.id) ? 'bg-whiteChrome border-whiteChrome' : 'border-white/30'
                    }`}>
                      {selections.features.includes(feature.id) && <Check size={14} className="text-matteCarbon" />}
                    </div>
                    <span className={selections.features.includes(feature.id) ? 'text-whiteChrome' : 'text-ashGrey'}>
                      {feature.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 3: Timeline */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className={!selections.serviceType ? 'opacity-50 pointer-events-none' : ''}
            >
              <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">03</span>
                Timeline Expectation
              </h3>
              <div className="space-y-4">
                {TIMELINES.map(timeline => (
                  <button
                    key={timeline.id}
                    onClick={() => setSelections({...selections, timeline: timeline.id})}
                    className={`w-full p-5 text-left border transition-all duration-300 flex justify-between items-center ${
                      selections.timeline === timeline.id
                        ? 'border-whiteChrome bg-white/5' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="font-bold">{timeline.label}</span>
                    {selections.timeline === timeline.id && <div className="w-3 h-3 rounded-full bg-whiteChrome"></div>}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Sticky Estimate */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 bg-brushedAnthracite border border-white/10 p-8">
            <h4 className="text-sm tracking-widest uppercase font-bold text-liquidSilver mb-8">Estimated Investment</h4>
            
            <div className="text-5xl font-heading font-bold text-whiteChrome mb-2">
              ${calculateEstimate().toLocaleString()}
            </div>
            <p className="text-ashGrey text-sm mb-8">*This is a rough estimate. Final cost depends on full scope.</p>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-ashGrey">Base:</span>
                <span className="text-whiteChrome">{selections.serviceType ? SERVICE_TYPES.find(s => s.id === selections.serviceType)?.label : 'Not selected'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-ashGrey">Features:</span>
                <span className="text-whiteChrome">{selections.features.length} selected</span>
              </div>
            </div>

            <button 
              disabled={!selections.serviceType}
              className={`w-full py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center transition-all duration-300 ${
                selections.serviceType 
                  ? 'bg-whiteChrome text-matteCarbon hover:bg-mercuryGlow' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Continue <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}