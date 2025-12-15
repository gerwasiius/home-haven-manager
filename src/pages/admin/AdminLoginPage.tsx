import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication
    if (email && password) {
      toast({
        title: 'Prijava uspješna',
        description: 'Dobrodošli natrag!',
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Greška',
        description: 'Molimo unesite email i lozinku.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-admin-background flex flex-col">
      {/* Header */}
      <header className="bg-admin-header text-admin-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <span className="font-heading text-lg font-semibold">Apartmani — Admin</span>
            <nav className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-primary-foreground/70">Dashboard</span>
              <span className="text-sm text-primary-foreground/70">Apartmani</span>
              <span className="text-sm text-primary-foreground/70">Audit</span>
              <span className="text-sm text-primary-foreground/70">Podešavanja</span>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-foreground/80">Admin</span>
              <Button variant="adminLogout" size="sm">
                Odjava
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-sm border border-border p-8">
            <h1 className="font-heading text-2xl font-semibold text-heading mb-6">
              Admin Prijava
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Lozinka</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button variant="admin" type="submit" className="w-full" size="lg">
                Prijavi se
              </Button>
            </form>

            <p className="text-sm text-primary mt-4 text-center">
              <a href="#" className="hover:underline">
                Kreiraj admin korisnika (privremeno)
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Apartmani
      </footer>
    </div>
  );
}
