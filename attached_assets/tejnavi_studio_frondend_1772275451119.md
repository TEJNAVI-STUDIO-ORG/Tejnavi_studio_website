![technology stack and animation tech](image1.png)

# Tejnavi Studio Frontend Plan

## 📄 Website Pages & Structure

### 1. Home Page 🏠

**Purpose:** First impression; showcase everything at a glance.

**Sections:**

- **Hero Section** – 3D animated background, bold tagline, CTA buttons
- **Services Marquee** – scrolling animation
- **Featured Services Grid** – animated cards
- **Stats Counter** – projects delivered, clients served, industries covered
- **Featured Portfolio Projects** – filterable
- **Why Choose Tejnavi?** – differentiators
- **Client Testimonials** – carousel****
- **Final CTA Banner**

---

### 2. Services Pages 🛠️

**Purpose:** Detailed information about each service.

**Structure:**

- Separate dedicated page for **each service** (8 pages total).
- Each page includes:
  - What we offer
  - How we deliver
  - Technologies we use
  - Related case studies
  - **Get a Quote** CTA

---

### 3. Portfolio / Projects Page 💼

**Purpose:** Showcase our past work.

**Features:**

- Filter by category (Web, App, SaaS, CRM, Shopify, etc.).
- Project cards with hover animations.
- Click to open detailed case study page.
- Each case study includes:
  - Client problem statement
  - Our solution approach
  - Technologies used
  - Results achieved
  - Screenshots/visuals
  - Live link (if applicable else add a place holder "live soon" )

---

### 4. Get a Quote Page 💰 ⭐ *(MOST IMPORTANT)*

**Purpose:** Automated pricing calculator and lead generation.

**How It Works:**

1. Client selects **Service Type** (Website, App, SaaS, etc.).
2. Sub‑options appear based on the selection.
3. Client selects **Industry** (E‑commerce, Healthcare, Education, etc.).
4. Client selects **Required Features** (checkboxes):
   - User Login System
   - Payment Gateway Integration
   - Admin Panel
   - Custom Dashboard
   - Mobile Responsive
   - API Integration
   - etc.
5. Client selects **Timeline** (Rush / Standard / Relaxed).
6. Live price estimate updates as selections change.
7. Final form submission triggers:
   - Quote saved in database
   - Email sent to client with estimate
   - Notification sent to admin panel
   - Follow‑up automation

> This page will be our biggest lead generator!

---

### 5. About Page 👥

**Purpose:** Build trust and credibility.

**Sections:**

- Company story and mission
- Team members (with animated cards)
- Our values and culture
- Tech‑stack showcase (animated logo marquee)
- Industries we serve

---

### 6. Contact Page 📞

**Purpose:** Easy communication channel.

**Features:**

- Animated contact form (Name, Email, Phone, Service Interest, Message)
- Submission triggers:
  - Data saved in database
  - Auto‑reply email to client
  - Notification to admin
- WhatsApp direct link
- Social media links
- Office location (optional)

---

## ✨ Animation & Design Strategy

**Goal:** Website should feel premium, modern, and unique — not like a template.

### Animation Layers

1. **GSAP + ScrollTrigger**
   - Section reveals as you scroll
   - Parallax effects
   - Text animations (split text effects)
   - Counter animations (numbers counting up)
   - Timeline‑based complex animations
2. **Framer Motion**
   - Page transitions (smooth fade/slide between pages)
   - Button hover effects
   - Modal/popup animations
   - Card entrance animations
3. **Three.js / React Three Fiber**
   - 3D animated hero background (particles, geometric shapes, interactive globe)
   - WebGL‑powered visual effects
4. **Lenis**
   - Smooth momentum‑based scrolling throughout site
   - Gives a premium "Apple‑like" feel
5. **CSS Animations**
   - Gradient shifts
   - Glowing CTA effects
   - Marquee scrolling text

### Design Philosophy

- Dark mode by default (modern, premium feel)
- Bold typography
- Generous white space
- Micro‑interactions everywhere (hover states, button clicks)
- Custom cursor effect (optional but impressive)

### Extra Features (Optional but Impressive)

