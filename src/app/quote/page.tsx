"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, ArrowRight, X, IndianRupee, DollarSign, Loader2 } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { useToast } from "@/hooks/use-toast";

// Exchange rate: 1 USD ≈ 85 INR
const INR_RATE = 85;

const SERVICE_TYPES = [
    { id: "web", label: "Website", basePrice: 800 },
    { id: "ecom", label: "E-commerce Store", basePrice: 1800 },
    { id: "webapp", label: "Web Application", basePrice: 3000 },
    { id: "app", label: "Mobile App", basePrice: 2500 },
    { id: "saas", label: "SaaS Platform", basePrice: 5000 },
    { id: "crm", label: "Custom CRM", basePrice: 4500 },
    { id: "automation", label: "Automation / AI", basePrice: 3500 },
    { id: "uiux", label: "UI/UX Design", basePrice: 1200 }
];

const SERVICE_REQUIREMENTS: Record<string, { id: string; label: string; price: number }[]> = {
    web: [
        { id: "landing", label: "Landing Page", price: 0 },
        { id: "multipage", label: "Multi-page Website", price: 500 },
        { id: "cms", label: "CMS-driven Website", price: 900 },
    ],
    ecom: [
        { id: "starter_store", label: "Starter Store", price: 0 },
        { id: "custom_theme", label: "Custom Theme", price: 800 },
        { id: "headless", label: "Headless E-commerce", price: 1800 },
    ],
    webapp: [
        { id: "mvp", label: "MVP Build", price: 0 },
        { id: "full_product", label: "Full Product", price: 1800 },
        { id: "enterprise", label: "Enterprise-grade", price: 3500 },
    ],
    app: [
        { id: "mvp", label: "MVP App", price: 0 },
        { id: "cross_platform", label: "Cross-platform App", price: 1200 },
        { id: "native", label: "Native iOS + Android", price: 2500 },
    ],
    saas: [
        { id: "mvp", label: "SaaS MVP", price: 0 },
        { id: "growth", label: "Growth-ready SaaS", price: 2500 },
        { id: "enterprise", label: "Enterprise SaaS", price: 5000 },
    ],
    crm: [
        { id: "basic", label: "Basic CRM", price: 0 },
        { id: "custom_pipelines", label: "Custom Pipelines", price: 1200 },
        { id: "integrations", label: "Deep Integrations", price: 2500 },
    ],
    automation: [
        { id: "workflow", label: "Workflow Automation", price: 0 },
        { id: "ai_assist", label: "AI Assistants", price: 1800 },
        { id: "rag", label: "RAG / Knowledge Base", price: 3000 },
    ],
    uiux: [
        { id: "ui_refresh", label: "UI Refresh", price: 0 },
        { id: "product_uiux", label: "End-to-End Product UI/UX", price: 1200 },
        { id: "design_system", label: "Design System", price: 2000 },
    ],
};

