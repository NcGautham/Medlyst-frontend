import { useCountUp } from '@/hooks/useCountUp';

interface StatCounterProps {
  /** Display value with optional suffix. Examples: "500+", "50K+", "100K+", "4.9", "98%". */
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Renders a stat that animates from 0 → target when scrolled into view.
 * Parses out a leading number (with optional decimal) and treats trailing
 * non-digit chars (e.g. "+", "K+", "%") as a static suffix.
 */
export const StatCounter = ({ value, duration = 1600, className }: StatCounterProps) => {
  const match = /^([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/.exec(value.trim());
  const numStr = match?.[1] ?? '0';
  const suffix = match?.[2] ?? '';
  const target = parseFloat(numStr);
  const decimals = numStr.includes('.')
    ? (numStr.split('.')[1]?.length ?? 1)
    : 0;

  // Always call the hook in the same order — Rules of Hooks.
  const { ref, value: current } = useCountUp<HTMLSpanElement>(target, {
    duration,
    decimals,
  });

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const formatted =
    decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
};

export default StatCounter;
