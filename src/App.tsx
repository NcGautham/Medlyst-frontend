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
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookingProvider } from "@/context/BookingContext";
import { DoctorsProvider } from "@/context/DoctorsContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminPage from "./admin/AdminPage";
import AdminLogin from "./admin/AdminLogin";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('medlyst_admin_token') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduce = useReducedMotion();

  // Scroll to top whenever the pathname changes — done here so it fires after
  // the new motion.div has mounted, avoiding a jump during the outgoing exit.
  useEffect(() => {
    const scroll = () =>
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    requestAnimationFrame(scroll);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, y: 14, filter: 'blur(5px)' }
        }
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: 'blur(0px)' }
        }
        exit={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, y: -8, filter: 'blur(3px)' }
        }
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [DevToolbar, setDevToolbar] = useState<LazyExoticComponent<
    ComponentType
  > | null>(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    setDevToolbar(lazy(() => import("@/dev/TwentyFirstToolbarRoot")));
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
              <ScrollProgressBar />
              <CursorSpotlight />
              <Header />
              <div className="pb-safe-nav">
                <AnimatedRoutes />
                <Footer />
              </div>
              <MobileBottomNav />
              <BookingModal />
            </BrowserRouter>
          </BookingProvider>
        </DoctorsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
