
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SearchBar } from '@/components/SearchBar';
import { DoctorGrid } from '@/components/DoctorGrid';
import { useDoctors } from '@/context/DoctorsContext';
import { useMemo, useCallback, useState } from 'react';

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { doctors, isLoading } = useDoctors();
  const [isSearching, setIsSearching] = useState(false);

  const filteredDoctors = useMemo(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    const specialty = searchParams.get('specialty') || 'All Specialties';
    const rating = Number(searchParams.get('rating')) || 0;

    return doctors.filter((doctor) => {
      const matchesQuery =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query);

      const matchesSpecialty =
        specialty === 'All Specialties' || doctor.specialty === specialty;

      const matchesRating = doctor.rating >= rating;

      return matchesQuery && matchesSpecialty && matchesRating;
    });
  }, [searchParams, doctors]);

  const handleSearch = useCallback(
    (query: string, specialty: string, rating: number) => {
      setIsSearching(true);
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (specialty !== 'All Specialties') params.set('specialty', specialty);
      if (rating > 0) params.set('rating', rating.toString());
      setSearchParams(params);

      // Just a small UI delay simulation if needed, but data is local now
      setTimeout(() => setIsSearching(false), 300);
    },
    [setSearchParams]
  );

  return (
    <main className="min-h-screen bg-muted pt-24 pb-16">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Doctor
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search our network of verified specialists. Filter by specialty, rating,
              or simply type a name to find the perfect match for your healthcare needs.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} className="mb-8" />

          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {isLoading || isSearching ? 'Searching...' : `${filteredDoctors.length} doctors found`}
            </p>
          </div>

          <DoctorGrid doctors={filteredDoctors} loading={isLoading || isSearching} />
        </motion.div>
      </Container>
    </main>
  );
};

export default Doctors;
