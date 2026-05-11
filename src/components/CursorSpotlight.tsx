import { useEffect, useRef } from 'react';

/**
 * Ambient cursor-tracking radial glow. Desktop pointer devices only.
 * Uses `mix-blend-mode: screen` so it brightens whatever is beneath without
 * obscuring text or controls. Eases toward the cursor with a smoothing factor.
 */
export const CursorSpotlight = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const SIZE = 520;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;
    let lastSeen = performance.now();

    const setVisible = (visible: boolean) => {
      el.style.opacity = visible ? '0.55' : '0';
    };

    const tick = () => {
      raf = 0;
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;
      el.style.transform = `translate3d(${currentX - SIZE / 2}px, ${currentY - SIZE / 2}px, 0)`;
      if (
        Math.abs(targetX - currentX) > 0.4 ||
        Math.abs(targetY - currentY) > 0.4
      ) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastSeen = performance.now();
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => setVisible(false);

    // Hide if the cursor sits idle for a while
    const idleInterval = window.setInterval(() => {
      if (performance.now() - lastSeen > 1800) setVisible(false);
    }, 600);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.clearInterval(idleInterval);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-[520px] w-[520px] rounded-full md:block"
      style={{
        background:
          'radial-gradient(circle at center, rgba(123, 204, 132, 0.20) 0%, rgba(52, 103, 57, 0.10) 35%, transparent 65%)',
        mixBlendMode: 'screen',
        filter: 'blur(36px)',
        opacity: 0,
        transition: 'opacity 0.45s ease',
        transform: 'translate3d(-9999px, -9999px, 0)',
        willChange: 'transform, opacity',
      }}
    />
  );
};

export default CursorSpotlight;
