import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { testimonials } from '@/data/testimonials';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduce = useReducedMotion();
  const intervalRef = useRef<number | null>(null);

  const goTo = (i: number) =>
    setCurrentIndex(((i % testimonials.length) + testimonials.length) % testimonials.length);
  const nextTestimonial = () => goTo(currentIndex + 1);
  const prevTestimonial = () => goTo(currentIndex - 1);

  // Auto-advance on mobile (pauses if reduced motion)
  useEffect(() => {
    if (reduce) return;
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16 md:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-sm absolute -top-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 opacity-35" />
      </div>

      <Container size="lg" className="relative z-10">
        <Reveal className="mb-10 text-center sm:mb-12">
          <div className="eyebrow-pill mb-4">
            <span className="dot" /> Patient Stories
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            What Our <span className="text-gradient">Patients Say</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55 sm:text-base">
            Join thousands of patients who found their perfect doctor through Medlyst.
          </p>
        </Reveal>

        {/* Desktop grid */}
        <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="group glass-card card-accent-line glow-ring card-sheen relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative z-[1]">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < t.rating ? 'text-amber-400' : 'text-white/15',
                      )}
                    />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-white/75">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.photoUrl}
                    alt={t.name}
                    className="h-10 w-10 rounded-full border border-[#346739]/30 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white/90">
                      {t.name}
                    </div>
                    <div className="truncate text-xs text-white/45">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative min-h-[12rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card card-accent-line rounded-2xl p-5"
              >
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < testimonials[currentIndex].rating
                          ? 'text-amber-400'
                          : 'text-white/15',
                      )}
                    />
                  ))}
                </div>
                <p className="mb-5 text-[15px] leading-relaxed text-white/75">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[currentIndex].photoUrl}
                    alt={testimonials[currentIndex].name}
                    className="h-10 w-10 rounded-full border border-[#346739]/30 object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white/90">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-xs text-white/45">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls + dots */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevTestimonial}
              className="tap-raise flex h-11 w-11 items-center justify-center rounded-full border border-[#346739]/30 bg-[#0a1d11]/70 text-white/70 transition-colors hover:border-[#5aad68]/55 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === currentIndex
                      ? 'w-6 bg-[#7bcc84]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTestimonial}
              className="tap-raise flex h-11 w-11 items-center justify-center rounded-full border border-[#346739]/30 bg-[#0a1d11]/70 text-white/70 transition-colors hover:border-[#5aad68]/55 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
