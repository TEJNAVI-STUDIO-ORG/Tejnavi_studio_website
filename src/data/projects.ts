export interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  subtitle?: string;
  image: string;
  year: string;
  caseStudyUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Lumina Analytics",
    category: "SaaS",
    tech: "React, Node.js, Python",
    subtitle: "SaaS Dashboard Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    year: "2026",
    caseStudyUrl: "https://github.com",
    repoUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 2,
    title: "Nexus FinTech",
    category: "App",
    tech: "React Native, Go",
    subtitle: "Full-Stack Application",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
    year: "2025",
    caseStudyUrl: "https://github.com",
    repoUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 3,
    title: "Aura Commerce",
    category: "E-commerce",
    tech: "Next.js, Shopify",
    subtitle: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    year: "2025",
    caseStudyUrl: "https://github.com",
    repoUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 4,
    title: "Vertex CRM",
    category: "CRM",
    tech: "Vue.js, PostgreSQL",
    subtitle: "Customer Relationship System",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    year: "2024",
    caseStudyUrl: "https://github.com",
    repoUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 5,
    title: "Zenith Search",
    category: "SEO",
    tech: "Technical SEO, Content",
    image: "https://plus.unsplash.com/premium_photo-1669077046886-9cd00ba98bf9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: "2026",
    caseStudyUrl: "https://github.com",
    repoUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 6,
    title: "Nova Dashboard",
    category: "SaaS",
    tech: "React, Tailwind",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000",
    year: "2025",
    caseStudyUrl: "https://github.com",
    repoUrl: "https://github.com",
    liveUrl: "https://github.com"
  }
];

export const FEATURED_PROJECTS = PROJECTS.slice(0, 6);
