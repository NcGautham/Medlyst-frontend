import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDoctors } from '@/context/DoctorsContext';
import { deleteDoctor } from '@/api/helpers';
import { useToast } from '@/hooks/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const ManageDoctors = () => {
    const { doctors, isLoading, refreshDoctors } = useDoctors();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        setIsDeleting(id);
        try {
            await deleteDoctor(id);
            toast({
                title: 'Doctor Deleted',
                description: `${name} has been removed.`,
            });
            await refreshDoctors();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete doctor.',
                variant: 'destructive',
            });
        } finally {
            setIsDeleting(null);
        }
    };

    if (isLoading) return <div>Loading doctors...</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                            <TableCell className="font-medium">{doctor.name}</TableCell>
                            <TableCell>{doctor.specialty}</TableCell>
                            <TableCell className="text-right">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Doctor?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete {doctor.name}, including all their slots and bookings. This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-destructive hover:bg-destructive/90"
                                                onClick={() => handleDelete(doctor.id, doctor.name)}
                                            >
                                                {isDeleting === doctor.id ? 'Deleting...' : 'Delete'}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                    {doctors.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">
                                No doctors found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
