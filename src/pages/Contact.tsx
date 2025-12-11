import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(20, 'Message must be at least 20 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    
    reset();
  };

  return (
    <main className="min-h-screen bg-muted pt-24 pb-16">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. 
            Our team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-card rounded-2xl shadow-soft p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm">support@medlyst.com</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-soft p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-soft p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground text-sm">
                    123 Healthcare Ave<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card rounded-2xl shadow-soft p-6 md:p-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </main>
  );
};

export default Contact;
