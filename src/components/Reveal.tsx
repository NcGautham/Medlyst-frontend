import { motion, useReducedMotion, type Variants } from 'framer-motion';
import React from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  /** Stagger child delay seconds. If you want a parent that staggers children, use RevealGroup. */
  delay?: number;
  duration?: number;
  distance?: number;
  /** If true, the animation runs only the first time it scrolls into view. Default: true. */
  once?: boolean;
  /** "as" - render as a different motion tag, default div. */
  as?: 'div' | 'section' | 'article' | 'li' | 'ul' | 'span';
  /** Viewport amount before triggering (0-1). Default 0.18. */
  amount?: number;
}

const offsetFor = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up':    return { x: 0,   y: d };
    case 'down':  return { x: 0,   y: -d };
    case 'left':  return { x: d,   y: 0 };
    case 'right': return { x: -d,  y: 0 };
    case 'fade':
    default:      return { x: 0,   y: 0 };
  }
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 22,
  once = true,
  as = 'div',
  amount = 0.18,
}) => {
  const reduce = useReducedMotion();
  const { x, y } = offsetFor(direction, distance);

  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between children, seconds. */
  stagger?: number;
  /** Initial wait before first child, seconds. */
  initialDelay?: number;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'ul';
}

const groupVariants = (stagger: number, initialDelay: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren: initialDelay,
      staggerChildren: stagger,
    },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Wrap direct children in `<RevealItem>` to use the parent's stagger. */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = 0.08,
  initialDelay = 0,
  once = true,
  amount = 0.18,
  as = 'div',
}) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }
  return (
    <Comp
      variants={groupVariants(stagger, initialDelay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Comp>
  );
};

export const RevealItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default Reveal;
