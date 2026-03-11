"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface Subscriber { id: number; email: string; isActive: boolean; subscribedAt: string; }

export default function AdminNewsletter() {
    const [subs, setSubs] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/newsletter").then((r) => r.json()).then(setSubs).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-whiteChrome">Newsletter</h1>
                <p className="text-ashGrey text-sm mt-1">{subs.filter((s) => s.isActive).length} active subscribers</p>
            </div>

            {loading ? (
                <div className="text-ashGrey text-center py-20">Loading...</div>
            ) : subs.length === 0 ? (
                <div className="text-center py-20 bg-brushedAnthracite border border-white/5">
                    <Mail className="mx-auto text-ashGrey mb-3" size={32} />
                    <p className="text-ashGrey">No subscribers yet</p>
                </div>
            ) : (
                <div className="bg-brushedAnthracite border border-white/5 overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-ashGrey">
                                <th className="text-left p-4">Email</th>
                                <th className="text-center p-4">Status</th>
                                <th className="text-right p-4">Subscribed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subs.map((sub) => (
                                <tr key={sub.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                    <td className="p-4 text-whiteChrome text-sm">{sub.email}</td>
                                    <td className="p-4 text-center">
                                        <span className={`text-xs px-2 py-0.5 ${sub.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                            {sub.isActive ? "Active" : "Unsubscribed"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right text-ashGrey text-sm">
                                        {new Date(sub.subscribedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