const FEATURES_BY_SERVICE: Record<string, { id: string; label: string; price: number }[]> = {
    web: [
        { id: "seo", label: "SEO Setup", price: 250 },
        { id: "forms", label: "Lead Forms", price: 150 },
        { id: "cms", label: "CMS Integration", price: 600 },
        { id: "animations", label: "Premium Animations", price: 400 },
        { id: "analytics", label: "Analytics", price: 200 },
    ],
    ecom: [
        { id: "payments", label: "Payment Gateway", price: 500 },
        { id: "shipping", label: "Shipping Setup", price: 300 },
        { id: "inventory", label: "Inventory / SKUs", price: 350 },
        { id: "subscriptions", label: "Subscriptions", price: 700 },
        { id: "analytics", label: "Advanced Analytics", price: 450 },
    ],
    webapp: [
        { id: "auth", label: "User Login System", price: 350 },
        { id: "admin", label: "Admin Panel", price: 700 },
        { id: "api", label: "Third-party API Integration", price: 450 },
        { id: "realtime", label: "Real-time Features", price: 1000 },
        { id: "analytics", label: "Advanced Analytics", price: 900 },
    ],
    app: [
        { id: "auth", label: "User Login System", price: 400 },
        { id: "payments", label: "In-app Payments", price: 600 },
        { id: "push", label: "Push Notifications", price: 400 },
        { id: "offline", label: "Offline Mode", price: 800 },
        { id: "analytics", label: "Analytics", price: 400 },
    ],
    saas: [
        { id: "auth", label: "Auth + Roles", price: 700 },
        { id: "billing", label: "Subscription Billing", price: 1200 },
        { id: "admin", label: "Admin Panel", price: 1000 },
        { id: "integrations", label: "Integrations", price: 900 },
        { id: "analytics", label: "Analytics & Reporting", price: 1100 },
    ],
    crm: [
        { id: "pipelines", label: "Pipelines & Stages", price: 700 },
        { id: "automation", label: "Automation Rules", price: 1000 },
        { id: "integrations", label: "Email/Calendar Integrations", price: 900 },
        { id: "reports", label: "Reporting Dashboards", price: 1100 },
        { id: "permissions", label: "Roles & Permissions", price: 600 },
    ],
    automation: [
        { id: "integrations", label: "Tool Integrations", price: 700 },
        { id: "agent", label: "Agent / Assistant UI", price: 1000 },
        { id: "rag", label: "Knowledge Base (RAG)", price: 1200 },
        { id: "monitoring", label: "Monitoring & Guardrails", price: 600 },
        { id: "analytics", label: "Analytics", price: 400 },
    ],
    uiux: [
        { id: "research", label: "User Research", price: 500 },
        { id: "prototype", label: "Interactive Prototype", price: 400 },
        { id: "design_system", label: "Design System", price: 900 },
        { id: "handoff", label: "Developer Handoff", price: 300 },
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
        description: "Fast launch, clean design, lead-ready. Perfect for small businesses.",
        serviceType: "web",
        requirement: "multipage",
        features: ["seo", "forms", "analytics"],
        timeline: "standard",
        badge: "Most Popular",
    },
    {
        id: "saas_mvp",
        title: "SaaS MVP",
        description: "Auth, billing-ready foundation to validate your product fast.",
        serviceType: "saas",
        requirement: "mvp",
        features: ["auth", "billing", "admin"],
        timeline: "standard",
        badge: "Fan Favourite",
    },
    {
        id: "app_launch",
        title: "Mobile App Launch",
        description: "Cross-platform app with auth, notifications, and analytics.",
        serviceType: "app",
        requirement: "cross_platform",
        features: ["auth", "push", "analytics"],
        timeline: "fast",
        badge: "Best Value",
    },
];

type Currency = "INR" | "USD";

interface QuoteSelections {
    serviceType: string;
    requirement: string;
    features: string[];
    timeline: string;
    insights: string;
}

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    company: string;
}

function formatPrice(usdAmount: number, currency: Currency): string {
    if (currency === "INR") {
        const inr = Math.round(usdAmount * INR_RATE);
        return `₹${inr.toLocaleString("en-IN")}`;
    }
    return `$${usdAmount.toLocaleString("en-US")}`;
}

