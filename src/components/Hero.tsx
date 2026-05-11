import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useDoctors } from '@/context/DoctorsContext';

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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(150,55%,3%)]">
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
              'linear-gradient(rgba(74,222,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container size="lg" className="relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/25 text-emerald-300 text-sm font-medium mb-7">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Trusted by 50,000+ patients
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Book Your Doctor's{' '}
              <span className="text-gradient text-glow">Appointment</span>
              <br />
              Effortlessly
            </h1>

            <p className="text-lg text-white/55 mb-10 max-w-xl leading-relaxed">
              Connect with top-rated specialists in minutes. Browse profiles, check
              availability, and secure your appointment with just a few clicks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="xl"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                asChild
              >
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
              <Button
                size="xl"
                className="bg-transparent border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all duration-300"
                asChild
              >
                <Link to="/doctors">Book an Appointment</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-14 justify-center lg:justify-start">
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

          {/* ── Right Content — Floating Glass Cards ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main cycling doctor card */}
            <div className="relative z-10">
              <div className="glass-panel card-accent-line rounded-3xl p-6 max-w-md mx-auto min-h-[230px]">
                <AnimatePresence mode="wait">
                  {currentDoctor ? (
                    <motion.div
                      key={currentDoctor.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={currentDoctor.photoUrl}
                            alt={currentDoctor.name}
                            className="w-24 h-24 rounded-2xl object-cover border border-emerald-500/20 bg-emerald-950/40"
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[hsl(150,55%,3%)]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white/90">{currentDoctor.name}</h3>
                          <p className="text-sm text-emerald-400/80 mt-0.5">{currentDoctor.specialty}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-white/40 ml-1">
                              {currentDoctor.rating} ({currentDoctor.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {currentDoctor.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-300/80 border border-emerald-500/15"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        className="w-full mt-5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 hover:text-white transition-all duration-200"
                        size="lg"
                        asChild
                      >
                        <Link to={`/doctor/${currentDoctor.id}`}>Book Appointment</Link>
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-[200px]">
                      <div className="w-8 h-8 border-2 border-emerald-500/50 border-t-emerald-400 rounded-full animate-spin" />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating stats — Doctors count */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-panel rounded-2xl p-4 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">500+</div>
                  <div className="text-xs text-white/40">Doctors</div>
                </div>
              </div>
            </motion.div>

            {/* Floating stats — Satisfaction */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 glass-panel rounded-2xl p-4 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-emerald-400" />
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
