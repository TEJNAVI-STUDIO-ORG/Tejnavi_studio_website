"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

const SERVICE_TYPES = [
    { id: "web", label: "Website", basePrice: 2000 },
    { id: "ecom", label: "E-commerce Store", basePrice: 4500 },
    { id: "webapp", label: "Web Application", basePrice: 6500 },
    { id: "app", label: "Mobile App", basePrice: 5000 },
    { id: "saas", label: "SaaS Platform", basePrice: 8000 },
    { id: "crm", label: "Custom CRM", basePrice: 9000 },
    { id: "automation", label: "Automation / AI", basePrice: 7000 },
    { id: "uiux", label: "UI/UX Design", basePrice: 3000 }
];

const SERVICE_REQUIREMENTS: Record<string, { id: string; label: string; price: number }[]> = {
    web: [
        { id: "landing", label: "Landing Page", price: 0 },
        { id: "multipage", label: "Multi-page Website", price: 1200 },
        { id: "cms", label: "CMS-driven Website", price: 2000 },
    ],
    ecom: [
        { id: "starter_store", label: "Starter Store", price: 0 },
        { id: "custom_theme", label: "Custom Theme", price: 1800 },
        { id: "headless", label: "Headless E-commerce", price: 3500 },
    ],
    webapp: [
        { id: "mvp", label: "MVP Build", price: 0 },
        { id: "full_product", label: "Full Product", price: 3500 },
        { id: "enterprise", label: "Enterprise-grade", price: 6000 },
    ],
    app: [
        { id: "mvp", label: "MVP App", price: 0 },
        { id: "cross_platform", label: "Cross-platform App", price: 2200 },
        { id: "native", label: "Native iOS + Android", price: 4500 },
    ],
    saas: [
        { id: "mvp", label: "SaaS MVP", price: 0 },
        { id: "growth", label: "Growth-ready SaaS", price: 5000 },
        { id: "enterprise", label: "Enterprise SaaS", price: 8500 },
    ],
    crm: [
        { id: "basic", label: "Basic CRM", price: 0 },
        { id: "custom_pipelines", label: "Custom Pipelines", price: 2500 },
        { id: "integrations", label: "Deep Integrations", price: 4500 },
    ],
    automation: [
        { id: "workflow", label: "Workflow Automation", price: 0 },
        { id: "ai_assist", label: "AI Assistants", price: 3500 },
        { id: "rag", label: "RAG / Knowledge Base", price: 5500 },
    ],
    uiux: [
        { id: "ui_refresh", label: "UI Refresh", price: 0 },
        { id: "product_uiux", label: "End-to-End Product UI/UX", price: 2500 },
        { id: "design_system", label: "Design System", price: 4000 },
    ],
};

const FEATURES_BY_SERVICE: Record<string, { id: string; label: string; price: number }[]> = {
    web: [
        { id: "seo", label: "SEO Setup", price: 600 },
        { id: "forms", label: "Lead Forms", price: 400 },
        { id: "cms", label: "CMS Integration", price: 1200 },
        { id: "animations", label: "Premium Animations", price: 900 },
        { id: "analytics", label: "Analytics", price: 500 },
    ],
    ecom: [
        { id: "payments", label: "Payment Gateway", price: 1200 },
        { id: "shipping", label: "Shipping Setup", price: 700 },
        { id: "inventory", label: "Inventory / SKUs", price: 800 },
        { id: "subscriptions", label: "Subscriptions", price: 1600 },
        { id: "analytics", label: "Advanced Analytics", price: 1000 },
    ],
    webapp: [
        { id: "auth", label: "User Login System", price: 800 },
        { id: "admin", label: "Admin Panel", price: 1500 },
        { id: "api", label: "Third-party API Integration", price: 1000 },
        { id: "realtime", label: "Real-time Features", price: 2200 },
        { id: "analytics", label: "Advanced Analytics", price: 2000 },
    ],
    app: [
        { id: "auth", label: "User Login System", price: 900 },
        { id: "payments", label: "In-app Payments", price: 1400 },
        { id: "push", label: "Push Notifications", price: 900 },
        { id: "offline", label: "Offline Mode", price: 1800 },
        { id: "analytics", label: "Analytics", price: 900 },
    ],
    saas: [
        { id: "auth", label: "Auth + Roles", price: 1400 },
        { id: "billing", label: "Subscription Billing", price: 2500 },
        { id: "admin", label: "Admin Panel", price: 2200 },
        { id: "integrations", label: "Integrations", price: 1800 },
        { id: "analytics", label: "Analytics & Reporting", price: 2400 },
    ],
    crm: [
        { id: "pipelines", label: "Pipelines & Stages", price: 1600 },
        { id: "automation", label: "Automation Rules", price: 2200 },
        { id: "integrations", label: "Email/Calendar Integrations", price: 1800 },
        { id: "reports", label: "Reporting Dashboards", price: 2400 },
        { id: "permissions", label: "Roles & Permissions", price: 1400 },
    ],
    automation: [
        { id: "integrations", label: "Tool Integrations", price: 1600 },
        { id: "agent", label: "Agent / Assistant UI", price: 2200 },
        { id: "rag", label: "Knowledge Base (RAG)", price: 2600 },
        { id: "monitoring", label: "Monitoring & Guardrails", price: 1400 },
        { id: "analytics", label: "Analytics", price: 900 },
    ],
    uiux: [
        { id: "research", label: "User Research", price: 1200 },
        { id: "prototype", label: "Interactive Prototype", price: 900 },
        { id: "design_system", label: "Design System", price: 2000 },
        { id: "handoff", label: "Developer Handoff", price: 700 },
    ],
};

