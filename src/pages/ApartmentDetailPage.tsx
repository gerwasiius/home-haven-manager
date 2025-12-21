import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { mockApartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Users, Bed, Bath, ArrowLeft, Check, ChevronLeft, ChevronRight, Wifi, Car, Snowflake, Tv, UtensilsCrossed, WashingMachine } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { hr } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const amenityIcons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi className="h-5 w-5" />,
  'Parking': <Car className="h-5 w-5" />,
  'Klima uređaj': <Snowflake className="h-5 w-5" />,
  'TV': <Tv className="h-5 w-5" />,
  'Kuhinja': <UtensilsCrossed className="h-5 w-5" />,
  'Perilica': <WashingMachine className="h-5 w-5" />,
};

export default function ApartmentDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const apartment = mockApartments.find((apt) => apt.id === id);

  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');
  const guestsParam = searchParams.get('guests');

  const checkIn = fromParam ? parseISO(fromParam) : null;
  const checkOut = toParam ? parseISO(toParam) : null;
  const [guests, setGuests] = useState(guestsParam || '2');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  if (!apartment) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Apartman nije pronađen</h1>
        <Button asChild>
          <Link to="/apartments">Natrag na apartmane</Link>
        </Button>
      </div>
    );
  }

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * apartment.pricePerNight;

  const formatDateRange = () => {
    if (!checkIn || !checkOut) return 'Odaberite datume';
    return `${format(checkIn, 'd. MMM', { locale: hr })} - ${format(checkOut, 'd. MMM yyyy', { locale: hr })}`;
  };

  const handleBooking = () => {
    if (!bookingForm.name || !bookingForm.email) {
      toast({
        title: 'Greška',
        description: 'Molimo unesite ime i email adresu.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Zahtjev poslan!',
      description: 'Vaš zahtjev za rezervaciju je uspješno poslan. Uskoro ćemo vas kontaktirati.',
    });
    setBookingDialogOpen(false);
    setBookingForm({ name: '', email: '', phone: '' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-muted">
        <img
          src={apartment.images[currentImageIndex]}
          alt={`${apartment.name}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Gallery Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
          <button
            onClick={prevImage}
            className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={nextImage}
            className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {apartment.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-background w-8' 
                  : 'bg-background/50 hover:bg-background/75'
              }`}
            />
          ))}
        </div>

        {/* Back Button */}
        <Link
          to="/apartments"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium text-foreground shadow-lg hover:bg-background transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Natrag
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-heading mb-3">
                {apartment.name}
              </h1>
              <p className="text-lg text-muted-foreground">{apartment.subtitle}</p>
            </div>

            {/* Quick Specs */}
            <div className="flex flex-wrap gap-6 pb-8 mb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gosti</p>
                  <p className="font-medium">{apartment.maxGuests}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kreveti</p>
                  <p className="font-medium">{apartment.beds}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kupaonica</p>
                  <p className="font-medium">{apartment.bathrooms}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-heading text-xl font-semibold text-heading mb-4">O apartmanu</h2>
              <p className="text-body leading-relaxed">{apartment.fullDescription}</p>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="font-heading text-xl font-semibold text-heading mb-4">Što nudimo</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.amenities.map((amenity) => (
                  <div 
                    key={amenity} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <span className="text-primary">
                      {amenityIcons[amenity] || <Check className="h-5 w-5" />}
                    </span>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-heading mb-4">Kućni red</h2>
              <div className="space-y-3">
                {apartment.houseRules.map((rule) => (
                  <div key={rule} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-body">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6 lg:sticky lg:top-8">
              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-heading">€{apartment.pricePerNight}</span>
                  <span className="text-muted-foreground">/ noć</span>
                </div>
              </div>

              {/* Dates */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Datumi</label>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <span className="font-medium">{formatDateRange()}</span>
                </div>
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Broj gostiju</label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="w-full h-12 bg-muted border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: apartment.maxGuests }).map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? 'gost' : i < 4 ? 'gosta' : 'gostiju'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="mb-6 pb-6 border-b border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      €{apartment.pricePerNight} × {nights} {nights === 1 ? 'noć' : nights < 5 ? 'noći' : 'noći'}
                    </span>
                    <span className="font-medium">€{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Ukupno</span>
                    <span className="text-heading">€{totalPrice}</span>
                  </div>
                </div>
              )}

              <Button
                variant="brand"
                className="w-full h-14 text-base font-semibold rounded-xl"
                onClick={() => setBookingDialogOpen(true)}
                disabled={!checkIn || !checkOut}
              >
                Rezerviraj
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Vaš zahtjev će biti pregledan prije potvrde
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Zahtjev za rezervaciju</DialogTitle>
            <DialogDescription>
              Unesite svoje podatke za {apartment.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Ime i prezime *</Label>
              <Input
                id="name"
                className="mt-1.5"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                placeholder="Vaše ime i prezime"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                className="mt-1.5"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                placeholder="email@primjer.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                className="mt-1.5"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                placeholder="+385 ..."
              />
            </div>

            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Apartman</span>
                <span className="font-medium">{apartment.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Datumi</span>
                <span className="font-medium">{formatDateRange()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gosti</span>
                <span className="font-medium">{guests}</span>
              </div>
              {nights > 0 && (
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span>Ukupno</span>
                  <span className="text-primary">€{totalPrice}</span>
                </div>
              )}
            </div>

            <Button variant="brand" className="w-full h-12" onClick={handleBooking}>
              Pošalji zahtjev
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
