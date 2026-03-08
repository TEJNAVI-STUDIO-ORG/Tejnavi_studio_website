"use client";

import { useEffect, useState } from "react";
import { FolderKanban, FileText, MessageSquare, Quote, Mail, Star } from "lucide-react";

interface DashboardStats {
    projects: number;
    blogPosts: number;
    contacts: number;
    quotes: number;
    newsletter: number;
    testimonials: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        projects: 0,
        blogPosts: 0,
        contacts: 0,
        quotes: 0,
        newsletter: 0,
        testimonials: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/admin/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch {
                // Stats will remain at 0 if API fails
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const cards = [
        { label: "Projects", value: stats.projects, icon: FolderKanban, color: "text-blue-400" },
        { label: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-green-400" },
        { label: "Contacts", value: stats.contacts, icon: MessageSquare, color: "text-yellow-400" },
        { label: "Quotes", value: stats.quotes, icon: Quote, color: "text-purple-400" },
        { label: "Newsletter", value: stats.newsletter, icon: Mail, color: "text-pink-400" },
        { label: "Testimonials", value: stats.testimonials, icon: Star, color: "text-orange-400" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-whiteChrome">Dashboard</h1>
                <p className="text-ashGrey text-sm mt-1">Overview of your Tejnavi Studio CMS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-brushedAnthracite border border-white/5 p-6 hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Icon size={24} className={card.color} />
                                <span className="text-3xl font-heading font-bold text-whiteChrome">
                                    {loading ? "—" : card.value}
                                </span>
                            </div>
                            <p className="text-sm text-ashGrey uppercase tracking-widest font-medium">
                                {card.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 bg-brushedAnthracite border border-white/5 p-8">
                <h2 className="text-xl font-heading font-bold text-whiteChrome mb-4">Quick Start</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-ashGrey">
                    <div className="space-y-2">
                        <p>✦ <strong className="text-whiteChrome">Add a project</strong> — Showcase your latest work</p>
                        <p>✦ <strong className="text-whiteChrome">Write a blog post</strong> — Boost SEO with fresh content</p>
                        <p>✦ <strong className="text-whiteChrome">Add testimonials</strong> — Build trust with client reviews</p>
                    </div>
                    <div className="space-y-2">
                        <p>✦ <strong className="text-whiteChrome">Check contacts</strong> — Respond to inquiries quickly</p>
                        <p>✦ <strong className="text-whiteChrome">Manage quotes</strong> — Track your pipeline</p>
                        <p>✦ <strong className="text-whiteChrome">Invite team</strong> — Add more admins to help manage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
