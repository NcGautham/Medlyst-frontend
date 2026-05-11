import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: typeof HomeIcon;
};

const navLinks: NavItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Doctors', href: '/doctors', icon: UsersIcon },
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
  { name: 'Admin', href: '/admin', icon: ShieldCheckIcon },
];

function adminNavHref() {
  if (typeof window === 'undefined') return '/admin/login';
  return localStorage.getItem('medlyst_admin_token') === 'true' ? '/admin' : '/admin/login';
}

function isNavActive(pathname: string, link: NavItem) {
  if (link.name === 'Admin') return pathname.startsWith('/admin');
  if (link.href === '/') return pathname === '/';
  return pathname.startsWith(link.href);
}

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  const isHeroPage = location.pathname === '/';
  const desktopLinks = navLinks.filter((l) => l.name !== 'Contact');

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass-nav py-2.5 sm:py-3'
            : isHeroPage
              ? 'bg-transparent py-3.5 sm:py-5'
              : 'glass-nav py-3 sm:py-4',
        )}
      >
        <Container size="lg">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center justify-center rounded-xl border bg-gradient-to-br from-[#346739]/22 to-[#2a5530]/22 transition-all duration-300',
                  isScrolled ? 'h-9 w-9 border-[#346739]/35' : 'h-10 w-10 border-[#346739]/30',
                  'group-hover:border-[#5aad68]/60',
                )}
              >
                <img src="/logo.png" alt="Medlyst" className="h-7 w-7 object-contain" />
              </div>
              <span
                className={cn(
                  'font-bold text-white/90 transition-all group-hover:text-white',
                  isScrolled ? 'text-lg' : 'text-xl',
                )}
              >
                Medlyst
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {desktopLinks.map((link) => {
                const active = isNavActive(location.pathname, link);
                return (
                  <Link
                    key={link.name}
                    to={link.name === 'Admin' ? adminNavHref() : link.href}
                    className={cn(
                      'nav-link rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                      active
                        ? 'border border-[#346739]/50 bg-[#346739]/35 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'text-white/60 hover:bg-white/[0.04] hover:text-white/95',
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={cn(
                'flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[#346739]/35 bg-[#0a1d11]/60 text-white/80 transition-colors backdrop-blur-md hover:border-[#346739]/55 hover:text-white md:hidden',
                isMobileMenuOpen && 'border-[#5aad68]/60 bg-[#346739]/30 text-white',
              )}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence initial={false} mode="wait">
                {isMobileMenuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="b"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Drawer — scrim + sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              id="mobile-menu"
              key="sheet"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[3.5rem] z-50 px-3 pt-2 sm:top-[4.25rem] md:hidden"
            >
              <div className="glass-nav overflow-hidden rounded-2xl border border-[#346739]/25 p-2 shadow-lift">
                <ul className="space-y-1">
                  {navLinks.map((link, idx) => {
                    const active = isNavActive(location.pathname, link);
                    const Icon = link.icon;
                    return (
                      <motion.li
                        key={link.name}
                        initial={reduce ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.22 }}
                      >
                        <Link
                          to={link.name === 'Admin' ? adminNavHref() : link.href}
                          className={cn(
                            'tap-raise flex min-h-12 items-center gap-3 rounded-xl px-3.5 py-3 text-base font-medium transition-colors',
                            active
                              ? 'border border-[#346739]/55 bg-[#346739]/30 text-white'
                              : 'border border-transparent text-white/70 hover:bg-white/[0.04] hover:text-white',
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-lg',
                              active
                                ? 'bg-[#346739]/40 text-[#b8e8bf]'
                                : 'bg-[#0a1d11]/70 text-white/70',
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          {link.name}
                          {active && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-[#7bcc84] shadow-[0_0_8px_rgba(123,204,132,0.7)]" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-2 border-t border-[#346739]/15 px-2 pt-3 pb-1">
                  <p className="text-[11px] uppercase tracking-wider text-white/35">
                    Need help?
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    Reach our team at{' '}
                    <a className="text-[#b8e8bf] underline-offset-4 hover:underline" href="mailto:support@medlyst.com">
                      support@medlyst.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
