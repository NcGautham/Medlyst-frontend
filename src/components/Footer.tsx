import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '#' },
    { name: 'Help Center', href: '#' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: FacebookIcon },
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { name: 'Instagram', href: '#', icon: InstagramIcon },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

type GroupKey = 'company' | 'support' | 'legal';

const groupLabels: Record<GroupKey, string> = {
  company: 'Company',
  support: 'Support',
  legal: 'Legal',
};

export const Footer = () => {
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const toggle = (g: GroupKey) => setOpenGroup((o) => (o === g ? null : g));

  return (
    <footer className="glass-nav border-t border-[#346739]/15 text-white/80">
      <Container size="lg" className="py-10 sm:py-12 md:py-16">
        {/* Brand row */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-4 lg:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="group mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#346739]/30 bg-[#346739]/15 transition-colors group-hover:border-[#5aad68]/55">
                <img src="/logo.png" alt="Medlyst" className="h-7 w-7 object-contain" />
              </div>
              <span className="text-xl font-bold text-white">Medlyst</span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/45">
              Making healthcare accessible by connecting patients with top-rated doctors.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="tap-raise flex h-10 w-10 items-center justify-center rounded-xl border border-[#346739]/22 bg-[#0a1d11]/60 text-white/55 transition-all duration-200 hover:border-[#5aad68]/55 hover:text-[#b8e8bf]"
                  aria-label={s.name}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop link columns */}
          <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-10">
            {(Object.keys(footerLinks) as GroupKey[]).map((g) => (
              <div key={g}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/65">
                  {groupLabels[g]}
                </h3>
                <ul className="space-y-3">
                  {footerLinks[g].map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/45 transition-colors duration-200 hover:text-[#b8e8bf]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden">
            <ul className="divide-y divide-[#346739]/15 border-y border-[#346739]/15">
              {(Object.keys(footerLinks) as GroupKey[]).map((g) => {
                const isOpen = openGroup === g;
                return (
                  <li key={g}>
                    <button
                      type="button"
                      onClick={() => toggle(g)}
                      aria-expanded={isOpen}
                      aria-controls={`footer-group-${g}`}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span
                        className={cn(
                          'text-sm font-semibold uppercase tracking-wider transition-colors',
                          isOpen ? 'text-white' : 'text-white/70',
                        )}
                      >
                        {groupLabels[g]}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-full border transition-colors',
                          isOpen
                            ? 'border-[#5aad68]/55 bg-[#346739]/25 text-[#b8e8bf]'
                            : 'border-white/12 text-white/50',
                        )}
                      >
                        <ChevronDownIcon className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          id={`footer-group-${g}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pb-4">
                            {footerLinks[g].map((link) => (
                              <Link
                                key={link.name}
                                to={link.href}
                                className="block rounded-lg px-2 py-2 text-sm text-white/55 transition-colors hover:bg-white/[0.04] hover:text-[#b8e8bf]"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Mobile contact CTA */}
            <div className="mt-6 rounded-2xl border border-[#346739]/25 bg-[#0a1d11]/55 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7bcc84]">
                Get in touch
              </p>
              <p className="mt-1 text-sm text-white/65">
                We respond within one business day.
              </p>
              <a
                href="mailto:support@medlyst.com"
                className="tap-raise mt-3 inline-flex w-full min-h-11 items-center justify-center rounded-xl bg-[#346739] text-sm font-semibold text-white shadow-glow-sm hover:bg-[#3f8548]"
              >
                support@medlyst.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#346739]/15 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/35 sm:text-sm">
            © {new Date().getFullYear()} Medlyst. All rights reserved.
          </p>
          <p className="text-xs text-white/30 sm:text-sm">
            Crafted with care for better healthcare
          </p>
        </div>
      </Container>
    </footer>
  );
};