1. Industry selector on homepage — visitor chooses industry and relevant case studies appear
2. WhatsApp chat widget — floating button for instant queries (very effective in Indian market)
3. Dark mode toggle — allow switching between dark/light themes (dark by default)
4. Custom loading animation — branded preloader with Tejnavi Studio logo
5. Custom cursor effect — animated cursor that follows mouse
6. Floating "Get Quote" button — always visible on scroll for easy access
7. Project filter animations — smooth transitions when filtering portfolio items
8. Testimonial video integration — option to add video testimonials (stored in Supabase)

## 🛠 Technology Stack (Recommended)

### Frontend Technologies


| Technology              | Purpose                                | Why This Choice                                       |
| ----------------------- | -------------------------------------- | ----------------------------------------------------- |
| Next.js 15 (App Router) | Main framework / server-side rendering | Latest version, fastest performance, built-in SEO     |
| TypeScript              | Type safety                            | Prevents bugs, better code quality; industry standard |
| Tailwind CSS            | Styling                                | Fast development, fully customizable, modern design   |
| shadcn/ui               | UI components                          | Pre-built, accessible components; easy to customize   |

### Animation Technologies *(Website Ka USP)*


| Technology                   | Purpose            | Why This Choice                                                       |
| ---------------------------- | ------------------ | --------------------------------------------------------------------- |
| GSAP + ScrollTrigger         | Complex animations | Industry-leading scroll animations, timeline control, top performance |
| Framer Motion                | React animations   | Smooth page transitions, hover effects; ideal for React components    |
| Three.js + React Three Fiber | 3D graphics        | Stunning 3D hero sections, interactive backgrounds                    |
| Lenis                        | Smooth scrolling   | Butter‑smooth momentum scrolling; premium "Apple-like" feel          |

# 🎨 The "Tejnavi Premium Matte" Color Palette

Since your logo is beautifully neutral (silver/grey), you have the perfect canvas for a subtle high‑tech accent. Use **Mercury Glow** or **Liquid Silver** on buttons and highlights—they maintain the metallic feel and look sophisticated against the matte grays.

Here are the exact Hex codes to use in your Tailwind CSS configuration:


| Element         | Color Name        | Hex Code  | Purpose & Application                                                                    |
| --------------- | ----------------- | --------  | ---------------------------------------------------------------------------------------- |
| Main Background | Matte Carbon      | #0F0F0F  |  The deep, rich dark gray for the main website background. Never pure black. looks like high-end tech packaging. |
| Surface/Cards   | Elevated Charcoal, Brushed Anthracite  | #1E1E1E, #1A1A1A   | Used for your Project Cards, Pricing Boxes, and Contact Form background.  For project cards; gives a subtle "metal plate" feel.|
| Borders/Lines   | Gunmetal          | #333333  | Subtle dividers between sections or borders around your input fields.                    |
| Primary Text    | Frost White       | #F5F5F5  | High contrast, but softer than pure white. Use for all Headings (H1, H2, H3).            |
| Secondary Text  | Ash Grey          | #A1A1AA  | Legible but muted. Use for paragraph text, descriptions, and footer links.               |
| Brand Matching  | Chrome Silver     | #D4D4D8  | To match your logo. Use for inactive icons or subtle highlight text.                     |
| Primary Accent    | White Chrome    | #FFFFFF  | Your CTA buttons. Pure, glowing white that cuts through the dark. |
| Secondary Accent  | Liquid Silver   | #C0C0C0  | Used for icons and borders to match the metallic logo. |
| Active States     | Mercury Glow    | #E5E5E5  | A soft, metallic sheen used when hovering over elements. |


---

## ✨ The Animation System: Macro to Micro

To make this feel like a world-class agency, the animations need to feel deliberate. We don't want things flying around chaotically; we want smooth, "heavy" animations that match the metallic feel of your brand.

### 1. Macro Animations (The Big Picture)

These are the massive, full-page effects that set the tone.

- **Smooth Scrolling (Lenis):** The entire site must use momentum-based scrolling. When the user stops scrolling, the page glides to a halt rather than stopping abruptly.
- **Page Transitions (Framer Motion):** When moving from the Homepage to the Portfolio, the screen shouldn't blink white. The current page should smoothly slide up while fading into the #121212 background, revealing the next page.
- **The Hero 3D Element (React Three Fiber):** Behind your main tagline, have a slow-moving, 3D wireframe mesh or fluid wave in deep charcoal and subtle silver. It should gently rotate based on where the user moves their mouse.

