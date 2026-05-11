import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/Reveal';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: (
      <p>
        By accessing and using Medlyst, you accept and agree to be bound by the terms
        and provision of this agreement. If you do not agree to abide by these terms,
        please do not use this service.
      </p>
    ),
  },
  {
    title: '2. Description of Service',
    body: (
      <p>
        Medlyst provides a platform for users to search for, compare, and book
        appointments with healthcare providers. We do not provide medical advice or
        treatment directly. All medical services are provided by independent healthcare
        professionals.
      </p>
    ),
  },
  {
    title: '3. User Responsibilities',
    body: (
      <>
        <p className="mb-3">As a user of Medlyst, you agree to:</p>
        <ul className="list-disc space-y-2 pl-6 text-white/55">
          <li>Provide accurate and complete information when creating an account</li>
          <li>Keep your account credentials confidential</li>
          <li>Attend scheduled appointments or cancel with appropriate notice</li>
          <li>Use the platform only for lawful purposes</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Booking & Cancellation',
    body: (
      <p>
        Appointments booked through Medlyst are subject to the individual healthcare
        provider's policies. We recommend canceling or rescheduling at least 24 hours
        in advance to avoid any potential fees.
      </p>
    ),
  },
  {
    title: '5. Privacy',
    body: (
      <p>
        Your privacy is important to us. Please review our Privacy Policy to understand
        how we collect, use, and protect your personal information.
      </p>
    ),
  },
  {
    title: '6. Limitation of Liability',
    body: (
      <p>
        Medlyst shall not be liable for any indirect, incidental, special, consequential,
        or punitive damages resulting from your use of the service.
      </p>
    ),
  },
  {
    title: '7. Contact',
    body: (
      <p>
        If you have any questions about these Terms & Conditions, please contact us at{' '}
        <a className="text-[#b8e8bf] underline-offset-4 hover:underline" href="mailto:legal@medlyst.com">
          legal@medlyst.com
        </a>
        .
      </p>
    ),
  },
];

const Terms = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-lg absolute -top-32 -right-32 h-[360px] w-[360px] opacity-40" />
      </div>

      <Container size="sm" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-9 text-center sm:mb-12"
        >
          <div className="eyebrow-pill mb-5">
            <span className="dot" /> Legal
          </div>
          <h1 className="page-heading">Terms &amp; Conditions</h1>
          <p className="mt-3 text-sm text-white/45">Last updated: December 2024</p>
        </motion.div>

        <div className="space-y-4 sm:space-y-5">
          {sections.map((s, idx) => (
            <Reveal key={s.title} delay={Math.min(idx * 0.04, 0.18)}>
              <section className="glass-card rounded-2xl p-5 sm:p-7">
                <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                  {s.title}
                </h2>
                <div className="leading-relaxed text-white/55 sm:text-[15px]">
                  {s.body}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Terms;
