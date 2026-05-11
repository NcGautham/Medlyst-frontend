import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  className?: string;
}

export const StepsCard = ({
  icon,
  title,
  description,
  step,
  className,
}: StepsCardProps) => {
  return (
    <motion.div
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl glass-card card-accent-line glow-ring card-sheen p-5 transition-all duration-300 tap-raise sm:p-6 md:hover:-translate-y-1',
        className,
      )}
    >
      {/* Big watermark numeral */}
      <div
        className="absolute -right-2 -top-1 select-none text-[5rem] font-extrabold leading-none text-white/[0.045] transition-all duration-300 group-hover:scale-110 group-hover:text-[#7bcc84]/20 sm:text-[5.5rem]"
        aria-hidden
      >
        {step.toString().padStart(2, '0')}
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#346739]/30 bg-[#346739]/15 transition-all duration-300 group-hover:scale-105 group-hover:border-[#5aad68]/60 group-hover:bg-[#346739]/25 sm:h-14 sm:w-14">
          {icon}
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-white transition-colors group-hover:text-[#dff6e2] sm:text-lg">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/55">{description}</p>
      </div>
    </motion.div>
  );
};
