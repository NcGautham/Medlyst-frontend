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
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
