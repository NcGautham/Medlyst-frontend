import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';

const Terms = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Medlyst, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by these terms, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Medlyst provides a platform for users to search for, compare, and book appointments 
                with healthcare providers. We do not provide medical advice or treatment directly. 
                All medical services are provided by independent healthcare professionals.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a user of Medlyst, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Keep your account credentials confidential</li>
                <li>Attend scheduled appointments or cancel with appropriate notice</li>
                <li>Use the platform only for lawful purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Booking & Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Appointments booked through Medlyst are subject to the individual healthcare 
                provider's policies. We recommend canceling or rescheduling at least 24 hours 
                in advance to avoid any potential fees.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Medlyst shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at 
                legal@medlyst.com.
              </p>
            </section>
          </div>
        </motion.div>
      </Container>
    </main>
  );
};

export default Terms;
