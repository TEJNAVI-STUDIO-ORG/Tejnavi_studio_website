import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/services", label: "Expertise" },
    { href: "/portfolio", label: "Work" },
    { href: "/about", label: "Studio" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 mix-blend-difference">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-heading font-bold tracking-tighter text-whiteChrome group relative z-50">
            TEJNAVI<span className="text-liquidSilver group-hover:text-mercuryGlow transition-colors">.</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium text-liquidSilver">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={`relative group transition-colors ${location === link.href ? 'text-whiteChrome' : 'hover:text-whiteChrome'}`}>
                {link.label}
                {location === link.href && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-0 w-full h-[1px] bg-whiteChrome"
                  />
                )}
              </a>
            </Link>
          ))}
          <Link href="/quote">
            <a className="bg-whiteChrome text-matteCarbon px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all duration-300">
              Get a Quote
            </a>
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-whiteChrome z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-matteCarbon z-40 flex flex-col items-center justify-center space-y-8"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a 
                className="text-3xl font-heading font-bold text-whiteChrome hover:text-liquidSilver transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/quote">
            <a 
              className="bg-whiteChrome text-matteCarbon px-8 py-4 mt-8 font-bold uppercase tracking-widest text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </a>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}