const TIMELINES = [
    { id: "relaxed", label: "Relaxed (8-12 weeks)", multiplier: 1 },
    { id: "standard", label: "Standard (4-8 weeks)", multiplier: 1.2 },
    { id: "fast", label: "Fast (3-6 weeks)", multiplier: 1.35 },
    { id: "rush", label: "Rush (2-4 weeks)", multiplier: 1.5 },
    { id: "sprint", label: "Sprint (1-2 weeks)", multiplier: 1.8 }
];

const PRESETS = [
    {
        id: "web_starter",
        title: "Website Starter",
        description: "Fast launch, clean design, lead-ready.",
        serviceType: "web",
        requirement: "landing",
        features: ["seo", "forms", "analytics"],
        timeline: "standard",
    },
    {
        id: "ecom_growth",
        title: "E-commerce Growth",
        description: "Store + conversions + tracking.",
        serviceType: "ecom",
        requirement: "custom_theme",
        features: ["payments", "shipping", "inventory", "analytics"],
        timeline: "fast",
    },
    {
        id: "saas_mvp",
        title: "SaaS MVP",
        description: "Auth, billing-ready foundation.",
        serviceType: "saas",
        requirement: "mvp",
        features: ["auth", "billing", "admin"],
        timeline: "standard",
    },
    {
        id: "app_launch",
        title: "Mobile App Launch",
        description: "Cross-platform + push + analytics.",
        serviceType: "app",
        requirement: "cross_platform",
        features: ["auth", "push", "analytics"],
        timeline: "fast",
    },
];

