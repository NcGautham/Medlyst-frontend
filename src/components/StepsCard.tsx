import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  className?: string;
}

export const StepsCard = ({ icon, title, description, step, className }: StepsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-card rounded-2xl shadow-soft p-6 relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-4 right-4 text-5xl font-bold text-muted/50">
        {step.toString().padStart(2, '0')}
      </div>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
