import { motion } from 'framer-motion';
import { DoctorCard } from './DoctorCard';
import { Doctor } from '@/data/doctors';

interface DoctorGridProps {
  doctors: Doctor[];
  loading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const DoctorGrid = ({ doctors, loading = false }: DoctorGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="glass-card relative overflow-hidden rounded-2xl p-5"
          >
            <div className="shimmer-dark absolute inset-0 opacity-60" aria-hidden />
            <div className="relative flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#346739]/15 sm:h-20 sm:w-20" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 rounded bg-[#346739]/15" />
                <div className="h-3 w-1/2 rounded bg-[#346739]/12" />
                <div className="h-3 w-1/3 rounded bg-[#346739]/10" />
              </div>
            </div>
            <div className="relative mt-4 h-3 w-2/3 rounded bg-[#346739]/12" />
            <div className="relative mt-4 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-[#346739]/10" />
              <div className="h-6 w-16 rounded-full bg-[#346739]/10" />
            </div>
            <div className="relative mt-6 flex gap-2">
              <div className="h-9 flex-1 rounded-lg bg-[#346739]/12" />
              <div className="h-9 flex-1 rounded-lg bg-[#346739]/15" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="glass-card mx-auto max-w-md rounded-2xl px-6 py-10 text-center">
        <p className="text-base font-medium text-white/85">
          No doctors found
        </p>
        <p className="mt-2 text-sm text-white/55">
          Try clearing some filters or searching for a different specialty.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      {doctors.map((doctor) => (
        <motion.div key={doctor.id} variants={itemVariants}>
          <DoctorCard doctor={doctor} />
        </motion.div>
      ))}
    </motion.div>
  );
};
