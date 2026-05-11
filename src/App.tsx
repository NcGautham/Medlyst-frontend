import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/context/BookingContext";
import { DoctorsProvider } from "@/context/DoctorsContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BookingModal } from "@/components/BookingModal";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminPage from "./admin/AdminPage";
import AdminLogin from "./admin/AdminLogin";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('medlyst_admin_token') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  const [DevToolbar, setDevToolbar] = useState<LazyExoticComponent<
    ComponentType
  > | null>(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    setDevToolbar(
      lazy(() => import("@/dev/TwentyFirstToolbarRoot"))
    );
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DoctorsProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          {DevToolbar ? (
            <Suspense fallback={null}>
              <DevToolbar />
            </Suspense>
          ) : null}
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <BookingModal />
          </BrowserRouter>
        </BookingProvider>
      </DoctorsProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
