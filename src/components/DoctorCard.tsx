import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { Doctor } from '@/data/doctors';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const { openBookingModal } = useBooking();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="glass-card card-accent-line rounded-2xl overflow-hidden h-full flex flex-col group"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Doctor info row */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border border-emerald-500/20 bg-emerald-950/40"
              loading="lazy"
            />
            {/* Green online dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[hsl(150,55%,3%)] shadow-glow-sm" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white/90 truncate group-hover:text-emerald-300 transition-colors duration-200">
              {doctor.name}
            </h3>
            <p className="text-sm text-emerald-400/80 mt-0.5">{doctor.specialty}</p>
            <div className="flex items-center gap-1 mt-2">
              <StarIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-white/80">{doctor.rating}</span>
              <span className="text-xs text-white/40">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Hospital */}
        <div className="flex items-center gap-2 mt-4 text-sm text-white/40">
          <MapPinIcon className="w-4 h-4 flex-shrink-0 text-emerald-500/60" />
          <span className="truncate">{doctor.hospital}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {doctor.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300/80 border border-emerald-500/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-white/5" />

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-emerald-500/20 text-white/60 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/8 bg-transparent"
            asChild
          >
            <Link to={`/doctor/${doctor.id}`}>Profile</Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 hover:text-white hover:border-emerald-400/50 shadow-glow-sm"
            onClick={() => openBookingModal(doctor)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
