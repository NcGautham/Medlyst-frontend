import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Wraps page-level routes with a fade + subtle lift transition. Pairs with
 * `mode="wait"` so the outgoing page completes its exit before the next one
 * enters. Scroll restoration happens when the new page mounts to avoid a
 * "scroll jump" during the exit phase.
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onAnimationStart={() => {
          // Defer to next frame so the scroll happens once the new page has begun mounting,
          // avoiding a flash of the outgoing page at scrollTop = 0.
          requestAnimationFrame(() => {
            try {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            } catch {
              window.scrollTo(0, 0);
            }
          });
        }}
      >
        <PageMount />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Tiny no-op that fires once per mount to belt-and-braces the scroll reset.
const PageMount = () => {
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
};

export default PageTransition;
