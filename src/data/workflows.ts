export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  slug: string;
  title: string;
  summary: string;
  steps: WorkflowStep[];
}

export const WORKFLOWS: Workflow[] = [
  {
    slug: "website-development",
    title: "Website Development Workflow",
    summary: "How we design, build, and launch modern websites from landing pages to multi-page experiences.",
    steps: [
      { title: "Discovery & Requirements", description: "Goals, audience, content structure, and technical needs." },
      { title: "Information Architecture", description: "Sitemap, navigation, and page hierarchy." },
      { title: "UX & Visual Design", description: "Wireframes, mockups, and responsive layouts." },
      { title: "Development & CMS", description: "Frontend build, CMS setup, and content migration." },
      { title: "Launch & SEO", description: "Deployment, performance tuning, and search optimization." },
    ],
  },
  {
    slug: "shopify-website",
    title: "Shopify Website Development Workflow",
    summary: "How we build and customize e-commerce stores on Shopify for maximum sales and smooth operations.",
    steps: [
      { title: "Store Strategy", description: "Product catalog, pricing, and conversion goals." },
      { title: "Theme Selection & Customization", description: "Liquid templates, sections, and branded storefront." },
      { title: "Apps & Integrations", description: "Payments, shipping, inventory, and marketing tools." },
      { title: "Checkout & Conversion", description: "Cart UX, checkout optimization, and upsells." },
      { title: "Go Live & Scale", description: "Launch, analytics, and ongoing optimization." },
    ],
  },
  {
    slug: "web-apps",
    title: "Web Application Development Workflow",
    summary: "How we build high-performance, scalable web applications with modern frameworks.",
    steps: [
      { title: "Discovery & Strategy", description: "Stakeholder interviews, requirements, and success metrics." },
      { title: "UX Architecture", description: "Sitemaps, user flows, and wireframes." },
      { title: "Visual Design", description: "High-fidelity UI and design system." },
      { title: "Implementation", description: "Frontend, backend, integrations, and QA." },
      { title: "Launch & Iterate", description: "Deployment, monitoring, and ongoing improvements." },
    ],
  },
  {
    slug: "saas-apps",
    title: "SaaS App Development Workflow",
    summary: "How we design and build subscription-based software as a service products.",
    steps: [
      { title: "Product Strategy", description: "Pricing model, tiers, and feature roadmap." },
      { title: "Multi-tenant Architecture", description: "Data isolation, billing, and auth design." },
      { title: "Core Features & Dashboards", description: "Admin panel, user management, and analytics." },
      { title: "Subscription & Payments", description: "Stripe/payment integration, trials, and invoicing." },
      { title: "Scale & Reliability", description: "Infrastructure, monitoring, and SLA compliance." },
    ],
  },
  {
    slug: "crm",
    title: "CRM Development Workflow",
    summary: "How we build custom CRM systems for sales, marketing, and customer success.",
    steps: [
      { title: "Process Mapping", description: "Sales pipeline, stages, and touchpoints." },
      { title: "Data Model & Integrations", description: "Contacts, deals, activities, and API connections." },
      { title: "Dashboards & Reporting", description: "KPIs, reports, and forecasting views." },
      { title: "Automation & Workflows", description: "Triggers, rules, and notifications." },
      { title: "Training & Handoff", description: "User guides, admin training, and support." },
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development Workflow",
    summary: "How we build native and cross-platform mobile apps for iOS and Android.",
    steps: [
      { title: "App Strategy", description: "Use cases, platform priorities, and store requirements." },
      { title: "UX & Prototyping", description: "Screens, gestures, and navigation patterns." },
      { title: "Visual Design", description: "Platform guidelines, components, and assets." },
      { title: "Development & APIs", description: "React Native/Flutter build, backend integration." },
      { title: "Testing & Store Submission", description: "QA, TestFlight/Internal Testing, and release." },
    ],
  },
  {
    slug: "desktop-apps",
    title: "Desktop Application Development Workflow",
    summary: "How we build cross-platform desktop apps with Electron or native tooling.",
    steps: [
      { title: "Scope & Platform", description: "Windows, macOS, or both; offline vs online." },
      { title: "Architecture Design", description: "Electron/Tauri or native; local storage and sync." },
      { title: "UI & Interaction", description: "Desktop-appropriate layouts and keyboard shortcuts." },
      { title: "Build & Packaging", description: "Installers, updates, and code signing." },
      { title: "Distribution & Updates", description: "Auto-updates and user onboarding." },
    ],
  },
  {
    slug: "spotify-type-apps",
    title: "Music & Streaming App Development Workflow",
    summary: "How we build music, podcast, or media streaming applications.",
    steps: [
      { title: "Content & Licensing", description: "Catalog structure, licensing, and rights." },
      { title: "Streaming Architecture", description: "Media delivery, caching, and offline support." },
      { title: "Playback & Discovery", description: "Player UI, playlists, search, and recommendations." },
      { title: "Social & Engagement", description: "Sharing, following, and community features." },
      { title: "Launch & Growth", description: "Analytics, A/B tests, and content strategy." },
    ],
  },
  {
    slug: "ui-ux",
    title: "UI/UX Experience Design Workflow",
    summary: "How we engineer product experiences from research to design systems.",
    steps: [
      { title: "User Research", description: "Interviews, personas, and usability testing." },
      { title: "Information Architecture", description: "Sitemaps, flows, and content hierarchy." },
      { title: "Wireframing", description: "Low-fidelity layouts and interaction patterns." },
      { title: "Visual Design", description: "High-fidelity UI, design system, and prototypes." },
      { title: "Handoff & Iteration", description: "Specs, assets, and design support." },
    ],
  },
  {
    slug: "automation-ai",
    title: "Intelligent Automation & AI Workflow",
    summary: "How we integrate AI and automation into your workflows.",
    steps: [
      { title: "Process Audit", description: "Identify repetitive tasks and automation opportunities." },
      { title: "Solution Design", description: "LLM integration, RAG, or rule-based automation." },
      { title: "Development & Integration", description: "APIs, pipelines, and existing tool integrations." },
      { title: "Testing & Tuning", description: "Accuracy, latency, and edge cases." },
      { title: "Deploy & Monitor", description: "Production rollout and performance monitoring." },
    ],
  },
  {
    slug: "brand-identity",
    title: "Brand & Visual Identity Workflow",
    summary: "How we define and execute brand systems across touchpoints.",
    steps: [
      { title: "Brand Strategy", description: "Positioning, voice, and visual direction." },
      { title: "Logo & Wordmark", description: "Primary and secondary lockups." },
      { title: "Brand Guidelines", description: "Colors, typography, and usage rules." },
      { title: "Design Systems", description: "Components and patterns for product." },
      { title: "Marketing Assets", description: "Templates and campaign materials." },
    ],
  },
  {
    slug: "devops-cloud",
    title: "DevOps & Cloud Architecture Workflow",
    summary: "How we set up and maintain reliable, scalable infrastructure.",
    steps: [
      { title: "Architecture Review", description: "Cloud provider, regions, and services." },
      { title: "CI/CD Pipeline", description: "Build, test, and deployment automation." },
      { title: "Monitoring & Alerts", description: "Logs, metrics, and incident response." },
      { title: "Security & Compliance", description: "Secrets, IAM, and audit trails." },
      { title: "Optimization", description: "Cost, performance, and scaling tuning." },
    ],
  },
  {
    slug: "data-engineering",
    title: "Data Engineering Workflow",
    summary: "How we build scalable data pipelines and analytics infrastructure.",
    steps: [
      { title: "Data Discovery", description: "Sources, schemas, and use cases." },
      { title: "Pipeline Design", description: "ETL/ELT, warehousing, and lake architecture." },
      { title: "Implementation", description: "Orchestration, transformations, and quality checks." },
      { title: "Analytics & BI", description: "Dashboards, reports, and access control." },
      { title: "Maintenance", description: "Monitoring, backfills, and schema evolution." },
    ],
  },
  {
    slug: "seo",
    title: "SEO Optimization Workflow",
    summary: "How we improve search visibility and organic traffic.",
    steps: [
      { title: "Audit & Strategy", description: "Technical SEO, keywords, and competitor analysis." },
      { title: "On-Page Optimization", description: "Meta, headings, content, and structure." },
      { title: "Technical Fixes", description: "Core Web Vitals, indexing, and sitemaps." },
      { title: "Content & Links", description: "Content strategy and link building." },
      { title: "Track & Iterate", description: "Ranking reports and ongoing optimization." },
    ],
  },
];
