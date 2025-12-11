import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { createSlot } from '@/api/helpers';
import { useDoctors } from '@/context/DoctorsContext';

const slotSchema = z.object({
  doctorId: z.number().min(1, 'Please select a doctor'),
  date: z.date({ required_error: 'Please select a date' }),
  times: z.array(z.string()).min(1, 'Please select at least one time'),
});

type SlotFormData = z.infer<typeof slotSchema>;

const PRESET_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

export const CreateSlotForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { doctors, isLoading: isLoadingDoctors } = useDoctors();
  const { toast } = useToast();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SlotFormData>({
    resolver: zodResolver(slotSchema),
    defaultValues: {
      times: [],
    }
  });

  const selectedDate = watch('date');
  const selectedDoctorId = watch('doctorId');
  const selectedTimes = watch('times');

  const toggleTime = (time: string) => {
    const currentTimes = selectedTimes || [];
    if (currentTimes.includes(time)) {
      setValue('times', currentTimes.filter(t => t !== time));
    } else {
      setValue('times', [...currentTimes, time].sort());
    }
  };

  const onSubmit = async (data: SlotFormData) => {
    setIsSubmitting(true);
    let successCount = 0;
    try {
      for (const time of data.times) {
        const datetime = new Date(data.date);
        const [hours, minutes] = time.split(':');
        datetime.setHours(Number(hours), Number(minutes));

        const payload = {
          doctorId: data.doctorId,
          startTime: datetime.toISOString(),
          durationMin: 30,
          totalCapacity: 1,
        };

        await createSlot(payload);
        successCount++;
      }

      toast({
        title: 'Success',
        description: `Created ${successCount} slots successfully.`,
      });

      // Clear times for next batch
      setValue('times', []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to create slots',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Doctor Selection */}
      <div className="space-y-2">
        <Label>Select Doctor</Label>
        <Select
          disabled={isLoadingDoctors}
          onValueChange={(value) => setValue('doctorId', parseInt(value, 10))}
          value={selectedDoctorId ? String(selectedDoctorId) : undefined}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoadingDoctors ? 'Loading...' : 'Choose a doctor'} />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id.toString()}>
                {doctor.name} - {doctor.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.doctorId && (
          <p className="text-sm text-destructive font-medium">{errors.doctorId.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Picker */}
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal h-12',
                  !selectedDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setValue('date', date)}
                initialFocus
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-sm text-destructive font-medium">{errors.date.message}</p>
          )}
        </div>

        {/* Time Chips */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            Time Slots (Select multiple)
          </Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_TIMES.map((time) => {
              const isSelected = selectedTimes?.includes(time);
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => toggleTime(time)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background hover:bg-muted text-foreground border-input"
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
          {errors.times && (
            <p className="text-sm text-destructive font-medium">{errors.times.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg">
        {isSubmitting ? 'Creating Slots...' : `Create ${selectedTimes?.length || 0} Slots`}
      </Button>
    </form>
  );
};
