import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { DoctorGrid } from '@/components/DoctorGrid';
import { StepsCard } from '@/components/StepsCard';
import { Testimonials } from '@/components/Testimonials';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useDoctors } from '@/context/DoctorsContext';
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: <MagnifyingGlassIcon className="w-7 h-7 text-forest-light" />,
    title: 'Search for a Doctor',
    description: 'Browse our network of specialists. Filter by specialty, location, or rating to find your perfect match.',
  },
  {
    icon: <CalendarDaysIcon className="w-7 h-7 text-forest-light" />,
    title: 'Choose Your Time',
    description: 'View real-time availability and pick a slot that fits your schedule. Morning, afternoon, or evening.',
  },
  {
    icon: <CheckBadgeIcon className="w-7 h-7 text-forest-light" />,
    title: 'Book an Appointment',
    description: 'Confirm your booking in seconds. Receive instant confirmation and reminders for your visit.',
  },
];

const Home = () => {
  const { doctors, isLoading } = useDoctors();
  const topDoctors = doctors.slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Health Info ── */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card card-accent-line rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:p-12"
            >
              <div className="inline-flex items-center gap-2 text-forest-light mb-5">
                <HeartIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Healthcare Made Simple</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Your Health, Your Schedule —{' '}
                <span className="text-gradient">Book with Ease</span>
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/50 sm:text-base">
                No more waiting on hold or navigating complex phone trees.
                With Medlyst, you can find, compare, and book appointments with
                top-rated doctors in just a few clicks.
              </p>
              <Button
                size="lg"
                className="w-full min-h-11 bg-forest text-white shadow-glow-sm transition-transform hover:bg-forest-hover hover:brightness-110 active:scale-[0.99] sm:w-auto"
                asChild
              >
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative mt-6 lg:mt-0"
            >
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=500&fit=crop"
                alt="Doctor consulting with patient"
                className="h-auto w-full rounded-2xl border border-forest/10 shadow-lift sm:rounded-3xl"
              />
              {/* Overlay: below image on small screens, floated on lg+ */}
              <div className="glass-panel relative mt-4 max-w-full rounded-2xl border border-forest/20 p-4 sm:mt-5 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0 lg:max-w-[min(100%,20rem)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-forest/15 border border-forest/20 flex items-center justify-center">
                    <CheckBadgeIcon className="w-6 h-6 text-forest-light" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Verified Doctors</div>
                    <div className="text-xs text-white/40">All credentials checked</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section id="features" className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-forest/25 text-forest-soft text-sm font-medium mb-5"
            >
              <span className="w-2 h-2 bg-forest-light rounded-full" />
              Simple Process
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
            >
              Simple Steps to Book
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/40 max-w-2xl mx-auto"
            >
              Getting the care you need has never been easier. Follow these three simple steps.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StepsCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  step={index + 1}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Top Doctors ── */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-forest/25 text-forest-soft text-sm font-medium mb-5"
              >
                <span className="w-2 h-2 bg-forest-light rounded-full" />
                Top Rated
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
              >
                Meet Our Top-Rated Doctors
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/40 max-w-xl"
              >
                Discover highly-rated specialists trusted by thousands of patients.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full min-h-11 shrink-0 border-forest/30 bg-transparent text-forest-soft hover:border-forest-light/50 hover:bg-forest/10 md:w-auto"
                asChild
              >
                <Link to="/doctors">View All Doctors</Link>
              </Button>
            </motion.div>
          </div>

          <DoctorGrid doctors={topDoctors} loading={isLoading} />
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA Banner ── */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-panel card-accent-line relative mx-auto max-w-3xl overflow-hidden rounded-2xl px-5 py-8 text-center sm:rounded-3xl sm:px-8 sm:py-12 md:p-14 lg:p-16"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest/8 via-transparent to-forest-dark/12 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Take Control of Your{' '}
                <span className="text-gradient">Health Today</span>
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/45 sm:mb-10 sm:text-base">
                Join thousands of patients who have discovered a better way to book
                healthcare. Your perfect doctor is just a click away.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  size="xl"
                  className="min-h-12 w-full bg-forest font-semibold text-white shadow-glow-md transition-all duration-300 hover:bg-forest-hover hover:shadow-glow-lg hover:brightness-110 active:scale-[0.99] sm:min-h-14 sm:w-auto sm:px-10"
                  asChild
                >
                  <Link to="/doctors">Book an Appointment</Link>
                </Button>
                <Button
                  size="xl"
                  className="min-h-12 w-full border border-forest/35 bg-transparent text-forest-soft transition-all hover:border-forest-light/55 hover:bg-forest/10 sm:min-h-14 sm:w-auto sm:px-10"
                  asChild
                >
                  <Link to="/doctors">Find a Doctor</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
};

export default Home;
