import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, SlotTime } from '@/data/doctors';

interface BookingState {
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTime: SlotTime | null;
  isModalOpen: boolean;
}

interface BookingContextType extends BookingState {
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: SlotTime | null) => void;
  openBookingModal: (doctor: Doctor) => void;
  closeBookingModal: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BookingState>({
    selectedDoctor: null,
    selectedDate: null,
    selectedTime: null,
    isModalOpen: false,
  });

  const setSelectedDoctor = (doctor: Doctor | null) => {
    setState(prev => ({ ...prev, selectedDoctor: doctor }));
  };

  const setSelectedDate = (date: string | null) => {
    setState(prev => ({ ...prev, selectedDate: date, selectedTime: null }));
  };

  const setSelectedTime = (time: SlotTime | null) => {
    setState(prev => ({ ...prev, selectedTime: time }));
  };

  const openBookingModal = (doctor: Doctor) => {
    setState(prev => ({
      ...prev,
      selectedDoctor: doctor,
      isModalOpen: true,
      selectedDate: null,
      selectedTime: null,
    }));
  };

  const closeBookingModal = () => {
    setState(prev => ({ ...prev, isModalOpen: false }));
  };

  const resetBooking = () => {
    setState({
      selectedDoctor: null,
      selectedDate: null,
      selectedTime: null,
      isModalOpen: false,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setSelectedDoctor,
        setSelectedDate,
        setSelectedTime,
        openBookingModal,
        closeBookingModal,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
