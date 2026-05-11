import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { useDoctors } from '@/context/DoctorsContext';
import {
  formatDate,
  formatTime,
  getDayName,
  isToday,
  isTomorrow,
} from '@/utils/dateUtils';
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Reveal } from '@/components/Reveal';

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { openBookingModal } = useBooking();
  const { doctors, isLoading } = useDoctors();

  const doctor = doctors.find((d) => d.id === id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
        <Container size="lg">
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#346739]/40 border-t-[#7bcc84]" />
            <p className="mt-4 text-sm text-white/55">Loading doctor profile...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
        <Container size="lg">
          <div className="glass-card mx-auto max-w-md rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white">Doctor Not Found</h1>
            <p className="mt-3 text-sm text-white/55">
              The doctor you're looking for doesn't exist or has been removed.
            </p>
            <Button
              asChild
              className="mt-6 rounded-xl bg-[#346739] hover:bg-[#3f8548]"
            >
              <Link to="/doctors">Back to Doctors</Link>
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pb-28 pt-24 sm:pb-16 sm:pt-28">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-lg absolute -top-32 -left-32 h-[400px] w-[400px] opacity-55" />
        <div className="orb orb-green-sm absolute top-1/3 right-[-120px] h-[300px] w-[300px] opacity-40" />
      </div>

      <Container size="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Back */}
          <Link
            to="/doctors"
            className="tap-raise mb-5 inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white sm:mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Doctors
          </Link>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Main content */}
            <div className="order-2 space-y-5 sm:space-y-6 lg:order-1 lg:col-span-2">
              {/* Profile header */}
              <Reveal>
                <div className="glass-card card-accent-line rounded-3xl p-5 sm:p-7 md:p-8">
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6 sm:text-left">
                    <div className="relative">
                      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#7bcc84]/40 to-[#346739]/30 blur-md" />
                      <img
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        className="h-28 w-28 rounded-2xl border border-[#346739]/30 object-cover sm:h-32 sm:w-32"
                      />
                      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[hsl(150,55%,3%)] bg-[#7bcc84] shadow-glow-sm" />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="mb-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#346739]/45 bg-[#346739]/20 px-2.5 py-0.5 text-[11px] font-medium text-[#b8e8bf]">
                          <CheckBadgeIcon className="h-3 w-3" />
                          Verified
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/65">
                          {doctor.specialty}
                        </span>
                      </div>
                      <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                        {doctor.name}
                      </h1>
                      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/55 sm:justify-start">
                        <span className="inline-flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-amber-400" />
                          <span className="font-semibold text-white/90">
                            {doctor.rating}
                          </span>
                          <span className="text-white/45">
                            ({doctor.reviewCount} reviews)
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4 text-[#7bcc84]/85" />
                          <span className="truncate">{doctor.hospital}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* About */}
              <Reveal delay={0.05}>
                <div className="glass-card rounded-3xl p-5 sm:p-7 md:p-8">
                  <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                    About
                  </h2>
                  <p className="leading-relaxed text-white/60">{doctor.bio}</p>
                </div>
              </Reveal>

              {/* Experience & Expertise */}
              <Reveal delay={0.1}>
                <div className="glass-card rounded-3xl p-5 sm:p-7 md:p-8">
                  <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
                    Experience &amp; Expertise
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#346739]/30 bg-[#346739]/15">
                        <ClockIcon className="h-5 w-5 text-[#7bcc84]" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {doctor.experience}+ Years
                        </div>
                        <div className="text-sm text-white/45">
                          Professional Experience
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#346739]/30 bg-[#346739]/15">
                        <AcademicCapIcon className="h-5 w-5 text-[#7bcc84]" />
                      </div>
                      <div>
                        <div className="font-medium text-white">Board Certified</div>
                        <div className="text-sm text-white/45">{doctor.specialty}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/55">
                      Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#346739]/25 bg-[#346739]/10 px-3 py-1 text-xs font-medium text-[#98d4a0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar / Booking */}
            <div className="order-1 lg:order-2 lg:col-span-1">
              <Reveal direction="left">
                <div className="glass-card card-accent-line rounded-3xl p-5 sm:p-7 lg:sticky lg:top-28">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Available Slots
                  </h3>

                  <div className="mb-6 space-y-3">
                    {doctor.availableSlots.slice(0, 3).map((slot) => (
                      <div
                        key={slot.date}
                        className="rounded-xl border border-[#346739]/20 bg-[#0a1d11]/60 p-4"
                      >
                        <div className="mb-2 text-sm font-medium text-white/90">
                          {isToday(slot.date)
                            ? 'Today'
                            : isTomorrow(slot.date)
                              ? 'Tomorrow'
                              : `${getDayName(slot.date)}, ${formatDate(slot.date).split(',')[1]}`}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {slot.times.slice(0, 4).map((slotTime) => (
                            <span
                              key={slotTime.time + (slotTime.slotId || '')}
                              className="rounded-md border border-[#346739]/25 bg-[#346739]/12 px-2 py-1 text-[11px] font-medium text-[#b8e8bf]"
                            >
                              {formatTime(slotTime.time)}
                            </span>
                          ))}
                          {slot.times.length > 4 && (
                            <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-white/55">
                              +{slot.times.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop / tablet primary CTA */}
                  <Button
                    size="lg"
                    className="tap-raise hidden min-h-12 w-full rounded-xl bg-[#346739] font-semibold text-white shadow-glow-sm hover:bg-[#3f8548] hover:brightness-110 sm:flex"
                    onClick={() => openBookingModal(doctor)}
                  >
                    Book Appointment
                  </Button>

                  <p className="mt-4 text-center text-xs text-white/40">
                    Free cancellation up to 24 hours before appointment
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Mobile sticky book CTA — above bottom nav */}
      <div
        className="fixed inset-x-0 z-30 sm:hidden"
        style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="mx-3">
          <Button
            size="lg"
            onClick={() => openBookingModal(doctor)}
            className="tap-raise w-full min-h-12 rounded-xl bg-[#346739] font-semibold text-white shadow-glow-md hover:bg-[#3f8548]"
          >
            Book Appointment with {doctor.name.split(' ')[1] ?? doctor.name}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default DoctorProfile;
