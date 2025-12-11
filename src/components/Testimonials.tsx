import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { testimonials } from '@/data/testimonials';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-cream">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied patients who have found their perfect healthcare match through Medlyst.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-soft p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400' : 'text-muted'}`}
                  />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl shadow-soft p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < testimonials[currentIndex].rating ? 'text-amber-400' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-4">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[currentIndex].photoUrl}
                    alt={testimonials[currentIndex].name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-foreground">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
