"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";

interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    tech: string;
    subtitle?: string;
    description?: string;
    imageUrl: string;
    thumbnailUrl?: string;
    year: string;
    caseStudyUrl?: string;
    repoUrl?: string;
    liveUrl?: string;
    isFeatured: boolean;
    sortOrder: number;
    isPublished: boolean;
}

const EMPTY_PROJECT = {
    title: "", slug: "", category: "", tech: "", subtitle: "", description: "",
    imageUrl: "", thumbnailUrl: "", year: new Date().getFullYear().toString(),
    caseStudyUrl: "", repoUrl: "", liveUrl: "", isFeatured: false, sortOrder: 0, isPublished: true,
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);
    const [form, setForm] = useState(EMPTY_PROJECT);
    const [submitting, setSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => { fetchProjects(); }, []);

    async function fetchProjects() {
        const res = await fetch("/api/admin/projects");
        if (res.ok) setProjects(await res.json());
        setLoading(false);
    }

    function openCreate() {
        setEditing(null);
        setForm(EMPTY_PROJECT);
        setImageFile(null);
        setShowForm(true);
    }

    function openEdit(project: Project) {
        setEditing(project);
        setForm({ ...EMPTY_PROJECT, ...project });
        setImageFile(null);
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        let imageUrl = form.imageUrl;

        // Upload image if new file selected
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("folder", "tejnavi-studio/projects");
            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
            if (uploadRes.ok) {
                const uploadData = await uploadRes.json();
                imageUrl = uploadData.url;
            }
        }

        const payload = { ...form, imageUrl, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") };

        if (editing) {
            await fetch(`/api/admin/projects/${editing.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch("/api/admin/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        setSubmitting(false);
        setShowForm(false);
        fetchProjects();
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this project?")) return;
        await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
        fetchProjects();
    }

    async function togglePublish(project: Project) {
        await fetch(`/api/admin/projects/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isPublished: !project.isPublished }),
        });
        fetchProjects();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-whiteChrome">Projects</h1>
                    <p className="text-ashGrey text-sm mt-1">Manage your portfolio</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-whiteChrome text-matteCarbon px-5 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all">
                    <Plus size={16} /> Add Project
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
                    <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
                        <form onSubmit={handleSubmit} className="bg-brushedAnthracite border border-white/10 w-full max-w-2xl shadow-2xl relative my-8">

                            <div className="p-6 sm:p-8 border-b border-white/10 bg-white/[0.02]">
                                <h2 className="text-xl font-heading font-bold text-whiteChrome">
                                    {editing ? "Edit Project" : "Add Project"}
                                </h2>
                            </div>

                            <div className="p-6 sm:p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Title</label>
                                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="e.g. E-Commerce Redesign" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Category</label>
                                        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="e.g. UI/UX Design" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Tech Stack</label>
                                        <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} required className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="e.g. Next.js, Framer Motion" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Year</label>
                                        <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="2026" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Sort Order</label>
                                        <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Image</label>
                                        <div className="w-full bg-matteCarbon border border-dashed border-white/20 text-whiteChrome px-4 py-6 text-sm text-center hover:border-white/40 transition-colors relative">
                                            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            <span className="text-ashGrey pointer-events-none">{imageFile ? imageFile.name : form.imageUrl ? "Replace current image..." : "Click or drag image here..."}</span>
                                        </div>
                                        {form.imageUrl && !imageFile && (
                                            <p className="text-xs text-ashGrey mt-2 truncate flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-liquidSilver inline-block"></span> Current image active</p>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Description</label>
                                        <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors resize-y min-h-[100px]" placeholder="Detailed description of the project..." />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Live URL</label>
                                        <input value={form.liveUrl || ""} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="https://..." />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Repo URL</label>
                                        <input value={form.repoUrl || ""} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="https://github.com/..." />
                                    </div>
                                    <div className="col-span-2 flex flex-wrap gap-8 mt-2 p-4 border border-white/5 bg-matteCarbon/50">
                                        <label className="flex items-center gap-3 text-sm text-whiteChrome cursor-pointer group">
                                            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 accent-whiteChrome cursor-pointer" />
                                            <span className="group-hover:text-liquidSilver transition-colors">Featured Project</span>
                                        </label>
                                        <label className="flex items-center gap-3 text-sm text-whiteChrome cursor-pointer group">
                                            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 accent-whiteChrome cursor-pointer" />
                                            <span className="group-hover:text-liquidSilver transition-colors">Published (Visible)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 border-t border-white/10 flex gap-4 bg-white/[0.02] justify-end">
                                <button type="button" onClick={() => setShowForm(false)} className="border border-transparent text-ashGrey px-6 py-2.5 text-xs uppercase tracking-widest hover:text-whiteChrome transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting} className="bg-whiteChrome text-matteCarbon px-8 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all disabled:opacity-50 min-w-[120px]">
                                    {submitting ? "Saving..." : editing ? "Update" : "Create"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* Projects Table */}
            {loading ? (
                <div className="text-ashGrey text-center py-20">Loading...</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-brushedAnthracite border border-white/5">
                    <p className="text-ashGrey mb-4">No projects yet</p>
                    <button onClick={openCreate} className="text-sm text-whiteChrome underline">Add your first project</button>
                </div>
            ) : (
                <div className="bg-brushedAnthracite border border-white/5 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-ashGrey">
                                <th className="text-left p-4">Project</th>
                                <th className="text-left p-4">Category</th>
                                <th className="text-left p-4">Year</th>
                                <th className="text-center p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {project.imageUrl && (
                                                <img src={project.imageUrl} alt="" className="w-10 h-10 object-cover rounded" />
                                            )}
                                            <div>
                                                <div className="text-whiteChrome font-medium text-sm">{project.title}</div>
                                                <div className="text-ashGrey text-xs">{project.tech}</div>
                                            </div>
                                            {project.isFeatured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                                        </div>
                                    </td>
                                    <td className="p-4 text-ashGrey text-sm">{project.category}</td>
                                    <td className="p-4 text-ashGrey text-sm">{project.year}</td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => togglePublish(project)} className={`text-xs px-3 py-1 ${project.isPublished ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                            {project.isPublished ? "Published" : "Draft"}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openEdit(project)} className="p-2 text-ashGrey hover:text-whiteChrome transition-colors">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)} className="p-2 text-ashGrey hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
