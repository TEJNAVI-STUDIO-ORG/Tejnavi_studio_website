"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface QuoteReq {
    id: number;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    description: string;
    status: string;
    notes?: string;
    createdAt: string;
}

const STATUSES = ["new", "contacted", "in_progress", "quoted", "won", "lost"];
const statusColors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-400",
    contacted: "bg-yellow-500/10 text-yellow-400",
    in_progress: "bg-purple-500/10 text-purple-400",
    quoted: "bg-orange-500/10 text-orange-400",
    won: "bg-green-500/10 text-green-400",
    lost: "bg-red-500/10 text-red-400",
};

export default function AdminQuotes() {
    const [quotes, setQuotes] = useState<QuoteReq[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<QuoteReq | null>(null);

    useEffect(() => { fetchQuotes(); }, []);

    async function fetchQuotes() {
        const res = await fetch("/api/admin/quotes");
        if (res.ok) setQuotes(await res.json());
        setLoading(false);
    }

    async function updateStatus(id: number, status: string) {
        await fetch(`/api/admin/quotes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchQuotes();
        if (selected?.id === id) setSelected({ ...selected!, status });
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-whiteChrome">Quote Requests</h1>
                <p className="text-ashGrey text-sm mt-1">Track your sales pipeline</p>
            </div>

            {/* Pipeline view */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {STATUSES.map((status) => {
                    const c = quotes.filter((q) => q.status === status).length;
                    return (
                        <div key={status} className={`text-xs px-3 py-1.5 uppercase tracking-widest whitespace-nowrap ${statusColors[status]}`}>
                            {status.replace("_", " ")} ({c})
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                    {loading ? (
                        <div className="text-ashGrey text-center py-20">Loading...</div>
                    ) : quotes.length === 0 ? (
                        <div className="text-center py-20 bg-brushedAnthracite border border-white/5">
                            <p className="text-ashGrey">No quote requests yet</p>
                        </div>
                    ) : (
                        quotes.map((q) => (
                            <div
                                key={q.id}
                                onClick={() => setSelected(q)}
                                className={`bg-brushedAnthracite border p-5 cursor-pointer transition-all ${selected?.id === q.id ? "border-liquidSilver" : "border-white/5 hover:border-white/10"
                                    }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-whiteChrome font-medium text-sm">{q.name}</span>
                                        {q.company && <span className="text-ashGrey text-xs">@ {q.company}</span>}
                                        <span className={`text-xs px-2 py-0.5 ${statusColors[q.status]}`}>
                                            {q.status.replace("_", " ")}
                                        </span>
                                    </div>
                                    <span className="text-ashGrey text-xs flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(q.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-ashGrey text-sm truncate">{q.description}</p>
                            </div>
                        ))
                    )}
                </div>

                {selected && (
                    <div className="bg-brushedAnthracite border border-white/5 p-6 h-fit sticky top-8">
                        <h3 className="text-lg font-heading font-bold text-whiteChrome mb-4">Quote Details</h3>
                        <div className="space-y-3 text-sm">
                            {[
                                ["Name", selected.name],
                                ["Email", selected.email],
                                ["Company", selected.company],
                                ["Phone", selected.phone],
                                ["Project Type", selected.projectType],
                                ["Budget", selected.budget],
                                ["Timeline", selected.timeline],
                            ].map(([label, value]) => value && (
                                <div key={label}>
                                    <span className="text-ashGrey text-xs uppercase tracking-widest">{label}</span>
                                    <p className="text-whiteChrome">{value}</p>
                                </div>
                            ))}
                            <div>
                                <span className="text-ashGrey text-xs uppercase tracking-widest">Description</span>
                                <p className="text-whiteChrome whitespace-pre-wrap">{selected.description}</p>
                            </div>
                            <div className="pt-4">
                                <span className="text-ashGrey text-xs uppercase tracking-widest block mb-2">Update Status</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {STATUSES.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(selected.id, s)}
                                            className={`text-xs px-2.5 py-1 uppercase tracking-widest transition-colors ${selected.status === s ? "bg-whiteChrome text-matteCarbon" : "border border-white/10 text-ashGrey hover:text-whiteChrome"
                                                }`}
                                        >
                                            {s.replace("_", " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
