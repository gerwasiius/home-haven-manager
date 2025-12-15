import { Outlet } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-admin-background">
      <AdminHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border bg-background">
        © {new Date().getFullYear()} Apartmani
      </footer>
    </div>
  );
}
