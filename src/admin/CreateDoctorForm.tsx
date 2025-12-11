import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createDoctor } from '@/api/helpers';
import { useDoctors } from '@/context/DoctorsContext';

const doctorSchema = z.object({
  name: z.string().min(1, 'Doctor name is required').max(100),
  specialty: z.string().min(1, 'Specialty is required').max(100),
  hospital: z.string().min(1, 'Hospital is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  photoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.string().optional(), // Comma separated
  experience: z.preprocess((val) => Number(val), z.number().min(0)),
});

type DoctorFormData = z.infer<typeof doctorSchema>;

export const CreateDoctorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { refreshDoctors } = useDoctors(); // Use refresh to get real data from backend

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      experience: 0,
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    }
  });

  const onSubmit = async (data: DoctorFormData) => {
    setIsSubmitting(true);
    try {
      const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [data.specialty];

      const payload = {
        name: data.name,
        speciality: data.specialty,
        hospital: data.hospital,
        bio: data.bio,
        photo_url: data.photoUrl || undefined,
        tags: tagsArray,
        experience: data.experience,
      };

      await createDoctor(payload);

      toast({
        title: 'Success',
        description: 'Doctor created successfully',
      });

      // Refresh the context to show new doctor in list
      await refreshDoctors();
      reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to create doctor',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Doctor Name</Label>
          <Input id="name" placeholder="e.g., Dr. NC Gautham" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Input id="specialty" placeholder="e.g., Cardiology" {...register('specialty')} />
          {errors.specialty && <p className="text-sm text-destructive mt-1">{errors.specialty.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="hospital">Hospital / Clinic</Label>
        <Input id="hospital" placeholder="e.g., City Heart Center" {...register('hospital')} />
        {errors.hospital && <p className="text-sm text-destructive mt-1">{errors.hospital.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="experience">Experience (Years)</Label>
          <Input type="number" id="experience" {...register('experience')} />
          {errors.experience && <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>}
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input id="tags" placeholder="Heart, Surgery, Kids" {...register('tags')} />
        </div>
      </div>

      <div>
        <Label htmlFor="photoUrl">Photo URL</Label>
        <Input id="photoUrl" placeholder="https://..." {...register('photoUrl')} />
        {errors.photoUrl && <p className="text-sm text-destructive mt-1">{errors.photoUrl.message}</p>}
      </div>

      <div>
        <Label htmlFor="bio">Biography</Label>
        <Textarea id="bio" placeholder="Descript about the doctor..." {...register('bio')} />
        {errors.bio && <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating...' : 'Create Doctor'}
      </Button>
    </form>
  );
};
