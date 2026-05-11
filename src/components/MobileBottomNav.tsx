import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon as HomeOutline,
  UsersIcon as UsersOutline,
  InformationCircleIcon as InfoOutline,
  EnvelopeIcon as MailOutline,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  UsersIcon as UsersSolid,
  InformationCircleIcon as InfoSolid,
  EnvelopeIcon as MailSolid,
} from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

type ItemDef = {
  name: string;
  href: string;
  match: (pathname: string) => boolean;
  Outline: typeof HomeOutline;
  Solid: typeof HomeSolid;
};

const items: ItemDef[] = [
  {
    name: 'Home',
    href: '/',
    match: (p) => p === '/',
    Outline: HomeOutline,
    Solid: HomeSolid,
  },
  {
    name: 'Doctors',
    href: '/doctors',
    match: (p) => p.startsWith('/doctors') || p.startsWith('/doctor/'),
    Outline: UsersOutline,
    Solid: UsersSolid,
  },
  {
    name: 'About',
    href: '/about',
    match: (p) => p.startsWith('/about'),
    Outline: InfoOutline,
    Solid: InfoSolid,
  },
  {
    name: 'Contact',
    href: '/contact',
    match: (p) => p.startsWith('/contact'),
    Outline: MailOutline,
    Solid: MailSolid,
  },
];

export const MobileBottomNav = () => {
  const { pathname } = useLocation();

  // Hide on admin routes; admin has its own dense UI.
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="mx-3 mb-3">
        <div
          className="glass-nav rounded-2xl px-2 py-1.5"
          style={{ borderTop: '1px solid rgba(52, 103, 57, 0.18)' }}
        >
          <ul className="flex items-stretch justify-between gap-1">
            {items.map((it) => {
              const active = it.match(pathname);
              const Icon = active ? it.Solid : it.Outline;
              return (
                <li key={it.name} className="flex-1">
                  <Link
                    to={it.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-[10.5px] font-medium transition-colors',
                      active
                        ? 'text-[#b8e8bf]'
                        : 'text-white/55 hover:text-white/85',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-[#346739]/35 ring-1 ring-[#346739]/55"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className="h-5 w-5" />
                    <span className="leading-none">{it.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
