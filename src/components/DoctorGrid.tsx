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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const DoctorGrid = ({ doctors, loading = false }: DoctorGridProps) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-2xl shadow-soft p-6 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
            </div>
            <div className="mt-4 h-3 bg-muted rounded w-2/3" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-muted rounded-full w-16" />
              <div className="h-6 bg-muted rounded-full w-16" />
            </div>
            <div className="flex gap-2 mt-6">
              <div className="h-9 bg-muted rounded flex-1" />
              <div className="h-9 bg-muted rounded flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {doctors.map((doctor) => (
        <motion.div key={doctor.id} variants={itemVariants}>
          <DoctorCard doctor={doctor} />
        </motion.div>
      ))}
    </motion.div>
  );
};
