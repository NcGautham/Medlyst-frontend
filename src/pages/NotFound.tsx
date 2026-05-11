import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="relative flex min-h-screen items-center overflow-x-hidden bg-background pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-lg absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 opacity-60" />
        <div className="orb orb-green-sm absolute bottom-[10%] right-[10%] h-[260px] w-[260px] opacity-40" />
      </div>

      <Container size="sm" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[6.5rem] font-extrabold leading-none tracking-tight text-gradient sm:text-[9rem]">
            404
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55 sm:text-base">
            The page you're looking for doesn't exist or has been moved. Let's get you
            back to something useful.
          </p>

          <div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="tap-raise inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#346739] px-6 font-semibold text-white shadow-glow-md transition-all hover:bg-[#3f8548] hover:brightness-110"
            >
              <HomeIcon className="h-5 w-5" />
              Back to Home
            </Link>
            <Link
              to="/doctors"
              className="tap-raise inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#346739]/55 bg-transparent px-6 font-semibold text-[#b8e8bf] transition-all hover:border-[#5aad68]/70 hover:bg-[#346739]/15"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Find a Doctor
            </Link>
          </div>
        </motion.div>
      </Container>
    </main>
  );
};

export default NotFound;
