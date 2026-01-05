import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WellnessChat from "./pages/WellnessChat";
import WellnessTools from "./pages/WellnessTools";
import MoodCheckIn from "./pages/MoodCheckIn";
import TherapistDiscovery from "./pages/TherapistDiscovery";
import TrustSafety from "./pages/TrustSafety";
import CrisisSupport from "./pages/CrisisSupport";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<WellnessChat />} />
          <Route path="/wellness" element={<WellnessTools />} />
          <Route path="/mood" element={<MoodCheckIn />} />
          <Route path="/therapists" element={<TherapistDiscovery />} />
          <Route path="/trust" element={<TrustSafety />} />
          <Route path="/crisis" element={<CrisisSupport />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
