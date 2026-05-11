import { Link } from 'react-router-dom';
import { Hero } from '@/components/Hero';
import { DoctorGrid } from '@/components/DoctorGrid';
import { StepsCard } from '@/components/StepsCard';
import { Testimonials } from '@/components/Testimonials';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useDoctors } from '@/context/DoctorsContext';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Magnetic } from '@/components/Magnetic';
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: <MagnifyingGlassIcon className="w-7 h-7 text-[#7bcc84]" />,
    title: 'Search for a Doctor',
    description: 'Browse our network of specialists. Filter by specialty, location, or rating to find your perfect match.',
  },
  {
    icon: <CalendarDaysIcon className="w-7 h-7 text-[#7bcc84]" />,
    title: 'Choose Your Time',
    description: 'View real-time availability and pick a slot that fits your schedule. Morning, afternoon, or evening.',
  },
  {
    icon: <CheckBadgeIcon className="w-7 h-7 text-[#7bcc84]" />,
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
      <section className="relative bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal direction="right">
              <div className="glass-card card-accent-line rounded-3xl p-5 sm:p-8 md:p-10">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#346739]/30 bg-[#346739]/15 px-3 py-1 text-[#b8e8bf]">
                  <HeartIcon className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Healthcare Made Simple
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                  Your Health, Your Schedule —{' '}
                  <span className="text-gradient">Book with Ease</span>
                </h2>
                <p className="mb-7 text-sm leading-relaxed text-white/55 sm:text-base">
                  No more waiting on hold or navigating complex phone trees.
                  Find, compare, and book appointments with top-rated doctors in just a few clicks.
                </p>
                <Button
                  size="lg"
                  className="tap-raise w-full min-h-12 rounded-xl bg-[#346739] font-semibold text-white shadow-glow-sm transition-transform hover:bg-[#3f8548] hover:brightness-110 active:scale-[0.99] sm:w-auto sm:px-7"
                  asChild
                >
                  <Link to="/doctors">Find a Doctor</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-[#346739]/25 via-transparent to-[#7bcc84]/12 blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&h=700&fit=crop"
                  alt="Doctor consulting with patient"
                  className="aspect-[5/4] w-full rounded-3xl border border-[#346739]/15 object-cover shadow-lift"
                  loading="lazy"
                />
                {/* Floating verify badge */}
                <div className="glass-panel relative mt-4 rounded-2xl border-[#346739]/25 p-3.5 sm:mt-5 lg:absolute lg:-bottom-5 lg:-left-5 lg:mt-0 lg:max-w-[min(100%,22rem)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#5aad68]/55 bg-[#346739]/25 shadow-glow-sm">
                      <CheckBadgeIcon className="h-5 w-5 text-[#7bcc84]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">Verified Doctors</div>
                      <div className="text-xs text-white/45">All credentials checked</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section id="features" className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <Reveal className="mb-10 text-center sm:mb-12">
            <div className="eyebrow-pill mb-4">
              <span className="dot" /> Simple Process
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Simple <span className="text-gradient">Steps to Book</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55 sm:text-base">
              Getting the care you need has never been easier. Follow these three simple steps.
            </p>
          </Reveal>

          <RevealGroup
            stagger={0.1}
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
          >
            {steps.map((step, index) => (
              <RevealItem key={step.title}>
                <StepsCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  step={index + 1}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ── Top Doctors ── */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <Reveal className="mb-9 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <div className="eyebrow-pill mb-4">
                <span className="dot" /> Top Rated
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Meet our <span className="text-gradient">top-rated</span> doctors
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/55 sm:text-base">
                Highly-rated specialists trusted by thousands of patients.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="tap-raise min-h-11 w-full shrink-0 rounded-xl border-[#346739]/40 bg-transparent text-[#b8e8bf] hover:border-[#5aad68]/55 hover:bg-[#346739]/12 md:w-auto"
              asChild
            >
              <Link to="/doctors">View All Doctors</Link>
            </Button>
          </Reveal>

          <DoctorGrid doctors={topDoctors} loading={isLoading} />
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA Banner ── */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg">
          <Reveal>
            <div className="glass-panel card-accent-line relative mx-auto max-w-3xl overflow-hidden rounded-3xl px-5 py-9 text-center sm:px-9 sm:py-12 md:p-14 lg:p-16">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#346739]/12 via-transparent to-[#7bcc84]/8" />
              <div
                aria-hidden
                className="orb orb-green-lg absolute -left-12 -top-16 h-72 w-72 opacity-50"
              />
              <div className="relative z-10">
                <div className="eyebrow-pill mx-auto mb-5">
                  <span className="dot" /> Start Today
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Take control of your{' '}
                  <span className="text-gradient">health today</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Join thousands of patients who have discovered a better way to book
                  healthcare. Your perfect doctor is just a click away.
                </p>
                <div className="mx-auto mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
                  <Magnetic className="block w-full sm:inline-block sm:w-auto" strength={12}>
                    <Button
                      size="xl"
                      className="card-sheen tap-raise min-h-12 w-full rounded-xl bg-[#346739] font-semibold text-white shadow-glow-md transition-all duration-300 hover:bg-[#3f8548] hover:shadow-glow-lg hover:brightness-110 active:scale-[0.99] sm:min-h-14 sm:w-auto sm:px-10"
                      asChild
                    >
                      <Link to="/doctors">Book an Appointment</Link>
                    </Button>
                  </Magnetic>
                  <Magnetic className="block w-full sm:inline-block sm:w-auto" strength={10}>
                    <Button
                      size="xl"
                      className="tap-raise min-h-12 w-full rounded-xl border border-[#346739]/45 bg-transparent text-[#b8e8bf] transition-all hover:border-[#5aad68]/55 hover:bg-[#346739]/12 sm:min-h-14 sm:w-auto sm:px-10"
                      asChild
                    >
                      <Link to="/doctors">Find a Doctor</Link>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
};

export default Home;
