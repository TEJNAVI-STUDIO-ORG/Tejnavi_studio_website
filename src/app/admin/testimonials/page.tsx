"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Testimonial {
    id: number; clientName: string; clientRole?: string; company?: string;
    companyLogoUrl?: string; avatarUrl?: string; content: string; rating: number;
    isPublished: boolean; sortOrder: number;
}

const EMPTY = { clientName: "", clientRole: "", company: "", content: "", rating: 5, isPublished: true, sortOrder: 0 };

export default function AdminTestimonials() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { fetchItems(); }, []);

    async function fetchItems() {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) setItems(await res.json());
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        const url = editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials";
        await fetch(url, {
            method: editing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setSubmitting(false);
        setShowForm(false);
        fetchItems();
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this testimonial?")) return;
        await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
        fetchItems();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-whiteChrome">Testimonials</h1>
                    <p className="text-ashGrey text-sm mt-1">Manage client reviews</p>
                </div>
                <button onClick={() => { setEditing(null); setForm(EMPTY); setShowForm(true); }} className="flex items-center gap-2 bg-whiteChrome text-matteCarbon px-5 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all">
                    <Plus size={16} /> Add Review
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
                    <div className="min-h-full flex items-start justify-center p-4 sm:p-8 pt-12 pb-12">
                        <form onSubmit={handleSubmit} className="bg-brushedAnthracite border border-white/10 w-full max-w-lg shadow-2xl relative my-8">

                            <div className="p-6 sm:p-8 border-b border-white/10 bg-white/[0.02]">
                                <h2 className="text-xl font-heading font-bold text-whiteChrome">{editing ? "Edit" : "Add"} Testimonial</h2>
                            </div>

                            <div className="p-6 sm:p-8 space-y-5">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Client Name</label>
                                    <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required placeholder="e.g. John Doe" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Client Role</label>
                                        <input value={form.clientRole || ""} onChange={(e) => setForm({ ...form, clientRole: e.target.value })} placeholder="e.g. CEO" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Company</label>
                                        <input value={form.company || ""} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Acme Corp" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Review Content</label>
                                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={5} placeholder="Their testimonial..." className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors resize-y min-h-[120px]" />
                                </div>
                                <div className="flex items-center gap-6 p-4 border border-white/5 bg-matteCarbon/50 mt-2">
                                    <label className="text-xs text-whiteChrome uppercase tracking-widest font-bold">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })} className={`text-2xl hover:scale-110 transition-transform ${star <= form.rating ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "text-white/10"}`}>★</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 border-t border-white/10 flex gap-4 bg-white/[0.02] justify-end">
                                <button type="button" onClick={() => setShowForm(false)} className="border border-transparent text-ashGrey px-6 py-2.5 text-xs uppercase tracking-widest hover:text-whiteChrome transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="bg-whiteChrome text-matteCarbon px-8 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all disabled:opacity-50 min-w-[120px]">{submitting ? "Saving..." : "Save"}</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-ashGrey text-center py-20">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 bg-brushedAnthracite border border-white/5"><p className="text-ashGrey">No testimonials yet</p></div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="bg-brushedAnthracite border border-white/5 p-5 flex justify-between items-start hover:border-white/10 transition-colors">
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-whiteChrome font-medium">{item.clientName}</span>
                                    {item.company && <span className="text-ashGrey text-xs">@ {item.company}</span>}
                                    <span className="text-yellow-400 text-sm">{"★".repeat(item.rating)}</span>
                                </div>
                                <p className="text-ashGrey text-sm">{item.content}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button onClick={() => { setEditing(item); setForm({ ...EMPTY, ...item }); setShowForm(true); }} className="p-2 text-ashGrey hover:text-whiteChrome"><Pencil size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-ashGrey hover:text-red-400"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
