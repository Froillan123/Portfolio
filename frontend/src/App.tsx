/**
 * ==============================================================================
 * Froillan Edem - Platform & Cloud Systems Portfolio Web Client
 * ==============================================================================
 * Core Single-Page Application (SPA) Entrypoint & Root Provider Hierarchy
 * 
 * Provider Tree:
 *   ├── QueryClientProvider (TanStack React Query Cache & Background Hydration)
 *   ├── ThemeProvider (Dark / Light / System Mode Persistence)
 *   ├── TooltipProvider (Radix UI Primitives)
 *   ├── Toaster / Sonner (Dual Ingress Notification Systems)
 *   └── BrowserRouter (Client-Side HTML5 History API Routing)
 *       ├── ScrollToTop (Route Change Viewport Reset)
 *       ├── SiteHeader (Fixed Ingress Navigation Bar)
 *       ├── Main Content Viewport (Dynamic Route Resolution)
 *       ├── SiteFooter (Editorial & Architecture Links)
 *       └── Chatbot (Interactive Portfolio & System Assistant)
 * ==============================================================================
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { Chatbot } from "@/components/Chatbot";
import Index from "./pages/Index";
import PlatformPage from "./pages/PlatformPage";
import SecurityPage from "./pages/SecurityPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Global TanStack Query Client Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <SiteHeader />
            <main className="flex-1 overflow-x-hidden">
              <Routes>
                {/* 1. Landing & Highlights */}
                <Route path="/" element={<Index />} />
                
                {/* 2. Platform Architecture & Subsystems */}
                <Route path="/platform" element={<PlatformPage />} />
                
                {/* 3. Security Audit & RA 10173 Findings */}
                <Route path="/security" element={<SecurityPage />} />
                
                {/* 4. Engineering Mission & Origin Story */}
                <Route path="/about" element={<AboutPage />} />
                
                {/* 5. Ingress Inquiry & Contact Form */}
                <Route path="/contact" element={<ContactPage />} />
                
                {/* 6. Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <SiteFooter />
            <Chatbot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
