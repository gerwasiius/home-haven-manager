import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockReservations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Mail, Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReservationStatus } from '@/types/apartment';
import { format, parseISO } from 'date-fns';
import { hr } from 'date-fns/locale';

const statusLabels: Record<ReservationStatus, string> = {
  pending: 'Na čekanju',
  payment_pending: 'Čeka uplatu',
  confirmed: 'Potvrđeno',
  cancelled: 'Otkazano',
  expired: 'Isteklo',
};

const statusColors: Record<ReservationStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  payment_pending: 'outline',
  confirmed: 'default',
  cancelled: 'destructive',
  expired: 'secondary',
};

export default function AdminReservationsPage() {
  const [reservations] = useState(mockReservations);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReservations = statusFilter === 'all'
    ? reservations
    : reservations.filter((r) => r.status === statusFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-heading">Rezervacije</h1>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Svi statusi</SelectItem>
            <SelectItem value="pending">Na čekanju</SelectItem>
            <SelectItem value="payment_pending">Čeka uplatu</SelectItem>
            <SelectItem value="confirmed">Potvrđeno</SelectItem>
            <SelectItem value="cancelled">Otkazano</SelectItem>
            <SelectItem value="expired">Isteklo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apartman</TableHead>
              <TableHead>Gost</TableHead>
              <TableHead>Datumi</TableHead>
              <TableHead>Iznos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  <div className="font-medium text-foreground">{reservation.apartmentName}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{reservation.guestName}</div>
                    <div className="text-sm text-muted-foreground">{reservation.guestEmail}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {format(parseISO(reservation.checkIn), 'd. MMM', { locale: hr })} -{' '}
                    {format(parseISO(reservation.checkOut), 'd. MMM yyyy', { locale: hr })}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">€{reservation.totalAmount}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[reservation.status]}>
                    {statusLabels[reservation.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/reservations/${reservation.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    {reservation.status === 'pending' && (
                      <Button variant="ghost" size="sm" title="Pošalji upute za plaćanje">
                        <Mail className="h-4 w-4 text-admin" />
                      </Button>
                    )}
                    {reservation.status === 'payment_pending' && (
                      <Button variant="ghost" size="sm" title="Potvrdi">
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    {(reservation.status === 'pending' || reservation.status === 'payment_pending') && (
                      <Button variant="ghost" size="sm" title="Otkaži">
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nema rezervacija za prikaz.
          </div>
        )}
      </div>
    </div>
  );
}
