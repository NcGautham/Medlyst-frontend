import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge-custom';
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useDoctors } from '@/context/DoctorsContext';

export const Hero = () => {
  const { doctors } = useDoctors();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (doctors.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(doctors.length, 5)); // Cycle through first 5
    }, 3000);

    return () => clearInterval(interval);
  }, [doctors]);

  const currentDoctor = doctors.length > 0 ? doctors[currentIndex] : null;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(160, 60%, 12%) 0%, hsl(155, 50%, 25%) 100%)' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Container size="lg" className="relative pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge variant="accent" className="mb-6 bg-accent/20 text-accent border-0">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Trusted by 50,000+ patients
              </span>
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Book Your Doctor's Appointment{' '}
              <span className="text-accent">Effortlessly</span>
            </h1>

            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
              Connect with top-rated specialists in minutes. Browse profiles, check availability,
              and secure your appointment with just a few clicks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/doctors">Book an Appointment</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-primary-foreground/70">Specialized Doctors</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent">50k+</div>
                <div className="text-sm text-primary-foreground/70">Happy Patients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent">4.9</div>
                <div className="text-sm text-primary-foreground/70">Average Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Doctor Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Doctor Card */}
            <div className="relative z-10">
              <div className="bg-card rounded-3xl shadow-lift p-6 max-w-md mx-auto min-h-[220px]">
                {currentDoctor ? (
                  <motion.div
                    key={currentDoctor.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={currentDoctor.photoUrl}
                        alt={currentDoctor.name}
                        className="w-24 h-24 rounded-2xl object-cover bg-muted"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{currentDoctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{currentDoctor.specialty}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">{currentDoctor.rating} ({currentDoctor.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {currentDoctor.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="muted" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full mt-4"
                      size="lg"
                      asChild
                    >
                      <Link to={`/doctor/${currentDoctor.id}`}>
                        Book Appointment
                      </Link>
                    </Button>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-[200px]">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground">Doctors</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Analytics Card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
