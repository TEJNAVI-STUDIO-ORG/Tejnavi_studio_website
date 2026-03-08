"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";

const SOCIAL_LINKS = [
    {
        name: "Instagram",
        handle: "@tejnavi.studio",
        href: "https://instagram.com/tejnavi.studio",
        icon: Instagram,
        hoverBg: "group-hover:bg-[#E1306C]/10 group-hover:shadow-[0_0_30px_rgba(225,48,108,0.15)]",
        borderColor: "border-white/5 group-hover:border-[#E1306C]/40",
    },
    {
        name: "LinkedIn",
        handle: "Tejnavi Studio",
        href: "https://linkedin.com/company/tejnavi-studio",
        icon: Linkedin,
        hoverBg: "group-hover:bg-[#0077b5]/10 group-hover:shadow-[0_0_30px_rgba(0,119,181,0.15)]",
        borderColor: "border-white/5 group-hover:border-[#0077b5]/40",
    },
    {
        name: "Twitter / X",
        handle: "@tejnavi",
        href: "https://twitter.com/tejnavi",
        icon: ({ size, className }: { size?: number; className?: string }) => (
            <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        hoverBg: "group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
        borderColor: "border-white/5 group-hover:border-white/20",
    },
    {
        name: "WhatsApp",
        handle: "+91 8459632402",
        href: "https://wa.me/918459632402",
        icon: MessageCircle,
        hoverBg: "group-hover:bg-[#25D366]/10 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.15)]",
        borderColor: "border-white/5 group-hover:border-[#25D366]/40",
    },
    {
        name: "Email",
        handle: "adityavispute29@gmail.com",
        href: "mailto:adityavispute29@gmail.com",
        icon: Mail,
        hoverBg: "group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
        borderColor: "border-white/5 group-hover:border-white/20",
    },
];

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        service: "web",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="bg-matteCarbon min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-whiteChrome mb-6 leading-tight">
                        LET&apos;S START <br /> <span className="text-liquidSilver italic">TALKING.</span>
                    </h1>
                    <p className="text-xl text-ashGrey font-light max-w-md">
                        Have a project in mind? We&apos;d love to hear about it. Drop us a message and we&apos;ll get back to you within 24 hours.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: contact info + social widgets */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                        {/* Email + Office */}
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <Mail className="text-liquidSilver mr-6 mt-1 flex-shrink-0" size={22} />
                                <div>
                                    <h4 className="text-xs tracking-widest uppercase font-bold text-whiteChrome mb-2">Email</h4>
                                    <a href="mailto:tejnavi.studio@gmail.com" className="text-ashGrey hover:text-whiteChrome transition-colors text-base">
                                        tejnavi.studio@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="text-liquidSilver mr-6 mt-1 flex-shrink-0" size={22} />
                                <div>
                                    <h4 className="text-xs tracking-widest uppercase font-bold text-whiteChrome mb-2">Office</h4>
                                    <p className="text-ashGrey text-base">Maharashtra, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Widget Grid */}
                        <div>
                            <h3 className="text-xs tracking-[0.2em] uppercase font-bold text-whiteChrome mb-6">Find Us On</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {SOCIAL_LINKS.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-3 p-4 rounded-xl border bg-brushedAnthracite bg-gradient-to-br from-transparent to-transparent ${link.hoverBg} ${link.borderColor} transition-all duration-300 group`}
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                                                <Icon size={18} className="text-whiteChrome" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-bold text-whiteChrome font-heading truncate">{link.name}</div>
                                                <div className="text-xs text-ashGrey truncate">{link.handle}</div>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <form
                            className="bg-brushedAnthracite p-8 md:p-12 border border-white/5 space-y-8"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!form.email || !form.message) {
                                    setError("Please provide at least your email and a short message.");
                                    return;
                                }
                                setStatus("submitting");
                                setError(null);
                                fetch("/api/contact", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(form),
                                })
                                    .then(async (res) => {
                                        if (!res.ok) throw new Error((await res.json())?.message || "Failed to send");
                                        setStatus("success");
                                        setForm({ name: "", email: "", service: "web", message: "" });
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                        setStatus("error");
                                        setError("Something went wrong while sending your message. Please try again.");
                                    });
                            }}
                        >
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors placeholder:text-white/20"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors placeholder:text-white/20"
                                    placeholder="john@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-liquidSilver mb-3">What are you looking for?</label>
                                <select
                                    className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-whiteChrome focus:ring-0 focus:border-whiteChrome transition-colors appearance-none"
                                    aria-label="What are you looking for?"
                                    value={form.service}
                                    onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                                >
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
                                    value={form.message}
                                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full bg-whiteChrome text-matteCarbon py-5 font-bold uppercase tracking-widest text-sm hover:bg-mercuryGlow disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group"
                            >
                                {status === "submitting" ? "Sending..." : "Send Message"}
                                <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </button>
                            {status === "success" && (
                                <p className="text-xs text-emerald-400 tracking-widest uppercase">
                                    Message sent. We&apos;ll get back to you soon.
                                </p>
                            )}
                            {error && (
                                <p className="text-xs text-red-400 tracking-widest uppercase">{error}</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
