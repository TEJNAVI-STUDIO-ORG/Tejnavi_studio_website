import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    boolean,
    integer,
    jsonb,
} from "drizzle-orm/pg-core";

/* ═══════════════════════════════════════════
   ADMIN USERS — Multi-admin support
   ═══════════════════════════════════════════ */
export const adminUsers = pgTable("admin_users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 50 }).notNull().default("admin"), // "superadmin" | "admin" | "editor"
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   PROJECTS — Portfolio items
   ═══════════════════════════════════════════ */
export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    category: varchar("category", { length: 100 }).notNull(),
    tech: varchar("tech", { length: 500 }).notNull(),
    subtitle: varchar("subtitle", { length: 500 }),
    description: text("description"),
    imageUrl: text("image_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    year: varchar("year", { length: 10 }).notNull(),
    caseStudyUrl: text("case_study_url"),
    repoUrl: text("repo_url"),
    liveUrl: text("live_url"),
    isFeatured: boolean("is_featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   BLOG POSTS — SEO content marketing
   ═══════════════════════════════════════════ */
export const blogPosts = pgTable("blog_posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content").notNull(), // Markdown content
    coverImageUrl: text("cover_image_url"),
    authorId: integer("author_id").references(() => adminUsers.id),
    category: varchar("category", { length: 100 }),
    tags: jsonb("tags").$type<string[]>().default([]),
    readTimeMinutes: integer("read_time_minutes").default(5),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   TESTIMONIALS — Client reviews
   ═══════════════════════════════════════════ */
export const testimonials = pgTable("testimonials", {
    id: serial("id").primaryKey(),
    clientName: varchar("client_name", { length: 255 }).notNull(),
    clientRole: varchar("client_role", { length: 255 }),
    company: varchar("company", { length: 255 }),
    companyLogoUrl: text("company_logo_url"),
    avatarUrl: text("avatar_url"),
    content: text("content").notNull(),
    rating: integer("rating").default(5), // 1-5 stars
    projectId: integer("project_id").references(() => projects.id),
    isPublished: boolean("is_published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   CONTACT SUBMISSIONS
   ═══════════════════════════════════════════ */
export const contactSubmissions = pgTable("contact_submissions", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    service: varchar("service", { length: 255 }),
    message: text("message").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("new"), // "new" | "read" | "replied"
    notes: text("notes"), // Admin internal notes
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   QUOTE REQUESTS — With pipeline tracking
   ═══════════════════════════════════════════ */
export const quoteRequests = pgTable("quote_requests", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    company: varchar("company", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    projectType: varchar("project_type", { length: 255 }),
    budget: varchar("budget", { length: 100 }),
    timeline: varchar("timeline", { length: 100 }),
    description: text("description").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("new"), // "new" | "contacted" | "in_progress" | "quoted" | "won" | "lost"
    notes: text("notes"),
    assignedTo: integer("assigned_to").references(() => adminUsers.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   NEWSLETTER SUBSCRIBERS
   ═══════════════════════════════════════════ */
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    isActive: boolean("is_active").notNull().default(true),
    subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
    unsubscribedAt: timestamp("unsubscribed_at"),
});

/* ═══════════════════════════════════════════
   SITE SETTINGS — Key-value config
   ═══════════════════════════════════════════ */
export const siteSettings = pgTable("site_settings", {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 255 }).notNull().unique(),
    value: text("value"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/* ═══════════════════════════════════════════
   TYPE EXPORTS
   ═══════════════════════════════════════════ */
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
