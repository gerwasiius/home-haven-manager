import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/apartments', label: 'Apartmani' },
    { href: '/admin/reservations', label: 'Rezervacije' },
    { href: '/admin/audit', label: 'Audit' },
    { href: '/admin/settings', label: 'Podešavanja' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <header className="bg-admin-header text-admin-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/admin" className="font-heading text-lg font-semibold text-primary-foreground">
            Apartmani — Admin
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-sm text-primary-foreground/80">
              admin@majstoric.com
            </span>
            <Button variant="adminLogout" size="sm" onClick={handleLogout}>
              Odjava
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
