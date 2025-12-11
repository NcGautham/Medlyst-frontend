export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  hospital: string;
  bio: string;
  photoUrl: string;
  tags: string[];
  experience: number;
  availableSlots: AvailableSlot[];
}

export interface SlotTime {
  time: string;
  slotId?: string;
}

export interface AvailableSlot {
  date: string;
  times: SlotTime[];
}

// Generate available slots for the next 14 days
const generateSlots = (): AvailableSlot[] => {
  const slots: AvailableSlot[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays
    if (date.getDay() === 0) continue;

    const timeOptions = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'];
    // Randomly remove some slots to simulate bookings
    const availableTimes = timeOptions.filter(() => Math.random() > 0.3);

    if (availableTimes.length > 0) {
      slots.push({
        date: date.toISOString().split('T')[0],
        times: availableTimes.map((t, idx) => ({
          time: t,
          slotId: `mock_${date.getTime()}_${idx}`
        })),
      });
    }
  }

  return slots;
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviewCount: 127,
    hospital: 'City Heart Center',
    bio: 'Dr. Sarah Mitchell is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    tags: ['Heart Health', 'Prevention', 'ECG'],
    experience: 15,
    availableSlots: generateSlots(),
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    rating: 4.8,
    reviewCount: 98,
    hospital: 'Skin & Beauty Clinic',
    bio: 'Dr. Michael Chen is a renowned dermatologist known for his expertise in cosmetic dermatology and skin cancer treatment. He combines traditional methods with cutting-edge technology.',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    tags: ['Skin Care', 'Cosmetic', 'Laser'],
    experience: 12,
    availableSlots: generateSlots(),
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    rating: 4.9,
    reviewCount: 215,
    hospital: 'Children\'s Wellness Center',
    bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    tags: ['Child Care', 'Vaccinations', 'Development'],
    experience: 10,
    availableSlots: generateSlots(),
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    rating: 4.7,
    reviewCount: 89,
    hospital: 'Joint & Spine Institute',
    bio: 'Dr. James Wilson is an orthopedic surgeon specializing in joint replacement and sports medicine. He has performed over 2,000 successful surgeries.',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    tags: ['Joint Pain', 'Sports Medicine', 'Surgery'],
    experience: 18,
    availableSlots: generateSlots(),
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialty: 'Neurologist',
    rating: 4.8,
    reviewCount: 156,
    hospital: 'Brain & Spine Center',
    bio: 'Dr. Lisa Thompson is a neurologist with expertise in headache disorders, epilepsy, and neurodegenerative diseases. She is known for her patient-centered approach.',
    photoUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
    tags: ['Headache', 'Epilepsy', 'Memory'],
    experience: 14,
    availableSlots: generateSlots(),
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialty: 'General Practitioner',
    rating: 4.6,
    reviewCount: 312,
    hospital: 'Family Health Clinic',
    bio: 'Dr. Robert Kim is a family medicine physician who provides comprehensive primary care for patients of all ages. He believes in building long-term relationships with his patients.',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
    tags: ['Primary Care', 'Checkups', 'Chronic Care'],
    experience: 20,
    availableSlots: generateSlots(),
  },
  {
    id: '7',
    name: 'Dr. Amanda Foster',
    specialty: 'Psychiatrist',
    rating: 4.9,
    reviewCount: 178,
    hospital: 'Mental Wellness Center',
    bio: 'Dr. Amanda Foster is a psychiatrist specializing in anxiety, depression, and trauma-related disorders. She takes a holistic approach to mental health treatment.',
    photoUrl: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face',
    tags: ['Anxiety', 'Depression', 'Therapy'],
    experience: 11,
    availableSlots: generateSlots(),
  },
  {
    id: '8',
    name: 'Dr. David Martinez',
    specialty: 'Ophthalmologist',
    rating: 4.7,
    reviewCount: 94,
    hospital: 'Vision Care Center',
    bio: 'Dr. David Martinez is an ophthalmologist specializing in cataract surgery and LASIK. He has helped thousands of patients achieve better vision.',
    photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    tags: ['Eye Care', 'LASIK', 'Cataract'],
    experience: 16,
    availableSlots: generateSlots(),
  },
];

export const specialties = [
  'All Specialties',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Neurologist',
  'General Practitioner',
  'Psychiatrist',
  'Ophthalmologist',
  'Gynecologist',
  'Dentist',
];

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};
