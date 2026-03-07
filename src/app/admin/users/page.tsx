"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, Shield, ShieldCheck, Pencil } from "lucide-react";

interface Admin {
    id: number; name: string; email: string; role: string;
    avatarUrl?: string; isActive: boolean; createdAt: string;
}

export default function AdminUsers() {
    const { data: session } = useSession();
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const isSuperAdmin = (session?.user as { role?: string })?.role === "superadmin";

    useEffect(() => { fetchAdmins(); }, []);

    async function fetchAdmins() {
        const res = await fetch("/api/admin/users");
        if (res.ok) setAdmins(await res.json());
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        const res = await fetch("/api/admin/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Failed to create admin");
        } else {
            setShowForm(false);
            setForm({ name: "", email: "", password: "", role: "admin" });
            fetchAdmins();
        }
        setSubmitting(false);
    }

    const roleIcons: Record<string, typeof Shield> = { superadmin: ShieldCheck, admin: Shield, editor: Pencil };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-whiteChrome">Team</h1>
                    <p className="text-ashGrey text-sm mt-1">Manage admin users</p>
                </div>
                {isSuperAdmin && (
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-whiteChrome text-matteCarbon px-5 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all">
                        <Plus size={16} /> Add Admin
                    </button>
                )}
            </div>

            {!isSuperAdmin && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-4 text-sm mb-6">
                    Only superadmins can manage team members.
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
                    <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
                        <form onSubmit={handleSubmit} className="bg-brushedAnthracite border border-white/10 w-full max-w-md shadow-2xl relative my-8">

                            <div className="p-6 sm:p-8 border-b border-white/10 bg-white/[0.02]">
                                <h2 className="text-xl font-heading font-bold text-whiteChrome">Add Admin</h2>
                            </div>

                            <div className="p-6 sm:p-8 space-y-5">
                                {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 mb-2">{error}</div>}

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Full Name</label>
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Jane Doe" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Email Address</label>
                                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="jane@tejnavistudio.com" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Password</label>
                                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Minimum 8 characters" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">System Role</label>
                                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors appearance-none">
                                        <option value="editor">Editor (Content Only)</option>
                                        <option value="admin">Admin (Standard)</option>
                                        <option value="superadmin">Super Admin (Full Access)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 border-t border-white/10 flex gap-4 bg-white/[0.02] justify-end">
                                <button type="button" onClick={() => setShowForm(false)} className="border border-transparent text-ashGrey px-6 py-2.5 text-xs uppercase tracking-widest hover:text-whiteChrome transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="bg-whiteChrome text-matteCarbon px-8 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all disabled:opacity-50 min-w-[120px]">{submitting ? "Creating..." : "Create"}</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-ashGrey text-center py-20">Loading...</div>
            ) : (
                <div className="space-y-3">
                    {admins.map((admin) => {
                        const RoleIcon = roleIcons[admin.role] || Shield;
                        return (
                            <div key={admin.id} className="bg-brushedAnthracite border border-white/5 p-5 flex items-center justify-between hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gunmetal flex items-center justify-center text-whiteChrome font-bold text-sm rounded-full">
                                        {admin.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-whiteChrome font-medium">{admin.name}</div>
                                        <div className="text-ashGrey text-xs">{admin.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`flex items-center gap-1.5 text-xs px-3 py-1 uppercase tracking-widest ${admin.role === "superadmin" ? "bg-purple-500/10 text-purple-400" :
                                        admin.role === "admin" ? "bg-blue-500/10 text-blue-400" :
                                            "bg-green-500/10 text-green-400"
                                        }`}>
                                        <RoleIcon size={12} /> {admin.role}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
