import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Max pull distance in pixels from the centre. */
  strength?: number;
  /** Reduces inner tilt; pass true if children already animate on hover. */
  disabled?: boolean;
}

/**
 * Wraps children in a div that nudges toward the cursor when hovered.
 * Pointer-coarse and reduced-motion users get a passthrough, no-op wrapper.
 */
export const Magnetic = ({
  children,
  className,
  strength = 14,
  disabled = false,
}: MagneticProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion();

  const springConfig = { stiffness: 220, damping: 18, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const isCoarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;
  const off = disabled || reduce || isCoarse;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (off || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (off) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
