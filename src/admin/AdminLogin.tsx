import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessionRedirect, setSessionRedirect] = useState(
    () => localStorage.getItem('medlyst_admin_token') === 'true',
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('medlyst_admin_token') === 'true') {
      navigate('/admin', { replace: true });
      return;
    }
    setSessionRedirect(false);
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'medlyst') {
      localStorage.setItem('medlyst_admin_token', 'true');
      toast.success('Logged in successfully');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  if (sessionRedirect) {
    return (
      <div
        className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-background px-4"
        aria-busy="true"
        aria-label="Redirecting to admin"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest/40 border-t-forest-light" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-10rem)] flex-col items-center justify-center bg-background px-4 py-12 pb-[max(3rem,env(safe-area-inset-bottom))] pt-8 sm:min-h-[calc(100vh-12rem)] sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(52,103,57,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(52,103,57,0.22) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <Card className="relative z-10 w-full max-w-md glass-card card-accent-line rounded-2xl border-forest/20 shadow-lift">
        <CardHeader className="space-y-3 pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-forest/25 bg-forest/10">
            <LockClosedIcon className="h-6 w-6 text-forest-light" aria-hidden />
          </div>
          <CardTitle className="text-center text-2xl font-bold tracking-tight text-white">
            Admin login
          </CardTitle>
          <CardDescription className="text-center text-white/50">
            Sign in to manage doctors and availability. This area is not shown to patients.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/75">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-forest/25 bg-background/60 text-foreground placeholder:text-white/35 focus-visible:ring-forest/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/75">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-forest/25 bg-background/60 text-foreground placeholder:text-white/35 focus-visible:ring-forest/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-forest font-semibold text-white shadow-glow-sm hover:bg-forest-hover hover:brightness-110 active:scale-[0.99]"
            >
              Sign in
            </Button>
          </form>
          <p className="text-center text-sm text-white/40">
            <Link to="/" className="text-forest-light/90 underline-offset-4 hover:text-forest-soft hover:underline">
              ← Back to site
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
