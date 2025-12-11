import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Doctors', href: '/doctors' },
  { name: 'About', href: '/about' },
  { name: 'Admin', href: '/admin' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

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
          ? 'bg-card/95 backdrop-blur-md shadow-soft py-3'
          : isHeroPage
            ? 'bg-transparent py-5'
            : 'bg-card py-4'
      )}
    >
      <Container size="lg">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Medlyst"
              className="w-10 h-10 object-contain rounded-xl"
            />
            <span className={cn(
              "text-xl font-bold",
              isScrolled || !isHeroPage ? "text-foreground" : "text-primary-foreground"
            )}>
              Medlyst
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  location.pathname === link.href
                    ? isScrolled || !isHeroPage ? "text-primary" : "text-accent"
                    : isScrolled || !isHeroPage ? "text-muted-foreground" : "text-primary-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant={isScrolled || !isHeroPage ? "ghost" : "heroOutline"}
              size="sm"
            >
              Sign In
            </Button>
            <Button
              variant={isScrolled || !isHeroPage ? "default" : "hero"}
              size="sm"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className={cn(
                "w-6 h-6",
                isScrolled || !isHeroPage ? "text-foreground" : "text-primary-foreground"
              )} />
            ) : (
              <Bars3Icon className={cn(
                "w-6 h-6",
                isScrolled || !isHeroPage ? "text-foreground" : "text-primary-foreground"
              )} />
            )}
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
            className="md:hidden bg-card border-t border-border"
          >
            <Container>
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "block py-2 text-sm font-medium transition-colors",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
