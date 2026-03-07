"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Mail, Clock } from "lucide-react";

interface Contact {
    id: number;
    name?: string;
    email: string;
    service?: string;
    message: string;
    status: string;
    notes?: string;
    createdAt: string;
}

export default function AdminContacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Contact | null>(null);

    useEffect(() => { fetchContacts(); }, []);

    async function fetchContacts() {
        const res = await fetch("/api/admin/contacts");
        if (res.ok) setContacts(await res.json());
        setLoading(false);
    }

    async function updateStatus(id: number, status: string) {
        await fetch(`/api/admin/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchContacts();
    }

    const statusColors: Record<string, string> = {
        new: "bg-blue-500/10 text-blue-400",
        read: "bg-yellow-500/10 text-yellow-400",
        replied: "bg-green-500/10 text-green-400",
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-whiteChrome">Contacts</h1>
                <p className="text-ashGrey text-sm mt-1">View and manage contact form submissions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact List */}
                <div className="lg:col-span-2 space-y-3">
                    {loading ? (
                        <div className="text-ashGrey text-center py-20">Loading...</div>
                    ) : contacts.length === 0 ? (
                        <div className="text-center py-20 bg-brushedAnthracite border border-white/5">
                            <MessageSquare className="mx-auto text-ashGrey mb-3" size={32} />
                            <p className="text-ashGrey">No contact submissions yet</p>
                        </div>
                    ) : (
                        contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelected(contact)}
                                className={`bg-brushedAnthracite border p-5 cursor-pointer transition-all ${selected?.id === contact.id ? "border-liquidSilver" : "border-white/5 hover:border-white/10"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-whiteChrome font-medium text-sm">{contact.name || "Anonymous"}</span>
                                        <span className={`text-xs px-2 py-0.5 ${statusColors[contact.status] || statusColors.new}`}>
                                            {contact.status}
                                        </span>
                                    </div>
                                    <span className="text-ashGrey text-xs flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-ashGrey text-sm truncate">{contact.message}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Contact Detail */}
                {selected && (
                    <div className="bg-brushedAnthracite border border-white/5 p-6 h-fit sticky top-8">
                        <h3 className="text-lg font-heading font-bold text-whiteChrome mb-4">Details</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-ashGrey text-xs uppercase tracking-widest">Name</span>
                                <p className="text-whiteChrome">{selected.name || "N/A"}</p>
                            </div>
                            <div>
                                <span className="text-ashGrey text-xs uppercase tracking-widest">Email</span>
                                <a href={`mailto:${selected.email}`} className="block text-blue-400 hover:underline">{selected.email}</a>
                            </div>
                            <div>
                                <span className="text-ashGrey text-xs uppercase tracking-widest">Service</span>
                                <p className="text-whiteChrome">{selected.service || "N/A"}</p>
                            </div>
                            <div>
                                <span className="text-ashGrey text-xs uppercase tracking-widest">Message</span>
                                <p className="text-whiteChrome whitespace-pre-wrap">{selected.message}</p>
                            </div>
                            <div className="pt-4 flex gap-2">
                                {["new", "read", "replied"].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => updateStatus(selected.id, s)}
                                        className={`text-xs px-3 py-1.5 uppercase tracking-widest transition-colors ${selected.status === s ? "bg-whiteChrome text-matteCarbon" : "border border-white/10 text-ashGrey hover:text-whiteChrome"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
