import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Doctors', href: '/doctors' },
  { name: 'About', href: '/about' },
  /** `href` is default; Admin uses login when logged out to avoid /admin → redirect flash */
  { name: 'Admin', href: '/admin' },
] as const;

function adminNavHref() {
  if (typeof window === 'undefined') return '/admin/login';
  return localStorage.getItem('medlyst_admin_token') === 'true' ? '/admin' : '/admin/login';
}

function isNavActive(pathname: string, link: (typeof navLinks)[number]) {
  if (link.name === 'Admin') return pathname.startsWith('/admin');
  return pathname === link.href;
}

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHeroPage = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-nav py-3'
          : isHeroPage
            ? 'bg-transparent py-5'
            : 'glass-nav py-4'
      )}
    >
      <Container size="lg">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/60 transition-colors duration-200">
              <img
                src="/logo.png"
                alt="Medlyst"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">
              Medlyst
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.name === 'Admin' ? adminNavHref() : link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isNavActive(location.pathname, link)
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen
              ? <XMarkIcon className="w-6 h-6" />
              : <Bars3Icon className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-emerald-500/10"
          >
            <Container>
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.name === 'Admin' ? adminNavHref() : link.href}
                    className={cn(
                      'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isNavActive(location.pathname, link)
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
