"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
        requirement: "multipage",
        features: ["seo", "forms", "analytics"],
        timeline: "standard",
    },
    {
        id: "ecom_growth",
        title: "E-commerce Growth",
        description: "Store + conversions + tracking.",
        serviceType: "ecom",
        requirement: "headless",
        features: ["payments", "shipping", "inventory", "analytics", "subscriptions"],
        timeline: "standard",
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
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    const [selections, setSelections] = useState({
        serviceType: "",
        requirement: "",
        features: [] as string[],
        timeline: "standard",
        insights: ""
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
        const maxTotal = minTotal > 0 ? minTotal + 1000 : 0;

        return {
            base,
            requirementCost,
            featureCost,
            subtotal,
            multiplier,
            minTotal,
            maxTotal
        };
    };

    const breakdown = calculateBreakdown();
    const hasSelection = selections.serviceType !== "";

    if (!isMounted) return null;

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Column - Form */}
                <div className="lg:w-2/3">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome mb-4">
                            PROJECT <span className="text-liquidSilver italic">ESTIMATOR</span>
                        </h1>
                        <p className="text-ashGrey">Select your requirements below to generate a live quote estimate.</p>
                    </motion.div>

                    <div className="space-y-16">
                        {/* Step 1: Presets */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">01</span>
                                Presets
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {PRESETS.map((preset) => {
                                    const baseService = SERVICE_TYPES.find((s) => s.id === preset.serviceType);
                                    const requirement = (SERVICE_REQUIREMENTS[preset.serviceType] ?? []).find((r) => r.id === preset.requirement);
                                    const featureCost = (FEATURES_BY_SERVICE[preset.serviceType] ?? []).reduce((sum, f) => {
                                        return sum + (preset.features.includes(f.id) ? f.price : 0);
                                    }, 0);
                                    const subtotal = (baseService?.basePrice ?? 0) + (requirement?.price ?? 0) + featureCost;
                                    const timeline = TIMELINES.find((t) => t.id === preset.timeline);
                                    const minT = Math.round(subtotal * (timeline?.multiplier ?? 1));
                                    const maxT = minT + 1000;

                                    return (
                                        <button
                                            key={preset.id}
                                            onClick={() => applyPreset(preset.id)}
                                            className="p-6 text-left border border-white/5 hover:border-white/20 hover:bg-white/5 bg-brushedAnthracite transition-all duration-300 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative group"
                                        >
                                            <div>
                                                <div className="font-bold text-lg text-whiteChrome group-hover:text-white transition-colors">{preset.title}</div>
                                                <div className="text-ashGrey text-sm mt-1">{preset.description}</div>
                                                <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-liquidSilver border-b border-liquidSilver/30 inline-block pb-0.5 group-hover:text-whiteChrome group-hover:border-whiteChrome transition-colors transition-colors">
                                                    Apply Preset
                                                </div>
                                            </div>
                                            <div className="sm:text-right flex-shrink-0">
                                                <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-liquidSilver mb-1">Estimated Range</div>
                                                <div className="text-xl font-heading font-bold text-whiteChrome">
                                                    ${minT.toLocaleString()} - ${maxT.toLocaleString()}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {SERVICE_TYPES.map(service => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelections({ ...selections, serviceType: service.id, requirement: "", features: [] })}
                                        className={`p-6 text-left border transition-all duration-300 ${selections.serviceType === service.id
                                            ? 'border-whiteChrome bg-white/5'
                                            : 'border-white/5 hover:border-white/20 bg-brushedAnthracite hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-base">{service.label}</span>
                                            {selections.serviceType === service.id && <Check size={18} className="text-whiteChrome" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Step 3: What do you need inside it? */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className={!selections.serviceType ? 'opacity-40 pointer-events-none' : ''}
                        >
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">03</span>
                                What do you need inside it?
                            </h3>
                            {selections.serviceType ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {getRequirementsForSelection().map(req => (
                                        <button
                                            key={req.id}
                                            onClick={() => setSelections({ ...selections, requirement: req.id })}
                                            className={`p-5 text-left border transition-all duration-300 flex justify-between items-center ${selections.requirement === req.id
                                                ? 'border-whiteChrome bg-white/5'
                                                : 'border-white/5 hover:border-white/20 bg-brushedAnthracite hover:bg-white/5'
                                                }`}
                                        >
                                            <span className="font-bold text-sm">{req.label}</span>
                                            {selections.requirement === req.id && <Check size={16} className="text-whiteChrome" />}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 border border-white/5 text-ashGrey text-sm bg-black/20">
                                    Please select what we are building first.
                                </div>
                            )}
                        </motion.div>

                        {/* Step 4: Required Features */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={!selections.serviceType ? 'opacity-40 pointer-events-none' : ''}
                        >
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">04</span>
                                Required Features
                            </h3>
                            {selections.serviceType ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {getFeaturesForSelection().map(feature => (
                                        <button
                                            key={feature.id}
                                            onClick={() => toggleFeature(feature.id)}
                                            className={`p-5 text-left border transition-all duration-300 flex items-center justify-between ${selections.features.includes(feature.id)
                                                ? 'border-whiteChrome bg-white/5'
                                                : 'border-white/5 bg-brushedAnthracite hover:border-white/20'
                                                }`}
                                        >
                                            <span className={selections.features.includes(feature.id) ? 'text-whiteChrome font-bold text-sm' : 'text-ashGrey text-sm'}>
                                                {feature.label}
                                            </span>
                                            <div className={`w-5 h-5 rounded border flex flex-shrink-0 items-center justify-center ${selections.features.includes(feature.id) ? 'bg-whiteChrome border-whiteChrome' : 'border-white/20'
                                                }`}>
                                                {selections.features.includes(feature.id) && <Check size={14} className="text-matteCarbon" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 border border-white/5 text-ashGrey text-sm bg-black/20">
                                    Please select what we are building first.
                                </div>
                            )}
                        </motion.div>

                        {/* Step 5: Timeline Expectation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">05</span>
                                Timeline Expectation
                            </h3>
                            <div className="space-y-4">
                                {TIMELINES.map(timeline => (
                                    <button
                                        key={timeline.id}
                                        onClick={() => setSelections({ ...selections, timeline: timeline.id })}
                                        className={`w-full p-5 text-left border transition-all duration-300 flex justify-between items-center ${selections.timeline === timeline.id
                                            ? 'border-whiteChrome bg-white/5'
                                            : 'border-white/5 bg-brushedAnthracite hover:border-white/20'
                                            }`}
                                    >
                                        <span className={`font-bold text-sm ${selections.timeline === timeline.id ? 'text-whiteChrome' : 'text-ashGrey'}`}>{timeline.label}</span>
                                        <div className={`w-4 h-4 rounded-full border ${selections.timeline === timeline.id ? 'border-whiteChrome flex items-center justify-center' : 'border-white/20'}`}>
                                            {selections.timeline === timeline.id && <div className="w-2 h-2 rounded-full bg-whiteChrome"></div>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Step 6: Project Insights */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-xl font-heading font-bold text-whiteChrome mb-6 flex items-center">
                                <span className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-xs mr-4 font-mono">06</span>
                                Project Insights
                            </h3>
                            <div className="w-full">
                                <textarea
                                    className="w-full bg-brushedAnthracite border border-white/5 p-6 text-whiteChrome focus:border-white/30 focus:outline-none transition-colors resize-y min-h-[160px] text-sm placeholder:text-white/20"
                                    placeholder="Tell us more about your vision, specifics of your business, or any key problems..."
                                    value={selections.insights}
                                    onChange={(e) => setSelections({ ...selections, insights: e.target.value })}
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Right Column - Sticky Estimate */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32">
                        {/* Estimate Card */}
                        <div className="bg-[#141414] border border-white/5 p-8 shadow-2xl">
                            <h4 className="text-[11px] tracking-[0.2em] uppercase font-bold text-whiteChrome mb-8">Estimated Investment</h4>

                            <div className="text-4xl lg:text-4xl font-heading font-bold text-whiteChrome mb-4 flex items-center flex-wrap">
                                {hasSelection && breakdown.minTotal > 0 ? (
                                    <>
                                        $<Counter value={breakdown.minTotal} />
                                        <span className="text-whiteChrome mx-2 text-3xl">-</span>
                                        $<Counter value={breakdown.maxTotal} />
                                    </>
                                ) : (
                                    <>
                                        $ - $999
                                    </>
                                )}
                            </div>
                            <p className="text-ashGrey text-[12px] mb-10 leading-relaxed border-b border-lightGrey/10 pb-10">
                                *This is a ballpark estimate. Final cost depends on full scope.
                            </p>

                            <div className="space-y-6 mb-10 text-[13px]">
                                <div className="flex justify-between items-start border-b border-lightGrey/10 pb-6">
                                    <span className="text-ashGrey">Base:</span>
                                    <span className="text-whiteChrome text-right">{hasSelection ? SERVICE_TYPES.find(s => s.id === selections.serviceType)?.label : 'Not selected'}</span>
                                </div>
                                <div className="flex justify-between items-start border-b border-lightGrey/10 pb-6">
                                    <span className="text-ashGrey">Scope:</span>
                                    <span className="text-whiteChrome text-right">{hasSelection && selections.requirement ? (getRequirementsForSelection().find(r => r.id === selections.requirement)?.label ?? 'Not selected') : 'Not selected'}</span>
                                </div>
                                <div className="flex flex-col border-b border-lightGrey/10 pb-6">
                                    <span className="text-ashGrey mb-4">Features:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {hasSelection && selections.features.length > 0 ? (
                                            selections.features.map(fId => {
                                                const feature = getFeaturesForSelection().find(f => f.id === fId);
                                                return feature ? (
                                                    <span key={feature.id} className="text-[9px] uppercase tracking-wider text-ashGrey border border-white/10 rounded px-2.5 py-1.5 bg-white/5 hover:bg-white/10 transition-colors">
                                                        {feature.label}
                                                    </span>
                                                ) : null;
                                            })
                                        ) : (
                                            <span className="text-whiteChrome text-right">None selected</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center border-b border-lightGrey/10 pb-6">
                                    <span className="text-ashGrey">Timeline:</span>
                                    <span className="text-whiteChrome text-right">{TIMELINES.find(t => t.id === selections.timeline)?.label}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-ashGrey">Rush Factor:</span>
                                    <span className="text-whiteChrome text-right">×{breakdown.multiplier}</span>
                                </div>
                            </div>

                            <button
                                disabled={!hasSelection}
                                onClick={() => {
                                    if (!hasSelection) return;
                                    toast({
                                        title: "Estimate saved",
                                        description: "Next step: share your details and we'll send a detailed proposal.",
                                    });
                                }}
                                className={`w-full py-5 mt-4 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center transition-all duration-300 ${hasSelection
                                    ? 'bg-white text-matteCarbon hover:bg-white/90 cursor-pointer'
                                    : 'bg-white text-matteCarbon opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                CONTINUE <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Inclusions and Philosophy Section - Below everything */}
            <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left: Our Pricing Philosophy */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-whiteChrome mb-8">OUR PRICING <span className="italic text-liquidSilver">PHILOSOPHY</span></h2>
                    <p className="text-ashGrey text-sm leading-relaxed mb-6">
                        We don&apos;t believe in one-size-fits-all pricing. Every project we take on is unique, requiring a custom approach to engineering and design. Our estimates reflect the depth of craftsmanship and the premium quality we deliver.
                    </p>
                    <p className="text-ashGrey text-sm leading-relaxed">
                        This range provided here helps you understand the investment required for your vision. Once we discuss the details, we&apos;ll provide a firm quote tailored to your exact needs.
                    </p>
                </div>

                {/* Right: What's included in every estimate */}
                <div className="bg-[#141414] border border-white/5 p-8 shadow-2xl">
                    <h5 className="text-whiteChrome font-bold text-lg mb-6">What&apos;s included in every estimate?</h5>
                    <ul className="space-y-4">
                        <li className="flex text-ashGrey text-sm items-center">
                            <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                            Dedicated Project Manager
                        </li>
                        <li className="flex text-ashGrey text-sm items-center">
                            <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                            Weekly Progress Syncs
                        </li>
                        <li className="flex text-ashGrey text-sm items-center">
                            <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                            Rigorous Quality Assurance
                        </li>
                        <li className="flex text-ashGrey text-sm items-center">
                            <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                            Responsive Design (Mobile/Desktop)
                        </li>
                        <li className="flex text-ashGrey text-sm items-center">
                            <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                            Performance Optimization
                        </li>
                        <li className="flex text-ashGrey text-sm items-center">
                            <Check size={16} className="mr-4 text-whiteChrome shrink-0" />
                            30 Days Post-Launch Support
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
