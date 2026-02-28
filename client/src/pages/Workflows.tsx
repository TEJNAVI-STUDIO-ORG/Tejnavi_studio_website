import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { WORKFLOWS } from "@/data/workflows";

export default function Workflows() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/workflows/:slug");
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const selectedSlug = useMemo(() => {
    const routeSlug = params?.slug;
    const hashSlug = window.location.hash?.slice(1);
    return routeSlug || hashSlug || "";
  }, [params?.slug]);

  const selectedWorkflow = useMemo(() => {
    if (!selectedSlug) return null;
    return WORKFLOWS.find((w) => w.slug === selectedSlug) ?? null;
  }, [selectedSlug]);

  useEffect(() => {
    if (!selectedSlug) return;
    if (!selectedWorkflow) navigate("/workflows");
  }, [navigate, selectedSlug, selectedWorkflow]);

  return (
    <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-24"
        >
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) window.history.back();
                else navigate("/services");
              }}
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-liquidSilver hover:text-whiteChrome border-b border-liquidSilver pb-1"
            >
              Back
            </button>
            <Link href="/services">
              <a className="text-sm font-bold uppercase tracking-widest text-liquidSilver/70 hover:text-liquidSilver border-b border-liquidSilver/30 hover:border-liquidSilver pb-1 transition-colors">
                Expertise
              </a>
            </Link>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6 mt-10">
            BUILD <span className="text-liquidSilver italic">WORKFLOWS</span>
          </h1>
          <p className="text-xl text-ashGrey font-light leading-relaxed">
            {selectedWorkflow
              ? selectedWorkflow.summary
              : "Select an expertise to view its exact delivery workflow."}
          </p>
        </motion.div>

        {!selectedWorkflow ? (
          <div className="space-y-8">
            {WORKFLOWS.map((workflow, i) => (
              <motion.div
                key={workflow.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/workflows/${workflow.slug}`}>
                  <a className="block group bg-brushedAnthracite border border-white/5 p-8 md:p-12 hover:bg-mercuryGlow transition-colors duration-500">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-whiteChrome group-hover:text-matteCarbon mb-4">
                      {workflow.title}
                    </h2>
                    <p className="text-liquidSilver group-hover:text-matteCarbon/80 text-lg font-light">
                      {workflow.summary}
                    </p>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-0"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-whiteChrome mb-4">
              {selectedWorkflow.title}
            </h2>

            <div className="mt-10">
              <div className="space-y-8">
                {selectedWorkflow.steps.map((step, j) => (
                  <div key={j} className="relative pl-2">
                    <div className="flex gap-8">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={
                            "w-12 h-12 rounded-full border flex items-center justify-center text-sm font-heading font-bold transition-all duration-300 relative z-10 " +
                            (activeStep === j
                              ? "border-whiteChrome bg-whiteChrome text-matteCarbon"
                              : "border-liquidSilver text-liquidSilver")
                          }
                          onMouseEnter={() => setActiveStep(j)}
                          onMouseLeave={() => setActiveStep(null)}
                          tabIndex={0}
                          onFocus={() => setActiveStep(j)}
                          onBlur={() => setActiveStep(null)}
                        >
                          {(j + 1).toString().padStart(2, "0")}
                        </div>

                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10" />

                        {j !== selectedWorkflow.steps.length - 1 ? (
                          <div className="w-px flex-1 bg-transparent" />
                        ) : null}
                      </div>

                      <div className="relative pt-1 flex-1">
                        <div className="absolute -left-6 top-6 h-px w-6 bg-white/10" />
                        <div className="absolute -left-6 top-6 h-6 w-6 border border-white/10 border-l-0 border-b-0 rounded-tr-xl" />

                        <h3 className="text-lg font-bold text-whiteChrome mb-2">
                          {step.title}
                        </h3>
                        <p className="text-ashGrey text-sm leading-relaxed max-w-2xl">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
