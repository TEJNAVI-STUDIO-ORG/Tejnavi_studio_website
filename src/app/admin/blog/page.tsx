"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImageUrl?: string;
    category?: string;
    tags?: string[];
    readTimeMinutes?: number;
    metaTitle?: string;
    metaDescription?: string;
    isPublished: boolean;
    publishedAt?: string;
    createdAt: string;
}

const EMPTY_POST = {
    title: "", slug: "", excerpt: "", content: "", coverImageUrl: "", category: "",
    tags: [] as string[], readTimeMinutes: 5, metaTitle: "", metaDescription: "", isPublished: false,
};

export default function AdminBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<BlogPost | null>(null);
    const [form, setForm] = useState(EMPTY_POST);
    const [tagsInput, setTagsInput] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => { fetchPosts(); }, []);

    async function fetchPosts() {
        const res = await fetch("/api/admin/blog");
        if (res.ok) setPosts(await res.json());
        setLoading(false);
    }

    function openCreate() {
        setEditing(null);
        setForm(EMPTY_POST);
        setTagsInput("");
        setImageFile(null);
        setShowForm(true);
    }

    function openEdit(post: BlogPost) {
        setEditing(post);
        setForm({ ...EMPTY_POST, ...post });
        setTagsInput((post.tags || []).join(", "));
        setImageFile(null);
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        let coverImageUrl = form.coverImageUrl;
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("folder", "tejnavi-studio/blog");
            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
            if (uploadRes.ok) {
                const data = await uploadRes.json();
                coverImageUrl = data.url;
            }
        }

        const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
        const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const payload = { ...form, coverImageUrl, tags, slug };

        if (editing) {
            await fetch(`/api/admin/blog/${editing.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch("/api/admin/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        setSubmitting(false);
        setShowForm(false);
        fetchPosts();
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this blog post?")) return;
        await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
        fetchPosts();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-whiteChrome">Blog</h1>
                    <p className="text-ashGrey text-sm mt-1">Manage your insights & articles</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-whiteChrome text-matteCarbon px-5 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all">
                    <Plus size={16} /> New Post
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="bg-brushedAnthracite border border-white/10 w-full max-w-3xl flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] shadow-2xl relative">

                        <div className="p-6 sm:p-8 border-b border-white/10 shrink-0 bg-white/[0.02]">
                            <h2 className="text-xl font-heading font-bold text-whiteChrome">
                                {editing ? "Edit Post" : "New Blog Post"}
                            </h2>
                        </div>

                        <div className="p-6 sm:p-8 overflow-y-auto flex-1 overscroll-contain custom-scrollbar">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Title</label>
                                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="e.g. Modern Web Architecture" />
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Category</label>
                                        <input value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="e.g. Engineering" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Tags (comma-separated)</label>
                                        <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="nextjs, react, seo" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Excerpt</label>
                                    <textarea value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors resize-y" placeholder="Brief summary of the article..." />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Content (Markdown)</label>
                                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} required className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm font-mono focus:outline-none focus:border-white/40 transition-colors resize-y min-h-[200px]" placeholder="# Start writing here..." />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Cover Image</label>
                                    <div className="w-full bg-matteCarbon border border-dashed border-white/20 text-whiteChrome px-4 py-6 text-sm text-center hover:border-white/40 transition-colors relative">
                                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <span className="text-ashGrey pointer-events-none">{imageFile ? imageFile.name : form.coverImageUrl ? "Replace current image..." : "Click or drag image here..."}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Meta Title (SEO)</label>
                                        <input value={form.metaTitle || ""} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Read Time (min)</label>
                                        <input type="number" value={form.readTimeMinutes || 5} onChange={(e) => setForm({ ...form, readTimeMinutes: parseInt(e.target.value) || 5 })} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1.5 focus-within:text-whiteChrome transition-colors">Meta Description (SEO)</label>
                                    <textarea value={form.metaDescription || ""} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={2} className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors resize-y" />
                                </div>
                                <div className="p-4 border border-white/5 bg-matteCarbon/50 mt-2">
                                    <label className="flex items-center gap-3 text-sm text-whiteChrome cursor-pointer group">
                                        <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 accent-whiteChrome cursor-pointer" />
                                        <span className="group-hover:text-liquidSilver transition-colors">Publish immediately</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 border-t border-white/10 shrink-0 flex gap-4 bg-white/[0.02] justify-end">
                            <button type="button" onClick={() => setShowForm(false)} className="border border-transparent text-ashGrey px-6 py-2.5 text-xs uppercase tracking-widest hover:text-whiteChrome transition-colors">
                                Cancel
                            </button>
                            <button type="submit" disabled={submitting} className="bg-whiteChrome text-matteCarbon px-8 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all disabled:opacity-50 min-w-[120px]">
                                {submitting ? "Saving..." : editing ? "Update" : "Publish"}
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-ashGrey text-center py-20">Loading...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 bg-brushedAnthracite border border-white/5">
                    <p className="text-ashGrey mb-4">No blog posts yet</p>
                    <button onClick={openCreate} className="text-sm text-whiteChrome underline">Write your first post</button>
                </div>
            ) : (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-brushedAnthracite border border-white/5 p-5 flex items-center justify-between hover:border-white/10 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-whiteChrome font-medium">{post.title}</h3>
                                    <span className={`text-xs px-2 py-0.5 ${post.isPublished ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                                        {post.isPublished ? "Published" : "Draft"}
                                    </span>
                                </div>
                                <p className="text-ashGrey text-sm mt-1">
                                    {post.category && <span className="mr-3">{post.category}</span>}
                                    {post.readTimeMinutes} min read
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(post)} className="p-2 text-ashGrey hover:text-whiteChrome transition-colors"><Pencil size={16} /></button>
                                <button onClick={() => handleDelete(post.id)} className="p-2 text-ashGrey hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
