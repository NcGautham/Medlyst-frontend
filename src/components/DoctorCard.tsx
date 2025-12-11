import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge-custom';
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-card rounded-2xl shadow-soft hover:shadow-lift transition-shadow duration-300 overflow-hidden group h-full flex flex-col"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4">
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border border-border bg-muted"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <div className="flex items-center gap-1 mt-2">
              <StarIcon className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
              <span className="text-sm text-muted-foreground">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{doctor.hospital}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {doctor.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 mt-auto pt-6">
          <Button
            variant="outline"
            className="flex-1" // Removed size="sm" for better touch target, but might need checking. Let's keep size="sm" but just shorten text.
            size="sm"
            asChild
          >
            <Link to={`/doctor/${doctor.id}`}>Profile</Link>
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => openBookingModal(doctor)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
