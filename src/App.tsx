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
import { MobileBottomNav } from "@/components/MobileBottomNav";

const Home = lazy(() => import("./pages/Home"));
const Doctors = lazy(() => import("./pages/Doctors"));
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminPage = lazy(() => import("./admin/AdminPage"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));

const BookingModal = lazy(() =>
  import("@/components/BookingModal").then((m) => ({ default: m.BookingModal })),
);
const ScrollProgressBar = lazy(() =>
  import("@/components/ScrollProgressBar").then((m) => ({ default: m.ScrollProgressBar })),
);
const CursorSpotlight = lazy(() =>
  import("@/components/CursorSpotlight").then((m) => ({ default: m.CursorSpotlight })),
);

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center bg-[hsl(150,55%,3%)]">
    <div
      className="h-8 w-8 animate-spin rounded-full border-2 border-[#346739]/50 border-t-[#7bcc84]"
      aria-hidden
    />
    <span className="sr-only">Loading page</span>
  </div>
);

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

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
              <Suspense fallback={null}>
                <ScrollProgressBar />
              </Suspense>
              <Suspense fallback={null}>
                <CursorSpotlight />
              </Suspense>
              <Header />
              <div className="pb-safe-nav">
                <Suspense fallback={<PageFallback />}>
                  <AnimatedRoutes />
                </Suspense>
                <Footer />
              </div>
              <MobileBottomNav />
              <Suspense fallback={null}>
                <BookingModal />
              </Suspense>
            </BrowserRouter>
          </BookingProvider>
        </DoctorsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
