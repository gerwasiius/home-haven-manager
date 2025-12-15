import { Link } from 'react-router-dom';
import { mockApartments, mockReservations } from '@/data/mockData';
import { Home, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminDashboardPage() {
  const apartmentCount = mockApartments.length;
  const reservationCount = mockReservations.length;
  const messageCount = 0;

  const quickActions = [
    { icon: Home, label: 'Apartmani', href: '/admin/apartments', color: 'text-green-600' },
    { icon: FileText, label: 'Audit', href: '/admin/audit', color: 'text-admin' },
    { icon: Settings, label: 'Podešavanja', href: '/admin/settings', color: 'text-purple-600' },
    { icon: LogOut, label: 'Odjava', href: '/admin/login', color: 'text-admin-logout' },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-heading mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="text-3xl font-bold text-admin mb-1">{apartmentCount}</div>
          <div className="text-sm text-muted-foreground">Apartmana</div>
        </div>
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="text-3xl font-bold text-admin mb-1">
            {reservationCount > 0 ? reservationCount : '-'}
          </div>
          <div className="text-sm text-muted-foreground">Rezervacije</div>
        </div>
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="text-3xl font-bold text-admin mb-1">
            {messageCount > 0 ? messageCount : '-'}
          </div>
          <div className="text-sm text-muted-foreground">Poruke</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
        <h2 className="font-medium text-heading mb-4">Akcije</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <action.icon className={`h-6 w-6 mb-2 ${action.color}`} />
              <span className="text-sm text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h2 className="font-medium text-heading mb-4">Aktivnosti</h2>
        <p className="text-sm text-muted-foreground">
          Pregledaj{' '}
          <Link to="/admin/audit" className="text-primary hover:underline">
            audit
          </Link>{' '}
          za sve aktivnosti.
        </p>
      </div>
    </div>
  );
}
