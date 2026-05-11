import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import SplitText from '@/components/SplitText';
import { Magnetic } from '@/components/Magnetic';
import { StatCounter } from '@/components/StatCounter';
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useDoctors } from '@/context/DoctorsContext';
import type { Doctor } from '@/data/doctors';

function HeroDoctorPreviewBody({ doctor }: { doctor: Doctor }) {
  // Prefer the doctor's specialty as the single tag pill (matches "Cardiologist" in
  // the reference). Fall back to the first tag if no specialty is set.
  const primaryTag = doctor.specialty || doctor.tags?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="relative shrink-0">
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="h-20 w-20 rounded-2xl border border-[#346739]/25 bg-[#061509]/55 object-cover sm:h-24 sm:w-24"
          />
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[hsl(150,55%,3%)] bg-[#7bcc84] shadow-glow-sm" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {doctor.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#7bcc84] sm:text-base">
            {doctor.specialty}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 fill-current text-amber-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1.5 text-xs text-white/55 tabular-nums sm:text-sm">
              {doctor.rating} ({doctor.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {primaryTag && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#5aad68]/55 bg-[#346739]/20 px-3 py-1 text-xs font-medium text-[#b8e8bf] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {primaryTag}
          </span>
        </div>
      )}

      <Button
        className="card-sheen mt-5 h-12 w-full rounded-xl border border-[#5aad68]/50 bg-[#346739]/22 text-base font-semibold text-[#cdf2d2] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_20px_rgba(52,103,57,0.18)] transition-all duration-300 hover:border-[#7bcc84]/65 hover:bg-[#346739]/35 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_28px_rgba(52,103,57,0.32)]"
        asChild
      >
        <Link to={`/doctor/${doctor.id}`}>Book Appointment</Link>
      </Button>
    </motion.div>
  );
}

export const Hero = () => {
  const { doctors } = useDoctors();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (doctors.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(doctors.length, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, [doctors]);

  // Scroll-driven parallax for orbs / spotlight
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const spotlightY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

  const currentDoctor = doctors.length > 0 ? doctors[currentIndex] : null;

  const previewInner = (
    <AnimatePresence mode="wait">
      {currentDoctor ? (
        <HeroDoctorPreviewBody key={currentDoctor.id} doctor={currentDoctor} />
      ) : (
        <div className="flex h-[230px] items-center justify-center sm:h-[250px]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#346739]/50 border-t-[#7bcc84]" />
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] min-h-screen items-center overflow-x-hidden bg-[hsl(150,55%,3%)]"
    >
      {/* Background orbs + hero spotlight (parallax on scroll) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: spotlightY }}
          className="absolute -left-[20%] -top-[30%] h-[min(80vh,900px)] w-[min(120vw,1040px)] rounded-full opacity-70 blur-3xl sm:-left-[25%] sm:-top-[35%]"
          aria-hidden
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(ellipse 52% 52% at 50% 50%, rgba(52, 103, 57, 0.42) 0%, rgba(52, 103, 57, 0.12) 42%, transparent 68%)',
            }}
          />
        </motion.div>
        <motion.div style={{ y: orbY }} className="absolute inset-0">
          <div className="orb orb-green-lg w-[420px] h-[420px] top-[-80px] left-[-120px] opacity-55 sm:w-[600px] sm:h-[600px] sm:top-[-100px] sm:left-[-150px] sm:opacity-60" />
          <div className="orb orb-green-sm w-[280px] h-[280px] bottom-[-40px] right-[-80px] opacity-50 sm:w-[400px] sm:h-[400px] sm:bottom-[-50px] sm:right-[-100px]" />
          <div className="orb orb-green-lg hidden w-[300px] h-[300px] top-[40%] left-[55%] opacity-30 sm:block" />
        </motion.div>
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.045] sm:opacity-[0.055]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(123,204,132,1) 1px, transparent 1px), linear-gradient(90deg, rgba(123,204,132,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <Container size="lg" className="relative z-10 pb-10 pt-24 sm:pb-24 sm:pt-32">
        <motion.div
          style={{ y: contentY }}
          className="grid items-center gap-9 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-x-14 lg:gap-y-12"
        >

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Pill badge */}
            <div className="mx-auto mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#346739]/45 bg-[#346739]/22 px-3 py-1.5 text-[12px] font-medium text-[#b8e8bf] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:mb-7 sm:px-4 sm:text-sm lg:mx-0">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#7bcc84] shadow-[0_0_10px_rgba(123,204,132,0.65)]" />
              Trusted by 50,000+ patients
            </div>

            <h1 className="mb-4 text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">
                <SplitText
                  tag="span"
                  text="Book Your Doctor's "
                  className="inline align-baseline text-white"
                  delay={28}
                  duration={0.55}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 36 }}
                  to={{ opacity: 1, y: 0 }}
                  immediate
                  textAlign="inherit"
                />
                <SplitText
                  tag="span"
                  text="Appointment"
                  className="hero-accent-word inline align-baseline text-gradient"
                  delay={22}
                  duration={0.5}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  immediate
                  textAlign="inherit"
                />
              </span>
              <span className="mt-0 block">
                <SplitText
                  tag="span"
                  text="Effortlessly"
                  className="inline align-baseline text-white"
                  delay={28}
                  duration={0.55}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 36 }}
                  to={{ opacity: 1, y: 0 }}
                  immediate
                  textAlign="inherit"
                />
              </span>
            </h1>

            <p className="mx-auto mb-7 max-w-md text-[15px] leading-relaxed text-white/60 sm:mb-10 sm:max-w-xl sm:text-lg lg:mx-0">
              Connect with top-rated specialists in minutes. Browse profiles, check
              availability, and secure your appointment with just a few clicks.
            </p>

            <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:max-w-none lg:justify-start">
              <Magnetic className="block w-full sm:inline-block sm:w-auto" strength={12}>
                <Button
                  size="xl"
                  className="card-sheen tap-raise w-full min-h-12 rounded-xl bg-[#346739] font-semibold text-white shadow-glow-md transition-all duration-300 hover:bg-[#3f8548] hover:shadow-glow-lg hover:brightness-110 active:scale-[0.99] sm:min-h-14 sm:w-auto sm:px-10"
                  asChild
                >
                  <Link to="/doctors">Find a Doctor</Link>
                </Button>
              </Magnetic>
              <Magnetic className="block w-full sm:inline-block sm:w-auto" strength={10}>
                <Button
                  size="xl"
                  className="tap-raise w-full min-h-12 rounded-xl border-2 border-[#346739]/55 bg-transparent text-[#b8e8bf] transition-all hover:bg-[#346739]/12 hover:border-[#5aad68]/70 sm:min-h-14 sm:w-auto sm:px-10"
                  asChild
                >
                  <Link to="/doctors">Book an Appointment</Link>
                </Button>
              </Magnetic>
            </div>

            {/* Stats — compact glass row on mobile, inline on desktop, animated count-up */}
            <div className="mt-8 grid grid-cols-3 gap-2.5 rounded-2xl border border-[#346739]/22 bg-[#0a1d11]/55 p-3 backdrop-blur-md sm:mt-12 sm:gap-x-8 sm:gap-y-4 sm:border-none sm:bg-transparent sm:p-0 sm:backdrop-blur-0 lg:justify-start">
              {[
                { value: '500+', label: 'Doctors' },
                { value: '50K+', label: 'Patients' },
                { value: '4.9', label: 'Avg Rating' },
              ].map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <StatCounter
                    value={s.value}
                    className="block text-xl font-bold text-gradient tabular-nums sm:text-3xl"
                  />
                  <div className="mt-0.5 text-[11px] text-white/45 sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Doctor preview — one panel for mobile + desktop (floating widgets lg+) */}
          <p className="mx-auto -mb-1 block max-w-md text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 sm:text-xs lg:hidden">
            Featured doctors
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="relative z-10">
              <div className="group glass-panel glow-ring-static relative mx-auto min-h-[260px] max-w-md rounded-3xl border-[#346739]/25 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_40px_rgba(52,103,57,0.14)] transition-all duration-500 hover:shadow-[0_12px_55px_rgba(0,0,0,0.55),0_0_70px_rgba(52,103,57,0.22)] sm:min-h-[280px] sm:p-7 lg:max-w-md">
                <div className="relative z-[1]">{previewInner}</div>
              </div>
            </div>

            {/* Floating stats — overlap top-right corner of main card */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel glow-ring-static absolute -right-4 -top-4 z-20 hidden items-center gap-3 whitespace-nowrap rounded-2xl border-[#346739]/25 px-4 py-3 shadow-lift lg:inline-flex"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#346739]/30 bg-[#346739]/18">
                <UserGroupIcon className="h-5 w-5 text-[#7bcc84]" />
              </div>
              <div className="leading-tight">
                <StatCounter value="500+" className="block text-lg font-bold text-white tabular-nums" />
                <div className="text-xs text-white/50">Doctors</div>
              </div>
            </motion.div>

            {/* Floating stats — Satisfaction (desktop only) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="glass-panel glow-ring-static absolute -bottom-4 -left-4 z-20 hidden items-center gap-3 whitespace-nowrap rounded-2xl border-[#346739]/25 px-4 py-3 shadow-lift lg:inline-flex"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#346739]/30 bg-[#346739]/18">
                <ChartBarIcon className="h-5 w-5 text-[#7bcc84]" />
              </div>
              <div className="leading-tight">
                <StatCounter value="98%" className="block text-lg font-bold text-white tabular-nums" />
                <div className="text-xs text-white/50">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
};
