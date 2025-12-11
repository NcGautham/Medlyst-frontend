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
    icon: <MagnifyingGlassIcon className="w-7 h-7 text-secondary" />,
    title: 'Search for a Doctor',
    description: 'Browse our network of specialists. Filter by specialty, location, or rating to find your perfect match.',
  },
  {
    icon: <CalendarDaysIcon className="w-7 h-7 text-secondary" />,
    title: 'Choose Your Time',
    description: 'View real-time availability and pick a slot that fits your schedule. Morning, afternoon, or evening.',
  },
  {
    icon: <CheckBadgeIcon className="w-7 h-7 text-secondary" />,
    title: 'Book an Appointment',
    description: 'Confirm your booking in seconds. Receive instant confirmation and reminders for your visit.',
  },
];

const Home = () => {
  const { doctors, isLoading } = useDoctors();

  const topDoctors = doctors.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Health Info Section */}
      <section className="py-20 bg-background">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-soft"
            >
              <div className="inline-flex items-center gap-2 text-secondary mb-4">
                <HeartIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Healthcare Made Simple</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Health, Your Schedule — Book with Ease
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                No more waiting on hold or navigating complex phone trees.
                With Medlyst, you can find, compare, and book appointments with
                top-rated doctors in just a few clicks.
              </p>
              <Button size="lg" asChild>
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
                className="rounded-3xl shadow-lift w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <CheckBadgeIcon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Verified Doctors</div>
                    <div className="text-xs text-muted-foreground">All credentials checked</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Steps Section */}
      <section id="features" className="py-20 bg-muted">
        <Container size="lg">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Simple Steps to Book
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-2xl mx-auto"
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

      {/* Top Doctors Section */}
      <section className="py-20 bg-background">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              >
                Meet Our Top-Rated Doctors
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-muted-foreground max-w-xl"
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
              <Button variant="outline" size="lg" asChild>
                <Link to="/doctors">View All Doctors</Link>
              </Button>
            </motion.div>
          </div>

          <DoctorGrid doctors={topDoctors} />
        </Container>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-20 bg-cream">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Take Control of Your Health Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of patients who have discovered a better way to book healthcare.
              Your perfect doctor is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" asChild>
                <Link to="/doctors">Book an Appointment</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
};

export default Home;
