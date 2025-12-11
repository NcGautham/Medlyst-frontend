import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge-custom';
import { useBooking } from '@/context/BookingContext';
import { useDoctors } from '@/context/DoctorsContext';
import { formatDate, formatTime, getDayName, isToday, isTomorrow } from '@/utils/dateUtils';
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { openBookingModal } = useBooking();
  const { doctors, isLoading } = useDoctors();

  const doctor = doctors.find(d => d.id === id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-muted pt-24 pb-16">
        <Container>
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading doctor profile...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-muted pt-24 pb-16">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Doctor Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The doctor you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/doctors">Back to Doctors</Link>
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted pt-24 pb-16">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Doctors
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-2xl object-cover mx-auto sm:mx-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-2">
                      <Badge variant="success">
                        <CheckBadgeIcon className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                      <Badge variant="muted">{doctor.specialty}</Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {doctor.name}
                    </h1>
                    <div className="flex items-center gap-4 justify-center sm:justify-start text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 text-amber-400" />
                        <span className="font-medium text-foreground">{doctor.rating}</span>
                        <span>({doctor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start text-muted-foreground">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{doctor.hospital}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Experience & Expertise */}
              <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Experience & Expertise
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{doctor.experience}+ Years</div>
                      <div className="text-sm text-muted-foreground">Professional Experience</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <AcademicCapIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Board Certified</div>
                      <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-foreground mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.tags.map((tag) => (
                      <Badge key={tag} variant="muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-soft p-6 sticky top-28">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Available Slots
                </h3>

                <div className="space-y-4 mb-6">
                  {doctor.availableSlots.slice(0, 5).map((slot) => (
                    <div key={slot.date} className="border border-border rounded-xl p-4">
                      <div className="font-medium text-foreground mb-2">
                        {isToday(slot.date)
                          ? 'Today'
                          : isTomorrow(slot.date)
                            ? 'Tomorrow'
                            : `${getDayName(slot.date)}, ${formatDate(slot.date).split(',')[1]}`}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {slot.times.slice(0, 4).map((slotTime) => (
                          <Badge key={slotTime.time + (slotTime.slotId || '')} variant="outline" className="text-xs">
                            {formatTime(slotTime.time)}
                          </Badge>
                        ))}
                        {slot.times.length > 4 && (
                          <Badge variant="muted" className="text-xs">
                            +{slot.times.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => openBookingModal(doctor)}
                >
                  Book Appointment
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free cancellation up to 24 hours before appointment
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
};

export default DoctorProfile;
