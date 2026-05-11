import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { StatCounter } from '@/components/StatCounter';

const values = [
  {
    icon: HeartIcon,
    title: 'Patient-Centered Care',
    description:
      'We put patients first, ensuring every interaction is focused on your health and well-being.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Trust & Transparency',
    description:
      'All our doctors are verified professionals. We maintain complete transparency in our processes.',
  },
  {
    icon: UserGroupIcon,
    title: 'Accessible Healthcare',
    description:
      'Breaking down barriers to make quality healthcare accessible to everyone, everywhere.',
  },
  {
    icon: SparklesIcon,
    title: 'Innovation',
    description:
      'Continuously improving our platform to provide the best possible booking experience.',
  },
];

const stats = [
  { value: '500+', label: 'Doctors' },
  { value: '50K+', label: 'Patients' },
  { value: '100K+', label: 'Appointments' },
  { value: '4.9', label: 'Average Rating' },
];

const About = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-lg absolute -top-32 -left-32 h-[360px] w-[360px] opacity-50" />
        <div className="orb orb-green-sm absolute top-1/3 right-[-120px] h-[320px] w-[320px] opacity-40" />
      </div>

      <Container size="lg" className="relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <div className="eyebrow-pill mb-5">
            <span className="dot" /> About Us
          </div>
          <h1 className="page-heading lg:!text-5xl">
            Modern healthcare,{' '}
            <span className="text-gradient">made human</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            Medlyst connects patients with top-rated doctors so getting care feels
            simple, transparent, and refreshingly fast.
          </p>
        </motion.div>

        {/* Mission */}
        <section className="mb-14 sm:mb-20">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal direction="right" className="order-2 lg:order-1">
              <div className="glass-card card-accent-line rounded-3xl p-6 sm:p-8 md:p-10">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Our Mission
                </h2>
                <p className="mb-4 leading-relaxed text-white/60">
                  Healthcare should be simple, accessible, and stress-free. Too often,
                  finding the right doctor feels like navigating a maze. That's why we
                  built Medlyst — to cut through the complexity and connect you with
                  quality care in minutes, not days.
                </p>
                <p className="leading-relaxed text-white/55">
                  Whether you need a routine checkup, a specialist consultation, or
                  urgent care, Medlyst puts you in control. Browse verified profiles,
                  read real reviews, and book appointments that fit your schedule.
                </p>
              </div>
            </Reveal>

            <Reveal direction="left" className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-[#346739]/25 via-transparent to-[#7bcc84]/15 blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=600&fit=crop"
                  alt="Medical team collaborating"
                  className="aspect-[4/3] w-full rounded-3xl border border-[#346739]/25 object-cover shadow-lift"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 hidden rounded-2xl border border-[#346739]/30 bg-[#0a1d11]/80 p-3 backdrop-blur-md sm:block">
                  <p className="text-xs uppercase tracking-wider text-[#7bcc84]">
                    Verified network
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white/90">
                    500+ specialists across 60 specialties
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="mb-14 sm:mb-20">
          <Reveal className="mb-9 text-center">
            <div className="eyebrow-pill mb-4">
              <span className="dot" /> Our Values
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              What we stand for
            </h2>
          </Reveal>

          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          >
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="group glass-card card-accent-line glow-ring card-sheen tap-raise relative h-full rounded-2xl p-5 transition-all duration-300 md:hover:-translate-y-1 sm:p-6">
                  <div className="relative z-[1]">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#346739]/30 bg-[#346739]/15 transition-colors duration-300 group-hover:border-[#5aad68]/60 group-hover:bg-[#346739]/25">
                      <v.icon className="h-6 w-6 text-[#7bcc84] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mb-1.5 font-semibold text-white">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-white/55">
                      {v.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Stats */}
        <Reveal>
          <div className="glass-panel card-accent-line relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#346739]/12 via-transparent to-[#7bcc84]/8" />
            <h2 className="mb-7 text-center text-2xl font-bold text-white sm:mb-9 sm:text-3xl">
              Trusted by Thousands
            </h2>
            <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <StatCounter
                    value={s.value}
                    className="block text-3xl font-bold text-gradient tabular-nums sm:text-4xl"
                  />
                  <div className="mt-1 text-sm text-white/55">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </main>
  );
};

export default About;
