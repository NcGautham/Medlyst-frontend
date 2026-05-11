import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gradient bar pinned to the top edge that fills as the user scrolls.
 * Uses a spring on the scroll progress so it eases rather than tracking 1:1.
 */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.25,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-[#346739] via-[#7bcc84] to-[#346739] shadow-[0_0_12px_rgba(123,204,132,0.55)]"
    />
  );
};

export default ScrollProgressBar;
