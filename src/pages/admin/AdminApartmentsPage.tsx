import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockApartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminApartmentsPage() {
  const [apartments] = useState(mockApartments);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-heading">Apartmani</h1>
        <Button variant="admin" asChild>
          <Link to="/admin/apartments/new">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj apartman
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16"></TableHead>
              <TableHead>Naziv</TableHead>
              <TableHead>Kapacitet</TableHead>
              <TableHead>Cijena/noć</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apartments.map((apartment) => (
              <TableRow key={apartment.id}>
                <TableCell>
                  <img
                    src={apartment.coverImage}
                    alt={apartment.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{apartment.name}</div>
                    <div className="text-sm text-muted-foreground">{apartment.subtitle}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {apartment.beds} kreveta · {apartment.maxGuests} gostiju
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">€{apartment.pricePerNight}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={apartment.isActive ? 'default' : 'secondary'}>
                    {apartment.isActive ? 'Aktivan' : 'Neaktivan'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/apartments/${apartment.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
