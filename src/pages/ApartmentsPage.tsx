import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBox } from '@/components/search/SearchBox';
import { ApartmentCard } from '@/components/apartments/ApartmentCard';
import { mockApartments } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseISO } from 'date-fns';

type SortOption = 'price-asc' | 'price-desc' | 'guests-asc' | 'guests-desc';

export default function ApartmentsPage() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');
  const guestsParam = searchParams.get('guests');

  const checkIn = fromParam ? parseISO(fromParam) : undefined;
  const checkOut = toParam ? parseISO(toParam) : undefined;
  const guests = guestsParam ? parseInt(guestsParam, 10) : 2;

  // Filter apartments by guest count
  let filteredApartments = mockApartments.filter((apt) => {
    if (!apt.isActive) return false;
    if (guests && apt.maxGuests < guests) return false;
    return true;
  });

  // Sort apartments
  filteredApartments = [...filteredApartments].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.pricePerNight - b.pricePerNight;
      case 'price-desc':
        return b.pricePerNight - a.pricePerNight;
      case 'guests-asc':
        return a.maxGuests - b.maxGuests;
      case 'guests-desc':
        return b.maxGuests - a.maxGuests;
      default:
        return 0;
    }
  });

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-2">
            Naši apartmani
          </h1>
          <p className="text-muted-foreground">
            Pronađite svoj savršeni dom daleko od doma u Medulinu
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <SearchBox
              variant="sidebar"
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              initialGuests={guests}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <p className="text-muted-foreground">
                Prikazano {filteredApartments.length} apartmana
              </p>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Sortiraj po" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Cijena: od niže prema višoj</SelectItem>
                  <SelectItem value="price-desc">Cijena: od više prema nižoj</SelectItem>
                  <SelectItem value="guests-asc">Kapacitet: manji prvi</SelectItem>
                  <SelectItem value="guests-desc">Kapacitet: veći prvi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apartment List */}
            {filteredApartments.length > 0 ? (
              <div className="space-y-6">
                {filteredApartments.map((apartment) => (
                  <ApartmentCard
                    key={apartment.id}
                    apartment={apartment}
                    checkIn={fromParam || undefined}
                    checkOut={toParam || undefined}
                    guests={guests}
                    variant="list"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nema dostupnih apartmana za odabrane kriterije.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
