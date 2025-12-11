export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  photoUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Adams',
    role: 'Marketing Manager',
    content: 'Medlyst made finding a specialist so easy! I booked an appointment with a cardiologist within minutes. The doctor was excellent and the whole experience was seamless.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Michael Thompson',
    role: 'Software Engineer',
    content: 'As someone with a busy schedule, Medlyst is a lifesaver. I can easily see available time slots and book appointments that fit my calendar. Highly recommended!',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'Teacher',
    content: 'The platform is incredibly user-friendly. I was able to find a great pediatrician for my kids and read reviews from other parents. The booking process was quick and simple.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'Business Owner',
    content: 'Finally, a healthcare booking platform that actually works! The doctor recommendations were spot-on and I got an appointment the very next day. Fantastic service!',
    rating: 4,
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
];
