import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { Reveal } from '@/components/Reveal';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(20, 'Message must be at least 20 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactCards = [
  {
    icon: EnvelopeIcon,
    title: 'Email',
    value: 'support@medlyst.com',
    href: 'mailto:support@medlyst.com',
  },
  {
    icon: PhoneIcon,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPinIcon,
    title: 'Address',
    value: '123 Healthcare Ave, San Francisco, CA 94102',
    href: null as string | null,
  },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    // TODO: wire to backend / EmailJS — currently shows a mock success toast.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    reset();
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pb-12 pt-20 sm:pb-16 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-lg absolute -top-24 right-[-120px] h-[360px] w-[360px] opacity-50" />
        <div className="orb orb-green-sm absolute bottom-[10%] left-[-100px] h-[280px] w-[280px] opacity-40" />
      </div>

      <Container size="lg" className="relative z-10">
        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 max-w-3xl text-center sm:mb-12"
        >
          <div className="eyebrow-pill mb-4">
            <span className="dot" /> Get in touch
          </div>
          <h1 className="page-heading">
            We're here to <span className="text-gradient">help</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base md:text-lg">
            Questions about a booking, your account, or partnering with us?
            Drop a note and our team will respond within one business day.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {/* ── Contact info cards ── */}
          <Reveal direction="right" className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
              {contactCards.map((c, i) => {
                const isAddress = c.title === 'Address';
                const Inner = (
                  <div
                    className={`glass-card tap-raise flex h-full items-start gap-3.5 rounded-2xl p-4 sm:gap-4 sm:p-5 ${
                      isAddress ? 'sm:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#346739]/30 bg-[#346739]/15">
                      <c.icon className="h-5 w-5 text-[#7bcc84]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                        {c.title}
                      </h3>
                      <p className="mt-0.5 break-words text-sm leading-snug text-white/90">
                        {c.value}
                      </p>
                    </div>
                  </div>
                );
                const wrapperClass = isAddress ? 'sm:col-span-2 lg:col-span-1' : '';
                return c.href ? (
                  <a key={i} href={c.href} className={`block ${wrapperClass}`}>
                    {Inner}
                  </a>
                ) : (
                  <div key={i} className={wrapperClass}>
                    {Inner}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* ── Form ── */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card card-accent-line space-y-4 rounded-2xl p-4 sm:space-y-5 sm:rounded-3xl sm:p-7 md:p-9"
            >
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-white/80"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="input-dark"
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-white/80"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="input-dark"
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-medium text-white/80"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className="input-dark"
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-white/80"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="input-dark"
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="tap-raise inline-flex w-full min-h-12 items-center justify-center rounded-xl bg-[#346739] font-semibold text-white shadow-glow-sm transition-all hover:bg-[#3f8548] hover:brightness-110 disabled:opacity-60 sm:w-auto sm:px-10"
              >
                <PaperAirplaneIcon className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Reveal>
        </div>
      </Container>
    </main>
  );
};

export default Contact;
