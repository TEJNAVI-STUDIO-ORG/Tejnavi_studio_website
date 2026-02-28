import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Projects from "@/pages/Portfolio";
import Quote from "@/pages/Quote";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Workflows from "@/pages/Workflows";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/projects" component={Projects} />
          <Route path="/quote" component={Quote} />
          <Route path="/about-us" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/workflows/:slug" component={Workflows} />
          <Route path="/workflows" component={Workflows} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />

      <div className="fixed bottom-4 right-4 z-40 pointer-events-none origin-bottom-right scale-[1.2]">
        <div className="px-3 py-1.5 text-[10px] tracking-widest uppercase text-whiteChrome/90 bg-white/10 border border-white/30 backdrop-blur-sm">
          © {new Date().getFullYear()} Aditya Vispute
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScroll>
          <CustomCursor />
          <Router />
          <Toaster />
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;