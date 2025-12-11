export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  createdAt: string;
}

const BOOKINGS_KEY = 'medlyst_bookings';

export const saveBooking = (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  
  return newBooking;
};

export const getBookings = (): Booking[] => {
  try {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getBookingById = (id: string): Booking | undefined => {
  const bookings = getBookings();
  return bookings.find(booking => booking.id === id);
};

export const cancelBooking = (id: string): boolean => {
  const bookings = getBookings();
  const filtered = bookings.filter(booking => booking.id !== id);
  
  if (filtered.length < bookings.length) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    return true;
  }
  
  return false;
};
