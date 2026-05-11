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
      const name = (doctor.name ?? '').toLowerCase();
      const spec = (doctor.specialty ?? '').toLowerCase();
      const hosp = (doctor.hospital ?? '').toLowerCase();
      const matchesQuery =
        !query ||
        name.includes(query) ||
        spec.includes(query) ||
        hosp.includes(query);

      const matchesSpecialty =
        specialty === 'All Specialties' || doctor.specialty === specialty;

      const matchesRating = (Number(doctor.rating) || 0) >= rating;

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

      setTimeout(() => setIsSearching(false), 300);
    },
    [setSearchParams],
  );

  const isWorking = isLoading || isSearching;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pb-12 pt-24 sm:pb-16 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb orb-green-lg absolute -top-32 -left-32 h-[380px] w-[380px] opacity-50" />
        <div className="orb orb-green-sm absolute top-1/2 right-[-100px] h-[280px] w-[280px] opacity-40" />
      </div>

      <Container size="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <div className="eyebrow-pill mb-4">
              <span className="dot" /> Find a Specialist
            </div>
            <h1 className="page-heading">
              Search our network of{' '}
              <span className="text-gradient">trusted doctors</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 sm:text-base">
              Filter by specialty, rating, or simply type a name to find your perfect match.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SearchBar onSearch={handleSearch} className="mb-6 sm:mb-8" />
          </motion.div>

          <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
            <p className="text-sm text-white/55">
              {isWorking ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#7bcc84]" />
                  Searching...
                </span>
              ) : (
                <>
                  <span className="font-semibold text-white">
                    {filteredDoctors.length}
                  </span>{' '}
                  {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
                </>
              )}
            </p>
          </div>

          <DoctorGrid doctors={filteredDoctors} loading={isWorking} />
        </motion.div>
      </Container>
    </main>
  );
};

export default Doctors;
