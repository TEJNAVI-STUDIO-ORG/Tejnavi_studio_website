"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR crash — MDEditor is browser-only
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  category: "",
  tags: [] as string[],
  readTimeMinutes: 5,
  metaTitle: "",
  metaDescription: "",
  isPublished: false,
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
    const slug =
      form.slug ||
      form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
    <div className="p-6 md:p-10 text-whiteChrome">

      {/* Page Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-whiteChrome">Blog</h1>
          <p className="text-ashGrey text-sm mt-1">Manage your insights and articles</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-whiteChrome text-matteCarbon px-5 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all"
        >
          <Plus size={14} />
          New Post
        </button>
      </div>

      {/* ============================================================
          BLOG POST FORM — with MDEditor for the Content field
          ============================================================ */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-matteCarbon border border-white/10 p-6 md:p-8 mb-10 space-y-6"
        >
          <h2 className="text-lg font-semibold text-whiteChrome">
            {editing ? "Edit Post" : "New Blog Post"}
          </h2>

          {/* Row 1 — Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-ashGrey">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
                placeholder="e.g. Modern Web Architecture"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-ashGrey">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
                placeholder="e.g. Design & Development"
              />
            </div>
          </div>

          {/* Row 2 — Tags + Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-ashGrey">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
                placeholder="nextjs, react, seo"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-ashGrey">
                Read Time (min)
              </label>
              <input
                type="number"
                value={form.readTimeMinutes}
                onChange={(e) =>
                  setForm({ ...form, readTimeMinutes: parseInt(e.target.value) || 5 })
                }
                className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest text-ashGrey">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors resize-y"
              placeholder="Brief summary shown on the blog listing page..."
            />
          </div>

          {/* ============================================================
              CONTENT — MDEditor with live preview
              Toolbar: Bold, Italic, Heading, Table, Link, Image, List, Code...
              Toggle between Edit / Split / Preview using the toolbar icons.
              ============================================================ */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest text-ashGrey">
              Content (Markdown)
            </label>
            <p className="text-ashGrey/50 text-xs">
              Use the toolbar above the editor — Bold, Italic, # Headings, Table, Link, Image, Code.
              Click the split-screen icon to see a live preview on the right.
            </p>

            {/* data-color-mode="dark" forces the dark theme */}
            <div data-color-mode="dark">
              <MDEditor
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val || "" })}
                height={420}
                preview="edit"
                hideToolbar={false}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 0,
                }}
                textareaProps={{
                  placeholder: "# Start writing your post here...\n\nUse ## for section headings, **bold**, *italic*, [Link text](/contact), and | tables |.",
                  style: { fontFamily: "monospace", fontSize: 13 },
                }}
              />
            </div>

            {/* Quick Reference Guide */}
            <div className="bg-white/[0.02] border border-white/5 p-4 text-xs text-ashGrey/70 space-y-1">
              <p className="text-ashGrey text-xs font-semibold mb-2 uppercase tracking-widest">Quick Markdown Guide</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                <span><code className="text-whiteChrome/60"># Heading 1</code> — large title</span>
                <span><code className="text-whiteChrome/60">## Heading 2</code> — section</span>
                <span><code className="text-whiteChrome/60">### Heading 3</code> — sub-section</span>
                <span><code className="text-whiteChrome/60">**bold text**</code> — bold</span>
                <span><code className="text-whiteChrome/60">*italic text*</code> — italic</span>
                <span><code className="text-whiteChrome/60">---</code> — horizontal divider</span>
                <span><code className="text-whiteChrome/60">[Button Text](/quote)</code> → CTA Button</span>
                <span><code className="text-whiteChrome/60">[Link](/contact)</code> → CTA Button</span>
                <span><code className="text-whiteChrome/60">![alt](image-url)</code> — image</span>
                <span><code className="text-whiteChrome/60">- item</code> — bullet list</span>
                <span><code className="text-whiteChrome/60">1. item</code> — numbered list</span>
                <span><code className="text-whiteChrome/60">&gt; quote</code> — blockquote</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest text-ashGrey">Cover Image</label>
            <div className="relative border border-dashed border-white/15 p-6 text-center text-ashGrey text-sm hover:border-white/30 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imageFile
                ? imageFile.name
                : form.coverImageUrl
                ? "Replace current image..."
                : "Click or drag image here..."}
            </div>
            {form.coverImageUrl && !imageFile && (
              <img
                src={form.coverImageUrl}
                alt="Current cover"
                className="h-24 object-cover border border-white/10"
              />
            )}
          </div>

          {/* SEO Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-ashGrey">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
                placeholder="~60 characters"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-ashGrey">URL Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
                placeholder="auto-generated from title"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest text-ashGrey">
              Meta Description (SEO)
            </label>
            <textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              rows={2}
              className="w-full bg-vantaBlack border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors resize-y"
              placeholder="~155 characters — shown in Google search results"
            />
          </div>

          {/* Publish Toggle + Actions */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-4 h-4 accent-whiteChrome cursor-pointer"
              />
              <span className="text-sm text-ashGrey">Publish immediately</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border border-transparent text-ashGrey px-6 py-2.5 text-xs uppercase tracking-widest hover:text-whiteChrome transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-whiteChrome text-matteCarbon px-5 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all"
              >
                {submitting ? "Saving..." : editing ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Posts List */}
      {loading ? (
        <p className="text-ashGrey text-sm">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ashGrey mb-2">No blog posts yet</p>
          <button onClick={openCreate} className="text-sm text-whiteChrome underline">
            Write your first post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between bg-matteCarbon border border-white/10 px-5 py-4 hover:border-white/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-whiteChrome text-sm font-medium truncate">{post.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-xs uppercase tracking-wider ${
                      post.isPublished ? "text-green-400" : "text-ashGrey"
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                  {post.category && (
                    <span className="text-xs text-ashGrey border border-white/10 px-2 py-0.5">
                      {post.category}
                    </span>
                  )}
                  <span className="text-xs text-ashGrey">
                    {post.readTimeMinutes} min read
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 text-ashGrey hover:text-whiteChrome transition-colors"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-ashGrey hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}