import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateDoctorForm } from './CreateDoctorForm';
import { CreateSlotForm } from './CreateSlotForm';
import { ManageDoctors } from './ManageDoctors';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('medlyst_admin_token');
    navigate('/admin/login');
  };

  return (
    <main className="bg-background pt-28 pb-20">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Panel</h1>
          <Button variant="outline" className="min-h-11 w-full shrink-0 sm:w-auto" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create Doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateDoctorForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateSlotForm />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Manage Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <ManageDoctors />
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
};

export default AdminPage;
