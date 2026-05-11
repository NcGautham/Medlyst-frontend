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
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl glass-card card-accent-line transition-transform duration-200 active:scale-[0.99] md:hover:-translate-y-1 md:hover:shadow-lg"
    >
      <div className="flex h-full flex-col p-5 sm:p-6">
        {/* Doctor info row */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border border-forest/20 bg-forest-dark/45"
              loading="lazy"
            />
            {/* Green online dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-forest-light rounded-full border-2 border-[hsl(150,55%,3%)] shadow-glow-sm" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white/90 truncate group-hover:text-forest-soft transition-colors duration-200">
              {doctor.name}
            </h3>
            <p className="text-sm text-forest-light/80 mt-0.5">{doctor.specialty}</p>
            <div className="flex items-center gap-1 mt-2">
              <StarIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-white/80">{doctor.rating}</span>
              <span className="text-xs text-white/40">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Hospital */}
        <div className="flex items-center gap-2 mt-4 text-sm text-white/40">
          <MapPinIcon className="w-4 h-4 flex-shrink-0 text-forest/60" />
          <span className="truncate">{doctor.hospital}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {doctor.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest-soft/80 border border-forest/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-white/5" />

        {/* Action buttons */}
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="min-h-11 flex-1 border-forest/20 bg-transparent text-white/60 hover:border-forest/40 hover:bg-forest/8 hover:text-forest-soft sm:min-h-9"
            asChild
          >
            <Link to={`/doctor/${doctor.id}`}>Profile</Link>
          </Button>
          <Button
            size="sm"
            className="min-h-11 flex-1 border border-forest/30 bg-forest/20 text-forest-soft shadow-glow-sm hover:border-forest-light/50 hover:bg-forest/30 hover:text-white sm:min-h-9"
            onClick={() => openBookingModal(doctor)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
