import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor, doctors as mockDoctors } from '@/data/doctors';
import { getDoctors, getSlots, Doctor as ApiDoctor, Slot as ApiSlot } from '@/api/helpers';

interface DoctorsContextType {
    doctors: Doctor[];
    isLoading: boolean;
    addDoctor: (doctor: Doctor) => void;
    refreshDoctors: () => Promise<void>;
}

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

export const DoctorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Helper to map DB doctor to UI Doctor
    const mapApiDoctorToDoctor = (d: ApiDoctor): Doctor => ({
        id: String(d.id),
        name: d.name,
        specialty: d.speciality || d.specialty || 'General',
        rating: Number(d.rating) || 5.0,
        reviewCount: Number(d.review_count) || 0,
        hospital: d.hospital || 'Medlyst Clinic',
        bio: d.bio || 'Verified Specialist',
        photoUrl: d.photo_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
        tags: d.tags || [d.speciality || d.specialty || 'General'],
        experience: Number(d.experience) || 1,
        availableSlots: [], // Will be populated from slots fetch
    });

    const refreshDoctors = async () => {
        setIsLoading(true);
        try {
            // Fetch data in parallel
            const [apiDoctorsData, apiSlotsData] = await Promise.allSettled([
                getDoctors(),
                getSlots()
            ]);

            let realDoctors: Doctor[] = [];
            let slots: ApiSlot[] = [];

            // Process Doctors
            if (apiDoctorsData.status === 'fulfilled') {
                realDoctors = apiDoctorsData.value.map(mapApiDoctorToDoctor);
            } else {
                console.warn('Failed to fetch/derive doctors');
            }

            // Process Slots
            if (apiSlotsData.status === 'fulfilled') {
                slots = apiSlotsData.value;
            }

            // If we have slots but no doctors (due to 404), try to derive doctors from slots if not already done by helper
            // (The helper getDoctors() already does this fallback, so realDoctors should contain them)

            // Map slots to doctors
            // Group slots by doctorId
            const slotsByDoctor: Record<number, ApiSlot[]> = {};
            slots.forEach(slot => {
                if (!slotsByDoctor[slot.doctor_id]) slotsByDoctor[slot.doctor_id] = [];
                slotsByDoctor[slot.doctor_id].push(slot);
            });

            // Assign slots to realDoctors
            realDoctors = realDoctors.map(doc => {
                const docId = Number(doc.id);
                const docSlots = slotsByDoctor[docId] || [];

                // Group by Date for UI structure: { date: string, times: {time, slotId}[] }
                const slotsByDate: Record<string, { time: string, slotId: string }[]> = {};
                docSlots.forEach(s => {
                    // s.start_time is ISO string
                    const date = s.start_time.split('T')[0];
                    const time = s.start_time.split('T')[1].substring(0, 5); // HH:MM

                    if (!slotsByDate[date]) slotsByDate[date] = [];
                    // Avoid duplicates if any, but now we store objects with IDs
                    if (!slotsByDate[date].find(t => t.time === time)) {
                        slotsByDate[date].push({ time, slotId: String(s.id) });
                    }
                });

                const availableSlots = Object.entries(slotsByDate).map(([date, times]) => ({
                    date,
                    times: times.sort((a, b) => a.time.localeCompare(b.time))
                })).sort((a, b) => a.date.localeCompare(b.date));

                return {
                    ...doc,
                    availableSlots
                };
            });

            setDoctors(realDoctors);

        } catch (err) {
            console.error("Failed to refresh doctors", err);
            // Fallback: show at least mock doctors
            const safeMockDoctors = mockDoctors.map(d => ({ ...d, id: `mock_${d.id}` }));
            setDoctors(safeMockDoctors);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshDoctors();
    }, []);

    const addDoctor = (doctor: Doctor) => {
        setDoctors(prev => [...prev, doctor]);
    };

    return (
        <DoctorsContext.Provider value={{ doctors, isLoading, addDoctor, refreshDoctors }}>
            {children}
        </DoctorsContext.Provider>
    );
};

export const useDoctors = () => {
    const context = useContext(DoctorsContext);
    if (!context) {
        throw new Error('useDoctors must be used within a DoctorsProvider');
    }
    return context;
};
