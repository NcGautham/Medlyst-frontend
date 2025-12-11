import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { HeartIcon, ShieldCheckIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const values = [
  {
    icon: HeartIcon,
    title: 'Patient-Centered Care',
    description: 'We put patients first, ensuring every interaction is focused on your health and well-being.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Trust & Transparency',
    description: 'All our doctors are verified professionals. We maintain complete transparency in our processes.',
  },
  {
    icon: UserGroupIcon,
    title: 'Accessible Healthcare',
    description: 'Breaking down barriers to make quality healthcare accessible to everyone, everywhere.',
  },
  {
    icon: SparklesIcon,
    title: 'Innovation',
    description: 'Continuously improving our platform to provide the best possible booking experience.',
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <Container size="lg">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Medlyst
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're on a mission to transform healthcare access. Medlyst connects patients 
            with top-rated doctors, making it easier than ever to get the care you deserve.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Healthcare should be simple, accessible, and stress-free. Too often, 
                finding the right doctor feels like navigating a maze. That's why we 
                built Medlyst — to cut through the complexity and connect you with 
                quality care in minutes, not days.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need a routine checkup, a specialist consultation, or 
                urgent care, Medlyst puts you in control. Browse verified profiles, 
                read real reviews, and book appointments that fit your schedule.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
                alt="Medical team collaborating"
                className="rounded-2xl shadow-lift"
              />
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
            Our Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-soft p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
            Trusted by Thousands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-primary-foreground/80">Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50K+</div>
              <div className="text-primary-foreground/80">Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">100K+</div>
              <div className="text-primary-foreground/80">Appointments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">4.9</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </motion.section>
      </Container>
    </main>
  );
};

export default About;
