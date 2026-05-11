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
    icon: <MagnifyingGlassIcon className="w-7 h-7 text-emerald-400" />,
    title: 'Search for a Doctor',
    description: 'Browse our network of specialists. Filter by specialty, location, or rating to find your perfect match.',
  },
  {
    icon: <CalendarDaysIcon className="w-7 h-7 text-emerald-400" />,
    title: 'Choose Your Time',
    description: 'View real-time availability and pick a slot that fits your schedule. Morning, afternoon, or evening.',
  },
  {
    icon: <CheckBadgeIcon className="w-7 h-7 text-emerald-400" />,
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
      <section className="py-20 bg-background">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card card-accent-line rounded-3xl p-8 md:p-12"
            >
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-5">
                <HeartIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Healthcare Made Simple</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Health, Your Schedule —{' '}
                <span className="text-gradient">Book with Ease</span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                No more waiting on hold or navigating complex phone trees.
                With Medlyst, you can find, compare, and book appointments with
                top-rated doctors in just a few clicks.
              </p>
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-glow-sm hover:brightness-110 active:scale-[0.99] transition-transform"
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
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=500&fit=crop"
                alt="Doctor consulting with patient"
                className="rounded-3xl shadow-lift w-full h-auto border border-emerald-500/10"
              />
              {/* Floating overlay card */}
              <div className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                    <CheckBadgeIcon className="w-6 h-6 text-emerald-400" />
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
      <section id="features" className="py-20 bg-background">
        <Container size="lg">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/25 text-emerald-300 text-sm font-medium mb-5"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              Simple Process
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
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

          <div className="grid md:grid-cols-3 gap-6">
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
      <section className="py-20 bg-background">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/25 text-emerald-300 text-sm font-medium mb-5"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                Top Rated
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
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
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/50 bg-transparent"
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
      <section className="py-20 bg-background">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-panel card-accent-line rounded-3xl p-12 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-800/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Take Control of Your{' '}
                <span className="text-gradient">Health Today</span>
              </h2>
              <p className="text-white/45 mb-10 leading-relaxed">
                Join thousands of patients who have discovered a better way to book
                healthcare. Your perfect doctor is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                  asChild
                >
                  <Link to="/doctors">Book an Appointment</Link>
                </Button>
                <Button
                  size="xl"
                  className="bg-transparent border border-emerald-500/35 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/55 transition-all duration-300"
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
