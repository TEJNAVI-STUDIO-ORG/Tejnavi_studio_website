import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-matteCarbon pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-whiteChrome mb-6 tracking-tight">
              READY TO <br /> BUILD <span className="text-liquidSilver italic">BEYOND?</span>
            </h2>
            <Link href="/quote">
              <a className="inline-block bg-whiteChrome text-matteCarbon px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-liquidSilver transition-all duration-300">
                Start a Project
              </a>
            </Link>
          </div>
          
          <div>
            <h4 className="text-whiteChrome font-bold mb-6 font-heading tracking-widest text-sm">NAVIGATION</h4>
            <ul className="space-y-4 text-ashGrey">
              <li><Link href="/services"><a className="hover:text-whiteChrome transition-colors">Expertise</a></Link></li>
              <li><Link href="/portfolio"><a className="hover:text-whiteChrome transition-colors">Work</a></Link></li>
              <li><Link href="/about"><a className="hover:text-whiteChrome transition-colors">Studio</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-whiteChrome transition-colors">Contact</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-whiteChrome font-bold mb-6 font-heading tracking-widest text-sm">SOCIAL</h4>
            <ul className="space-y-4 text-ashGrey">
              <li><a href="#" className="hover:text-whiteChrome transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-whiteChrome transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-whiteChrome transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-whiteChrome transition-colors">Behance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-ashGrey tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Tejnavi Studio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-whiteChrome transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-whiteChrome transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}