export default function Quote() {
    const [step, setStep] = useState<1 | 2>(1);
    const [selections, setSelections] = useState({
        serviceType: "",
        requirement: "",
        features: [] as string[],
        timeline: "standard"
    });

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        description: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const toggleFeature = (featureId: string) => {
        setSelections(prev => {
            if (prev.features.includes(featureId)) {
                return { ...prev, features: prev.features.filter(id => id !== featureId) };
            } else {
                return { ...prev, features: [...prev.features, featureId] };
            }
        });
    };

    const applyPreset = (presetId: string) => {
        const preset = PRESETS.find((p) => p.id === presetId);
        if (!preset) return;
        setSelections({
            serviceType: preset.serviceType,
            requirement: preset.requirement,
            features: preset.features,
            timeline: preset.timeline,
        });
    };

    const getFeaturesForSelection = () => {
        if (!selections.serviceType) return [];
        return FEATURES_BY_SERVICE[selections.serviceType] ?? [];
    };

    const getRequirementsForSelection = () => {
        if (!selections.serviceType) return [];
        return SERVICE_REQUIREMENTS[selections.serviceType] ?? [];
    };

    const calculateBreakdown = () => {
        const baseService = SERVICE_TYPES.find(s => s.id === selections.serviceType);
        const base = baseService?.basePrice ?? 0;

        const requirement = getRequirementsForSelection().find((r) => r.id === selections.requirement);
        const requirementCost = requirement?.price ?? 0;

        const featureCost = selections.features.reduce((sum, featId) => {
            const feature = getFeaturesForSelection().find(f => f.id === featId);
            return sum + (feature?.price ?? 0);
        }, 0);

        const timeline = TIMELINES.find(t => t.id === selections.timeline);
        const multiplier = timeline?.multiplier ?? 1;

        const subtotal = base + requirementCost + featureCost;
        const total = Math.round(subtotal * multiplier);

        return {
            base,
            requirementCost,
            featureCost,
            subtotal,
            multiplier,
            total,
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.description) {
            setError("Please fill out your name, email, and project description.");
            return;
        }

        setStatus("submitting");
        setError(null);

        const payload = {
            ...form,
            projectType: SERVICE_TYPES.find((s) => s.id === selections.serviceType)?.label || "",
            budget: `$${calculateBreakdown().total.toLocaleString()}`,
            timeline: TIMELINES.find((t) => t.id === selections.timeline)?.label || "",
        };

        try {
            const res = await fetch("/api/admin/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to submit quote");
            setStatus("success");
            setStep(1); // Optionally reset or stay on step 2
        } catch (err) {
            console.error(err);
            setStatus("error");
            setError("Failed to send quote request. Please try again.");
        }
    };

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Column - Form */}
                <div className="lg:w-2/3">
                    {step === 1 ? (
                        <>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome mb-4">
                                    PROJECT <span className="text-liquidSilver italic">ESTIMATOR</span>
                                </h1>
                                <p className="text-ashGrey mb-12">Select your requirements below for an instant ballpark estimate.</p>
                            </motion.div>

                            <div className="space-y-16">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.05 }}
                                >
                                    <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">00</span>
                                        Presets
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {PRESETS.map((preset) => {
                                            const baseService = SERVICE_TYPES.find((s) => s.id === preset.serviceType);
                                            const requirement = (SERVICE_REQUIREMENTS[preset.serviceType] ?? []).find((r) => r.id === preset.requirement);
                                            const featureCost = (FEATURES_BY_SERVICE[preset.serviceType] ?? []).reduce((sum, f) => {
                                                return sum + (preset.features.includes(f.id) ? f.price : 0);
                                            }, 0);
                                            const subtotal = (baseService?.basePrice ?? 0) + (requirement?.price ?? 0) + featureCost;
                                            const timeline = TIMELINES.find((t) => t.id === preset.timeline);
                                            const total = Math.round(subtotal * (timeline?.multiplier ?? 1));

                                            return (
                                                <button
                                                    key={preset.id}
                                                    onClick={() => applyPreset(preset.id)}
                                                    className="p-6 text-left border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <div className="font-bold text-lg text-whiteChrome">{preset.title}</div>
                                                            <div className="text-ashGrey text-sm mt-1">{preset.description}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm tracking-widest uppercase font-bold text-liquidSilver">From</div>
                                                            <div className="text-xl font-heading font-bold text-whiteChrome">${total.toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 text-sm font-bold uppercase tracking-widest text-liquidSilver border-b border-liquidSilver/30 inline-block pb-1">
                                                        Apply Preset
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>

                                {/* Step 1: Service Type */}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                                    <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">01A</span>
                                        What are we building?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {SERVICE_TYPES.map(service => (
                                            <button
                                                key={service.id}
                                                onClick={() => setSelections({ ...selections, serviceType: service.id, requirement: "", features: [] })}
                                                className={`p-6 text-left border transition-all duration-300 ${selections.serviceType === service.id
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

                                {/* Step 1B: Requirements */}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className={!selections.serviceType ? 'opacity-50 pointer-events-none' : ''}>
                                    <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">01B</span>
                                        What do you need inside it?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {getRequirementsForSelection().map(req => (
                                            <button
                                                key={req.id}
                                                onClick={() => setSelections({ ...selections, requirement: req.id })}
                                                className={`p-5 text-left border transition-all duration-300 ${selections.requirement === req.id
                                                    ? 'border-whiteChrome bg-white/5'
                                                    : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold">{req.label}</span>
                                                    <span className="text-sm text-liquidSilver">{req.price === 0 ? 'Included' : `+$${req.price.toLocaleString()}`}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Step 2: Features */}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={!selections.serviceType ? 'opacity-50 pointer-events-none' : ''}>
                                    <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">02</span>
                                        Required Features
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {getFeaturesForSelection().map(feature => (
                                            <button
                                                key={feature.id}
                                                onClick={() => toggleFeature(feature.id)}
                                                className={`p-4 text-left border transition-all duration-300 flex items-center ${selections.features.includes(feature.id)
                                                    ? 'border-whiteChrome bg-white/5'
                                                    : 'border-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded border mr-4 flex items-center justify-center ${selections.features.includes(feature.id) ? 'bg-whiteChrome border-whiteChrome' : 'border-white/30'}`}>
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
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className={!selections.serviceType ? 'opacity-50 pointer-events-none' : ''}>
                                    <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs mr-4">03</span>
                                        Timeline Expectation
                                    </h3>
                                    <div className="space-y-4">
                                        {TIMELINES.map(timeline => (
                                            <button
                                                key={timeline.id}
                                                onClick={() => setSelections({ ...selections, timeline: timeline.id })}
                                                className={`w-full p-5 text-left border transition-all duration-300 flex justify-between items-center ${selections.timeline === timeline.id
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
                        </>
                    ) : (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-brushedAnthracite p-8 md:p-12 border border-white/5">
                            <h2 className="text-3xl font-heading font-bold text-whiteChrome mb-2">Final Step</h2>
                            <p className="text-ashGrey mb-8">Tell us about yourself so we can send the proposal.</p>

                            {status === "success" ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-whiteChrome mb-2">Quote Request Sent!</h3>
                                    <p className="text-ashGrey">We have received your requirements and will be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Your Name</label>
                                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Email</label>
                                            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors" placeholder="john@company.com" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Company (Optional)</label>
                                            <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors" placeholder="Acme Inc." />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Phone (Optional)</label>
                                            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Project Details</label>
                                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={4} className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors resize-none" placeholder="Tell us more about your goals..." />
                                    </div>

                                    {error && <p className="text-red-400 text-sm">{error}</p>}

                                    <div className="flex gap-4 pt-4">
                                        <button type="button" onClick={() => setStep(1)} className="border border-white/10 text-ashGrey px-6 py-4 text-xs font-bold uppercase tracking-widest hover:text-whiteChrome transition-colors">Back</button>
                                        <button type="submit" disabled={status === "submitting"} className="flex-1 bg-whiteChrome text-matteCarbon py-4 font-bold uppercase tracking-widest text-sm hover:bg-mercuryGlow transition-all duration-300 disabled:opacity-50">
                                            {status === "submitting" ? "Submitting..." : "Submit Quote Request"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Right Column - Sticky Estimate */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32 bg-brushedAnthracite border border-white/10 p-8">
                        <h4 className="text-sm tracking-widest uppercase font-bold text-liquidSilver mb-8">Estimated Investment</h4>

                        <div className="text-5xl font-heading font-bold text-whiteChrome mb-2">
                            $<Counter value={calculateBreakdown().total} />
                        </div>
                        <p className="text-ashGrey text-sm mb-8">*This is a ballpark estimate. Final cost depends on full scope.</p>

                        <div className="space-y-4 mb-8 text-sm">
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-ashGrey">Base:</span>
                                <span className="text-whiteChrome">{selections.serviceType ? SERVICE_TYPES.find(s => s.id === selections.serviceType)?.label : 'Not selected'}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-ashGrey">Scope:</span>
                                <span className="text-whiteChrome">{selections.requirement ? (getRequirementsForSelection().find(r => r.id === selections.requirement)?.label ?? 'Not selected') : 'Not selected'}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-ashGrey">Features:</span>
                                <span className="text-whiteChrome">{selections.features.length} selected</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-ashGrey">Timeline:</span>
                                <span className="text-whiteChrome">{TIMELINES.find(t => t.id === selections.timeline)?.label}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ashGrey">Rush Factor:</span>
                                <span className="text-whiteChrome">×{calculateBreakdown().multiplier}</span>
                            </div>
                        </div>

                        {step === 1 && (
                            <button
                                disabled={!selections.serviceType}
                                onClick={() => setStep(2)}
                                className={`w-full py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center transition-all duration-300 ${selections.serviceType
                                    ? 'bg-whiteChrome text-matteCarbon hover:bg-mercuryGlow'
                                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                                    }`}
                            >
                                Continue <ArrowRight size={18} className="ml-2" />
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
