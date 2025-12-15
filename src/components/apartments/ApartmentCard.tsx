import { Link } from 'react-router-dom';
import { Apartment } from '@/types/apartment';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Users } from 'lucide-react';

interface ApartmentCardProps {
  apartment: Apartment;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  variant?: 'grid' | 'list';
}

export function ApartmentCard({
  apartment,
  checkIn,
  checkOut,
  guests,
  variant = 'grid',
}: ApartmentCardProps) {
  const buildLink = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('from', checkIn);
    if (checkOut) params.set('to', checkOut);
    if (guests) params.set('guests', guests.toString());
    const queryString = params.toString();
    return `/apartment/${apartment.id}${queryString ? `?${queryString}` : ''}`;
  };

  if (variant === 'list') {
    return (
      <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-80 h-48 md:h-auto flex-shrink-0">
            <img
              src={apartment.coverImage}
              alt={apartment.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
              {apartment.images.length} photos
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-heading">
                    {apartment.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{apartment.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-heading">€{apartment.pricePerNight}</span>
                  <span className="text-sm text-muted-foreground ml-1">po noćenju</span>
                </div>
              </div>

              <p className="text-sm text-body mb-4">{apartment.shortDescription}</p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {apartment.beds} {apartment.beds === 1 ? 'krevet' : 'kreveta'}
                </span>
                <span className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {apartment.bathrooms} kupaonica
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {apartment.maxGuests} gostiju
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="brand" size="sm" asChild>
                <Link to={buildLink()}>Detalji</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid variant
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in">
      {/* Image */}
      <div className="relative h-56">
        <img
          src={apartment.coverImage}
          alt={apartment.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
          {apartment.images.length} photos
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-heading mb-1">
          {apartment.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{apartment.subtitle}</p>
        <p className="text-sm text-body mb-3 line-clamp-2">{apartment.shortDescription}</p>

        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {apartment.beds}
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {apartment.bathrooms}
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {apartment.maxGuests}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">€{apartment.pricePerNight}</span>
            <span className="text-sm text-muted-foreground ml-1">/ night</span>
          </div>
          <Button variant="brand" size="sm" asChild>
            <Link to={buildLink()}>Detalji</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