### 2. Section-Level Animations (As You Scroll)

Using GSAP (GreenSock) + ScrollTrigger, these happen as the user navigates down your drawn wireframe.

- **Text Splitting:** When scrolling into the "About Us" or "Workflow" sections, the headings don't just fade in. They reveal themselves word-by-word from the bottom up, like they are being typed or sliding out from behind an invisible mask.
- **Staggered Card Reveals:** In your "Projects" grid, as the user scrolls them into view, the cards shouldn't appear all at once. They should fade and slide up sequentially (Card 1, then a millisecond later Card 2, then Card 3).
- **Parallax Images:** In the "About Us" section, make the photo scroll at a 15% slower speed than the rest of the page. It creates a 3D illusion of depth.

### 3. Micro-Interactions (The "Agency Polish")

These are the tiny details that make a website feel expensive and tactile.

- **Magnetic Buttons:** For your main "Get a Quote" buttons, when the user's cursor gets within 20 pixels of the button, the button slightly "pulls" toward the cursor.
- **Glow States:** When hovering over a Project Card or a Pricing Tier, cast a very faint, blurred #E5E5E5 (Mercury Glow) drop-shadow behind the card. It makes the matte dark UI feel like it's glowing from the inside.
- **Custom Cursor:** Hide the default Windows/Mac arrow pointer. Replace it with a small, hollow silver circle (#D4D4D8). When hovering over a clickable link or project, the circle expands and fills with Mercury Glow (#E5E5E5) or Liquid Silver (#C0C0C0).
- **Input Field Focus:** On your Contact Form, when a user clicks into the "Name" or "Email" box, the bottom border should smoothly animate from Gunmetal (#333333) to Mercury Glow (#E5E5E5) or Liquid Silver (#C0C0C0), expanding from the center outward.

### ✨ 4. Animation Strategy (Macro to Micro)


| Scale   | Technology         | Implementation Detail                                                                 |
| ------- | ------------------ | ------------------------------------------------------------------------------------- |
| Macro   | Lenis Scroll       | Smooth, momentum-based scrolling across the entire site.                              |
| Macro   | Framer Motion      | Seamless page-to-page transitions and layout shifts.                                  |
| Section | GSAP ScrollTrigger | Triggering text reveals, parallax images, and line-drawing animations.+1              |
| Micro   | CSS/Framer         | Magnetic button effects and "Glowing Cyan" hover states.+1                            |
| Depth   | Three.js           | 3D particles or geometric shapes in the Hero background that react to mouse position. |

---

### 1. The Typography System (The Voice of the Brand)

We have the colors, but we don't have the fonts. Your logo is sharp, geometric, and modern. Using a standard font like Arial or Times New Roman will instantly kill the premium vibe.

- **For Headings (The "Tech" Vibe):** You need a geometric or slightly futuristic sans-serif. Fonts like Space Grotesk, Clash Display, or Syncopate give that wide, bold, industrial tech feel that matches your metallic logo.
- **For Body Text (Readability):** You need something clean and invisible so the animations shine. Inter or Manrope are perfect for this.

### 2. The Actual Tagline Integration

In the original MVP document, the tagline was listed as "Custom Tech Solutions for Every Sector and Industry". However, I noticed on the banner image you uploaded, it says: "WHERE YOUR IDEAS FIND LIGHT".

- **The Fix:** This new tagline is much stronger and more emotional. We need to use this as the primary text that gets revealed by the GSAP split-text animation in the Hero section, saving the "Custom Tech Solutions" line for a smaller sub-heading.

### 3. The Navigation Menu (Desktop vs. Mobile)

We mapped out the page sections, but how does the user actually move around? A standard top-bar menu looks like a template.

- **The Premium Solution:** Use a Full-Screen Overlay Menu. On desktop and mobile, the user just sees a sleek "Hamburger" icon (maybe two lines instead of three for a modern look) and your Tejnavi logo. When clicked, the screen smoothly transitions into a dark #121212 overlay, and huge, bold menu links (Home, Projects, Workflow) stagger in one by one using Framer Motion.

### 4. The "Preloader" Sequence (The First 3 Seconds)

Since you are using Three.js and heavy animations, the website will take a second or two to load its assets. If the user sees a blank screen, they will leave.

- **The Vision:** When the URL is entered, the screen is pitch black. Your sharp "TS" logo slowly fades in, glowing slightly with a Mercury Glow or Liquid Silver accent. A thin, minimalist loading bar completes, the logo scales up and fades out, and then the 3D Hero section is revealed.

### 5. Performance & Accessibility (The Invisible Guardrails)

Beautiful animations are useless if the site lags or if Google penalizes it.

- **Performance:** We must ensure the developers use Next.js Image Optimization and lazy-load the Three.js 3D elements so the site doesn't drain the battery of a user viewing it on their phone.
- **Accessibility:** We need to add an option to "Respect Reduced Motion." If a user has settings on their device that say they get motion sickness, the site should gracefully turn off the heavy 3D and parallax effects and just serve them a beautiful, static, fast-loading site.



# 🏗️ Complete Frontend Blueprint: The "Metallic" Wireframe

## 1. The Pre-loader (The First Impression)
**The Look:** A pitch-black screen.

**The Animation:** A thin, horizontal silver line grows from the center. Above it, the "TS" logo fades in with a "shimmer" effect (a light reflection passing over the metal). Once loaded, the logo scales up and the screen splits open vertically to reveal the Hero.

## 2. The Hero Section (The "Impact")
**The Visual:** Your tagline "WHERE YOUR IDEAS FIND LIGHT" in a massive, bold font (Clash Display).

**The "Light" Effect:** As the user moves their mouse, a "spotlight" follows the cursor, revealing a hidden metallic texture on the background.

**The Graphic:** A 3D floating "Liquid Metal" sphere that ripples like water when the user scrolls.

## 3. Portfolio Showcase (The "Projects")
**The Grid:** Projects are displayed in a clean, asymmetrical grid.

**The Micro-interaction:** When hovering over a project, the image doesn't just "pop"—it transitions from a dark, matte grayscale to a sharp, high-contrast visual.

**The Reveal:** The project title appears in a Brushed Silver gradient.

## 4. The "Get a Quote" Wizard (The "Logic")
**The UI:** Instead of standard boxes, use "Glassmorphism." The cards should look like dark, semi-transparent frosted glass with a thin 1px silver border.

**The Selection:** When a user selects a service (e.g., "Mobile App"), the border of that card should start "glowing" with a white-hot intensity, making it look like energized metal.

## 5. The Workflow Pathway (The "Journey")
**The Visual:** A vertical "Liquid Line" that connects all sections.

**The Animation:** Using GSAP ScrollTrigger, as you scroll down to "How we deliver," the silver line "pours" down the page like molten metal, lighting up icons as it reaches them.

---

# ✨ Macro & Micro Animations: Detailed Specs

### Macro: Smooth Momentum Scroll (Lenis)
The entire website must feel "heavy" and smooth. No "janky" or "stuttery" scrolling. This mimics the feel of expensive machinery.

### Macro: Text Masking
Headlines don't just "appear." They should slide up from behind a "mask," looking like they are emerging from the matte background.

### Micro: The Magnetic Chrome Button
Your Main CTA ("Start a Project") should be a "Magnetic Button." When the cursor gets close, the button physically moves toward it.

**The Shine:** A diagonal "light reflection" should occasionally swipe across the button to remind the user it is "Metallic."

### Micro: Grain Overlay
Add a very subtle, animated CSS "Film Grain" or "Noise" over the entire site. It makes the matte black feel like a real-world material (like high-end paper or brushed metal) rather than just a flat digital color.

---

#🛠️ Developer Handoff Checklist

- **Framework:** Next.js 15.
- **Styling:** Tailwind CSS (Custom Metallic Theme).
- **Motion:** GSAP (Scroll animations) + Framer Motion (Page transitions).
- **3D Elements:** React Three Fiber (The Liquid Metal Hero).
- **Accessibility:** "Reduced Motion" mode for users who prefer static sites.