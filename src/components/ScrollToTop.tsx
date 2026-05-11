import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Reset scroll on client navigation so route changes do not keep old scroll position. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
