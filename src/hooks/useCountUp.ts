import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  decimals?: number;
  /** IntersectionObserver visibility threshold to start the count (0-1). */
  threshold?: number;
}

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Returns a ref to attach to the displayed element and the current value.
 * Honours `prefers-reduced-motion` by snapping immediately to the target.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  { duration = 1600, decimals = 0, threshold = 0.4 }: UseCountUpOptions = {},
) {
  const ref = useRef<T | null>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    let raf = 0;

    const start = () => {
      if (reduce) {
        setVal(target);
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        if (!cancelled) {
          const next = parseFloat((eased * target).toFixed(decimals));
          setVal(next);
          if (p < 1) raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(node);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [target, duration, decimals, threshold]);

  return { ref, value: val };
}
