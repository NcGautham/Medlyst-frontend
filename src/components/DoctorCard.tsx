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
      className="group glow-ring card-sheen relative flex h-full flex-col overflow-hidden rounded-2xl glass-card card-accent-line tap-raise transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_18px_50px_rgba(0,0,0,0.55),0_0_28px_rgba(52,103,57,0.18)]"
    >
      <div className="relative z-[1] flex h-full flex-col p-4 sm:p-6">
        {/* Doctor info row */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="relative flex-shrink-0 overflow-hidden rounded-2xl">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="h-16 w-16 rounded-2xl border border-[#346739]/20 bg-[#061509]/55 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08] sm:h-20 sm:w-20"
              loading="lazy"
              decoding="async"
            />
            <span className="pointer-events-none absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[hsl(150,55%,3%)] bg-[#7bcc84] shadow-glow-sm sm:h-4 sm:w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-white/90 transition-colors duration-200 group-hover:text-[#b0e0b6]">
              {doctor.name}
            </h3>
            <p className="mt-0.5 text-sm text-[#7bcc84]/85">{doctor.specialty}</p>
            <div className="mt-2 flex items-center gap-1">
              <StarIcon className="h-4 w-4 flex-shrink-0 text-amber-400" />
              <span className="text-sm font-semibold text-white/85">
                {doctor.rating}
              </span>
              <span className="text-xs text-white/40">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Hospital */}
        <div className="mt-3.5 flex items-center gap-2 text-sm text-white/45 sm:mt-4">
          <MapPinIcon className="h-4 w-4 flex-shrink-0 text-[#7bcc84]/80" />
          <span className="truncate">{doctor.hospital}</span>
        </div>

        {/* Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {doctor.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#346739]/20 bg-[#346739]/12 px-2.5 py-0.5 text-[11px] font-medium text-[#98d4a0]/85"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* spacer to push CTAs to the bottom */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="mt-4 border-t border-white/5" />

        {/* Action buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="min-h-11 rounded-xl border-[#346739]/25 bg-transparent text-white/65 hover:border-[#5aad68]/45 hover:bg-[#346739]/12 hover:text-[#b0e0b6] sm:min-h-10"
            asChild
          >
            <Link to={`/doctor/${doctor.id}`}>Profile</Link>
          </Button>
          <Button
            size="sm"
            className="min-h-11 rounded-xl border border-[#5aad68]/45 bg-[#346739]/35 text-[#dff6e2] shadow-glow-sm hover:border-[#5aad68]/65 hover:bg-[#3f8548] hover:text-white sm:min-h-10"
            onClick={() => openBookingModal(doctor)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
