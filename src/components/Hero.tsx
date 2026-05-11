import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useDoctors } from '@/context/DoctorsContext';
import type { Doctor } from '@/data/doctors';

function HeroDoctorPreviewBody({ doctor }: { doctor: Doctor }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="relative shrink-0">
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="h-20 w-20 rounded-2xl border border-forest/20 bg-forest-dark/45 object-cover sm:h-24 sm:w-24"
          />
          <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[hsl(150,55%,3%)] bg-forest-light sm:h-4 sm:w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white/90">{doctor.name}</h3>
          <p className="mt-0.5 text-sm text-forest-light/80">{doctor.specialty}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-3 w-3 fill-current text-amber-400 sm:h-3.5 sm:w-3.5" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-white/40">
              {doctor.rating} ({doctor.reviewCount})
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {doctor.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-forest/15 bg-forest/10 px-2.5 py-0.5 text-xs text-forest-soft/80"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button
        className="mt-5 w-full border border-forest/30 bg-forest/20 text-forest-soft transition-all hover:bg-forest/30 hover:text-white"
        size="lg"
        asChild
      >
        <Link to={`/doctor/${doctor.id}`}>Book appointment</Link>
      </Button>
    </motion.div>
  );
}

export const Hero = () => {
  const { doctors } = useDoctors();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (doctors.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(doctors.length, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, [doctors]);

  const currentDoctor = doctors.length > 0 ? doctors[currentIndex] : null;

  const previewInner = (
    <AnimatePresence mode="wait">
      {currentDoctor ? (
        <HeroDoctorPreviewBody key={currentDoctor.id} doctor={currentDoctor} />
      ) : (
        <div className="flex h-[200px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest/50 border-t-forest-light" />
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="relative flex min-h-[100dvh] min-h-screen items-center overflow-x-hidden bg-[hsl(150,55%,3%)]">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-green-lg w-[600px] h-[600px] top-[-100px] left-[-150px] opacity-60" />
        <div className="orb orb-green-sm w-[400px] h-[400px] bottom-[-50px] right-[-100px] opacity-50" />
        <div className="orb orb-green-lg w-[300px] h-[300px] top-[40%] left-[55%] opacity-30" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(52,103,57,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(52,103,57,0.22) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container size="lg" className="relative z-10 pb-12 pt-28 sm:pb-20 sm:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Pill badge */}
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-forest/25 bg-white/5 px-3 py-1.5 text-sm font-medium text-forest-soft backdrop-blur-md sm:mb-7 sm:px-4">
              <span className="w-2 h-2 bg-forest-light rounded-full animate-pulse" />
              Trusted by 50,000+ patients
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-[1.15] text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Book Your Doctor's{' '}
              <span className="text-gradient text-glow">Appointment</span>
              <br />
              Effortlessly
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/55 sm:mb-10 sm:text-lg">
              Connect with top-rated specialists in minutes. Browse profiles, check
              availability, and secure your appointment with just a few clicks.
            </p>

            <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:max-w-none lg:justify-start">
              <Button
                size="xl"
                className="w-full min-h-12 bg-forest font-semibold text-white shadow-glow-md transition-all duration-300 hover:bg-forest-hover hover:brightness-110 active:scale-[0.99] sm:min-h-14 sm:w-auto sm:px-10"
                asChild
              >
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
              <Button
                size="xl"
                className="w-full min-h-12 border border-forest/40 bg-transparent text-forest-soft transition-all hover:bg-forest/10 hover:border-forest-light/60 sm:min-h-14 sm:w-auto sm:px-10"
                asChild
              >
                <Link to="/doctors">Book an Appointment</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 sm:mt-14 lg:justify-start">
              {[
                { value: '500+', label: 'Specialized Doctors' },
                { value: '50k+', label: 'Happy Patients' },
                { value: '4.9', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="text-sm text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Doctor preview — one panel for mobile + desktop (floating widgets lg+) */}
          <p className="mx-auto mb-2 hidden max-w-md text-center text-[11px] font-medium uppercase tracking-wider text-white/40 sm:text-xs lg:hidden">
            Featured doctors
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="relative z-10">
              <div className="glass-panel card-accent-line mx-auto min-h-[220px] max-w-md rounded-2xl p-5 sm:min-h-[230px] sm:rounded-3xl sm:p-6 lg:max-w-md">
                {previewInner}
              </div>
            </div>

            {/* Floating stats — Doctors count (desktop only) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel absolute -top-4 -right-4 z-20 hidden rounded-2xl p-4 lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/15 border border-forest/20 flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-forest-light" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">500+</div>
                  <div className="text-xs text-white/40">Doctors</div>
                </div>
              </div>
            </motion.div>

            {/* Floating stats — Satisfaction (desktop only) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="glass-panel absolute -bottom-4 -left-4 z-20 hidden rounded-2xl p-4 lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/15 border border-forest/20 flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-forest-light" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">98%</div>
                  <div className="text-xs text-white/40">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};