export default function Quote() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [currency, setCurrency] = useState<Currency>("INR");
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selections, setSelections] = useState<QuoteSelections>({
        serviceType: "",
        requirement: "",
        features: [] as string[],
        timeline: "standard",
        insights: ""
    });

    const [contactForm, setContactForm] = useState<ContactForm>({
        name: "",
        email: "",
        phone: "",
        company: "",
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [showModal]);

    const toggleFeature = (featureId: string) => {
        setSelections(prev => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter(id => id !== featureId)
                : [...prev.features, featureId]
        }));
    };

    const applyPreset = (presetId: string) => {
        const preset = PRESETS.find((p) => p.id === presetId);
        if (!preset) return;
        setSelections({
            serviceType: preset.serviceType,
            requirement: preset.requirement,
            features: preset.features,
            timeline: preset.timeline,
            insights: selections.insights
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
        const minTotal = Math.round(subtotal * multiplier);
        const maxTotal = minTotal > 0 ? minTotal + 500 : 0;

        return { base, requirementCost, featureCost, subtotal, multiplier, minTotal, maxTotal };
    };

    const presetCalc = (preset: typeof PRESETS[0]) => {
        const baseService = SERVICE_TYPES.find(s => s.id === preset.serviceType);
        const base = baseService?.basePrice ?? 0;
        const requirement = (SERVICE_REQUIREMENTS[preset.serviceType] ?? []).find(r => r.id === preset.requirement);
        const featureCost = (FEATURES_BY_SERVICE[preset.serviceType] ?? []).reduce((sum, f) =>
            sum + (preset.features.includes(f.id) ? f.price : 0), 0);
        const subtotal = base + (requirement?.price ?? 0) + featureCost;
        const timeline = TIMELINES.find(t => t.id === preset.timeline);
        const minT = Math.round(subtotal * (timeline?.multiplier ?? 1));
        return { minT, maxT: minT + 500 };
    };

    const handleSubmit = async () => {
        if (!contactForm.name || !contactForm.email) {
            toast({ title: "Please fill in name and email.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            const bd = calculateBreakdown();
            const selectedService = SERVICE_TYPES.find(s => s.id === selections.serviceType);
            const selectedReq = getRequirementsForSelection().find(r => r.id === selections.requirement);
            const selectedTimeline = TIMELINES.find(t => t.id === selections.timeline);
            const featureLabels = selections.features.map(fId =>
                getFeaturesForSelection().find(f => f.id === fId)?.label ?? fId
            );

            const actualMin = currency === "INR" ? Math.round(bd.minTotal * INR_RATE) : bd.minTotal;
            const actualMax = currency === "INR" ? Math.round(bd.maxTotal * INR_RATE) : bd.maxTotal;

            await fetch("/api/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: contactForm.name,
                    email: contactForm.email,
                    phone: contactForm.phone,
                    company: contactForm.company,
                    projectType: selectedService?.label,
                    budget: selectedReq?.label,
                    timeline: selectedTimeline?.label,
                    description: selections.insights,
                    currency,
                    estimateMin: actualMin,
                    estimateMax: actualMax,
                    features: featureLabels,
                }),
            });

            setShowModal(false);
            toast({
                title: "Quote submitted! ✅",
                description: "We'll send you a detailed proposal within 24-48 hours.",
            });
            setContactForm({ name: "", email: "", phone: "", company: "" });
        } catch {
            toast({ title: "Something went wrong.", description: "Please try again.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const breakdown = calculateBreakdown();
    const hasSelection = selections.serviceType !== "";

    if (!isMounted) return null;

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6 font-sans">

            {/* === CURRENCY TOGGLE === */}
            <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome mb-2">
                        PROJECT <span className="text-liquidSilver italic">ESTIMATOR</span>
                    </h1>
                    <p className="text-ashGrey text-sm">Select your requirements to get a live estimate.</p>
                </div>

                {/* Currency Toggle */}
                <div className="flex items-center bg-brushedAnthracite border border-white/10 rounded-full p-1 gap-1">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-200 ${currency === "INR"
                            ? "bg-whiteChrome text-matteCarbon"
                            : "text-ashGrey hover:text-whiteChrome"
                            }`}
                    >
                        <IndianRupee size={14} /> INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-200 ${currency === "USD"
                            ? "bg-whiteChrome text-matteCarbon"
                            : "text-ashGrey hover:text-whiteChrome"
                            }`}
                    >
                        <DollarSign size={14} /> USD
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Column - Form */}
                <div className="lg:w-2/3">
                    <div className="space-y-16">

                        {/* Step 1: Presets */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">01</span>
                                Quick Presets
                                <span className="ml-4 text-xs text-ashGrey font-normal normal-case tracking-normal">— One click to configure</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PRESETS.map((preset) => {
                                    const { minT, maxT } = presetCalc(preset);
                                    const isActive = selections.serviceType === preset.serviceType && selections.requirement === preset.requirement;
                                    return (
                                        <button
                                            key={preset.id}
                                            onClick={() => applyPreset(preset.id)}
                                            className={`p-6 text-left border transition-all duration-300 w-full relative group flex flex-col justify-between gap-6 ${isActive
                                                ? "border-whiteChrome bg-white/5"
                                                : "border-white/5 hover:border-white/20 hover:bg-white/5 bg-brushedAnthracite"
                                                }`}
                                        >
                                            {/* Badge */}
                                            <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.15em] bg-whiteChrome/10 text-liquidSilver px-2 py-0.5">
                                                {preset.badge}
                                            </span>
                                            <div>
                                                <div className="font-bold text-base text-whiteChrome mb-1">{preset.title}</div>
                                                <div className="text-ashGrey text-xs leading-relaxed">{preset.description}</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-liquidSilver mb-1">Estimated Range</div>
                                                <div className="text-lg font-heading font-bold text-whiteChrome">
                                                    {formatPrice(minT, currency)} – {formatPrice(maxT, currency)}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Step 2: What are we building? */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">02</span>
                                What are we building?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {SERVICE_TYPES.map(service => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelections({ ...selections, serviceType: service.id, requirement: "", features: [] })}
                                        className={`p-6 text-left border transition-all duration-300 ${selections.serviceType === service.id
                                            ? "border-whiteChrome bg-white/5"
                                            : "border-white/5 hover:border-white/20 bg-brushedAnthracite hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-bold text-base text-whiteChrome">{service.label}</span>
                                                <div className="text-xs text-ashGrey mt-1">
                                                    From {formatPrice(service.basePrice, currency)}
                                                </div>
                                            </div>
                                            {selections.serviceType === service.id && <Check size={18} className="text-whiteChrome shrink-0" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Step 3: Scope */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className={!selections.serviceType ? "opacity-40 pointer-events-none" : ""}
                        >
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">03</span>
                                What scope / tier?
                            </h3>
                            {selections.serviceType ? (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {getRequirementsForSelection().map(req => (
                                        <button
                                            key={req.id}
                                            onClick={() => setSelections({ ...selections, requirement: req.id })}
                                            className={`p-5 text-left border transition-all duration-300 ${selections.requirement === req.id
                                                ? "border-whiteChrome bg-white/5"
                                                : "border-white/5 hover:border-white/20 bg-brushedAnthracite hover:bg-white/5"
                                                }`}
                                        >
                                            <div className="font-bold text-sm text-whiteChrome">{req.label}</div>
                                            <div className="text-xs text-ashGrey mt-1">
                                                {req.price === 0 ? "Included" : `+${formatPrice(req.price, currency)}`}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 border border-white/5 text-ashGrey text-sm bg-black/20">Please select what we are building first.</div>
                            )}
                        </motion.div>

                        {/* Step 4: Required Features */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={!selections.serviceType ? "opacity-40 pointer-events-none" : ""}
                        >
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">04</span>
                                Required Features
                            </h3>
                            {selections.serviceType ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {getFeaturesForSelection().map(feature => (
                                        <button
                                            key={feature.id}
                                            onClick={() => toggleFeature(feature.id)}
                                            className={`p-5 text-left border transition-all duration-300 flex items-center justify-between ${selections.features.includes(feature.id)
                                                ? "border-whiteChrome bg-white/5"
                                                : "border-white/5 bg-brushedAnthracite hover:border-white/20"
                                                }`}
                                        >
                                            <div>
                                                <span className={`font-bold text-sm ${selections.features.includes(feature.id) ? "text-whiteChrome" : "text-ashGrey"}`}>
                                                    {feature.label}
                                                </span>
                                                <div className="text-xs text-ashGrey/70 mt-0.5">+{formatPrice(feature.price, currency)}</div>
                                            </div>
                                            <div className={`w-5 h-5 rounded border flex flex-shrink-0 items-center justify-center ${selections.features.includes(feature.id) ? "bg-whiteChrome border-whiteChrome" : "border-white/20"}`}>
                                                {selections.features.includes(feature.id) && <Check size={13} className="text-matteCarbon" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 border border-white/5 text-ashGrey text-sm bg-black/20">Please select what we are building first.</div>
                            )}
                        </motion.div>

                        {/* Step 5: Timeline */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">05</span>
                                Timeline Expectation
                            </h3>
                            <div className="space-y-3">
                                {TIMELINES.map(timeline => (
                                    <button
                                        key={timeline.id}
                                        onClick={() => setSelections({ ...selections, timeline: timeline.id })}
                                        className={`w-full p-5 text-left border transition-all duration-300 flex justify-between items-center ${selections.timeline === timeline.id
                                            ? "border-whiteChrome bg-white/5"
                                            : "border-white/5 bg-brushedAnthracite hover:border-white/20"
                                            }`}
                                    >
                                        <span className={`font-bold text-sm ${selections.timeline === timeline.id ? "text-whiteChrome" : "text-ashGrey"}`}>
                                            {timeline.label}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            {timeline.multiplier > 1 && (
                                                <span className="text-xs text-ashGrey">×{timeline.multiplier} rush factor</span>
                                            )}
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selections.timeline === timeline.id ? "border-whiteChrome" : "border-white/20"}`}>
                                                {selections.timeline === timeline.id && <div className="w-2 h-2 rounded-full bg-whiteChrome" />}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Step 6: Project Insights */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">06</span>
                                Project Insights
                                <span className="ml-4 text-xs text-ashGrey font-normal normal-case tracking-normal">— Optional but helps us respond faster</span>
                            </h3>
                            <textarea
                                className="w-full bg-brushedAnthracite border border-white/5 p-6 text-whiteChrome focus:border-white/30 focus:outline-none transition-colors resize-y min-h-[140px] text-sm placeholder:text-white/20"
                                placeholder="Tell us more about your vision, business goals, or specific challenges..."
                                value={selections.insights}
                                onChange={(e) => setSelections({ ...selections, insights: e.target.value })}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Right Column - Sticky Estimate */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32">
                        <div className="bg-[#141414] border border-white/5 p-8 shadow-2xl">

                            {/* Currency badge */}
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-[11px] tracking-[0.2em] uppercase font-bold text-whiteChrome">Estimated Investment</h4>
                                <span className="text-[9px] font-bold uppercase tracking-wider border border-white/10 px-2 py-1 text-liquidSilver">
                                    {currency}
                                </span>
                            </div>

                            <div className="text-4xl font-heading font-bold text-whiteChrome mb-4 flex items-baseline flex-wrap gap-1 leading-tight">
                                {hasSelection && breakdown.minTotal > 0 ? (
                                    <>
                                        <span>{currency === "INR" ? "₹" : "$"}</span>
                                        <Counter value={currency === "INR" ? Math.round(breakdown.minTotal * INR_RATE) : breakdown.minTotal} />
                                        <span className="text-3xl mx-1">–</span>
                                        <span>{currency === "INR" ? "₹" : "$"}</span>
                                        <Counter value={currency === "INR" ? Math.round(breakdown.maxTotal * INR_RATE) : breakdown.maxTotal} />
                                    </>
                                ) : (
                                    <span className="text-ashGrey text-2xl">Select a service</span>
                                )}
                            </div>

                            <p className="text-ashGrey text-[12px] mb-8 leading-relaxed border-b border-white/5 pb-8">
                                *Ballpark estimate. Final cost depends on full scope discussion.
                            </p>

                            {/* Breakdown */}
                            <div className="space-y-5 mb-8 text-[13px]">
                                <div className="flex justify-between items-start border-b border-white/5 pb-5">
                                    <span className="text-ashGrey">Base:</span>
                                    <span className="text-whiteChrome text-right ml-4">
                                        {hasSelection ? SERVICE_TYPES.find(s => s.id === selections.serviceType)?.label : "Not selected"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start border-b border-white/5 pb-5">
                                    <span className="text-ashGrey">Scope:</span>
                                    <span className="text-whiteChrome text-right ml-4">
                                        {hasSelection && selections.requirement ? (getRequirementsForSelection().find(r => r.id === selections.requirement)?.label ?? "Not selected") : "Not selected"}
                                    </span>
                                </div>
                                {selections.features.length > 0 && (
                                    <div className="flex flex-col border-b border-white/5 pb-5">
                                        <span className="text-ashGrey mb-3">Features:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selections.features.map(fId => {
                                                const feature = getFeaturesForSelection().find(f => f.id === fId);
                                                return feature ? (
                                                    <span key={feature.id} className="text-[9px] uppercase tracking-wider text-ashGrey border border-white/10 px-2 py-1 bg-white/5">
                                                        {feature.label}
                                                    </span>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center border-b border-white/5 pb-5">
                                    <span className="text-ashGrey">Timeline:</span>
                                    <span className="text-whiteChrome text-right ml-4">
                                        {TIMELINES.find(t => t.id === selections.timeline)?.label}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-ashGrey">Rush Factor:</span>
                                    <span className="text-whiteChrome">×{breakdown.multiplier}</span>
                                </div>
                            </div>

                            <button
                                disabled={!hasSelection}
                                onClick={() => hasSelection && setShowModal(true)}
                                className={`w-full py-5 mt-2 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center transition-all duration-300 ${hasSelection
                                    ? "bg-white text-matteCarbon hover:bg-white/90 cursor-pointer"
                                    : "bg-white/20 text-white/30 cursor-not-allowed"
                                    }`}
                            >
                                GET THIS QUOTE <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome mb-8">
                        OUR PRICING <span className="italic text-liquidSilver">PHILOSOPHY</span>
                    </h2>
                    <p className="text-ashGrey text-sm leading-relaxed mb-6">
                        We don&apos;t believe in one-size-fits-all pricing. Every project we take on is unique, requiring a custom approach to engineering and design. Our estimates reflect the depth of craftsmanship and premium quality we deliver.
                    </p>
                    <p className="text-ashGrey text-sm leading-relaxed">
                        This range helps you understand the investment required for your vision. Once we discuss the details, we&apos;ll provide a firm quote tailored to your exact needs.
                    </p>
                </div>

                <div className="bg-[#141414] border border-white/5 p-8 shadow-2xl">
                    <h5 className="text-whiteChrome font-bold text-lg mb-6">What&apos;s included in every estimate?</h5>
                    <ul className="space-y-4">
                        {[
                            "Dedicated Project Manager",
                            "Weekly Progress Syncs",
                            "Rigorous Quality Assurance",
                            "Responsive Design (Mobile/Desktop)",
                            "Performance Optimization",
                            "30 Days Post-Launch Support"
                        ].map(item => (
                            <li key={item} className="flex text-ashGrey text-sm items-center">
                                <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* === SUBMIT MODAL === */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative bg-[#141414] border border-white/10 w-full max-w-lg p-8 shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-5 right-5 text-ashGrey hover:text-whiteChrome transition-colors"
                            >
                                <X size={22} />
                            </button>

                            <div className="mb-8">
                                <h3 className="text-2xl font-heading font-bold text-whiteChrome mb-2">Get Your Proposal</h3>
                                <p className="text-ashGrey text-sm">We&apos;ll send a detailed proposal within 24–48 hours.</p>
                            </div>

                            {/* Estimate Summary */}
                            <div className="bg-black/30 border border-white/5 p-4 mb-6 flex justify-between items-center">
                                <div className="text-ashGrey text-xs uppercase tracking-widest">Your Estimate</div>
                                <div className="text-whiteChrome font-bold font-heading text-lg">
                                    {formatPrice(breakdown.minTotal, currency)} – {formatPrice(breakdown.maxTotal, currency)}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-ashGrey uppercase tracking-widest mb-2">Name *</label>
                                        <input
                                            type="text"
                                            value={contactForm.name}
                                            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                            placeholder="Your name"
                                            className="w-full bg-brushedAnthracite border border-white/10 px-4 py-3 text-whiteChrome text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-ashGrey uppercase tracking-widest mb-2">Email *</label>
                                        <input
                                            type="email"
                                            value={contactForm.email}
                                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="w-full bg-brushedAnthracite border border-white/10 px-4 py-3 text-whiteChrome text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-ashGrey uppercase tracking-widest mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={contactForm.phone}
                                            onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                                            placeholder="+91 ..."
                                            className="w-full bg-brushedAnthracite border border-white/10 px-4 py-3 text-whiteChrome text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-ashGrey uppercase tracking-widest mb-2">Company</label>
                                        <input
                                            type="text"
                                            value={contactForm.company}
                                            onChange={e => setContactForm({ ...contactForm, company: e.target.value })}
                                            placeholder="Company name"
                                            className="w-full bg-brushedAnthracite border border-white/10 px-4 py-3 text-whiteChrome text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full mt-6 py-4 bg-whiteChrome text-matteCarbon font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center hover:bg-white/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <><Loader2 size={16} className="mr-2 animate-spin" /> Submitting...</>
                                ) : (
                                    <>SUBMIT REQUEST <ArrowRight size={16} className="ml-2" /></>
                                )}
                            </button>

                            <p className="text-center text-ashGrey text-xs mt-4">
                                We never share your information with third parties.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
