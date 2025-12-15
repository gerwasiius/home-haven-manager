import { useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { mockApartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Bed, Bath, ArrowLeft, Check } from 'lucide-react';
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

export default function ApartmentDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
    return `${format(checkIn, 'd. MMM yyyy', { locale: hr })} - ${format(checkOut, 'd. MMM yyyy', { locale: hr })}`;
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

    // Simulate booking submission
    toast({
      title: 'Zahtjev poslan!',
      description: 'Vaš zahtjev za rezervaciju je uspješno poslan. Uskoro ćemo vas kontaktirati.',
    });
    setBookingDialogOpen(false);
    setBookingForm({ name: '', email: '', phone: '' });
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        {/* Back Link */}
        <Link
          to="/apartments"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Natrag na sve apartmane
        </Link>

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-1">
            {apartment.name}
          </h1>
          <p className="text-muted-foreground">{apartment.subtitle}</p>
        </div>

        {/* Specs */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-2" />
            {apartment.beds} {apartment.beds === 1 ? 'krevet' : 'kreveta'}
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-2" />
            {apartment.bathrooms} kupaonica
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {apartment.maxGuests} gostiju
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Gallery */}
          <div className="flex-1">
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src={apartment.images[currentImageIndex]}
                alt={`${apartment.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-foreground/80 text-background text-sm px-3 py-1 rounded">
                {currentImageIndex + 1}/{apartment.images.length}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3">
              {apartment.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-24 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList>
                <TabsTrigger value="description">Opis</TabsTrigger>
                <TabsTrigger value="amenities">Sadržaji</TabsTrigger>
                <TabsTrigger value="rules">Kućni red</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <p className="text-primary leading-relaxed">{apartment.fullDescription}</p>
              </TabsContent>

              <TabsContent value="amenities" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {apartment.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rules" className="mt-4">
                <ul className="space-y-2">
                  {apartment.houseRules.map((rule) => (
                    <li key={rule} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Box */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-card rounded-lg shadow-lg p-5 sticky top-24">
              <div className="mb-4">
                <span className="text-2xl font-bold text-heading">€{apartment.pricePerNight}</span>
                <span className="text-sm text-muted-foreground ml-1">po noćenju</span>
              </div>

              {/* Dates */}
              <div className="mb-4">
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Datumi
                </label>
                <div className="bg-cream p-3 rounded-md text-sm">
                  {formatDateRange()}
                </div>
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  Gosti
                </label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="w-full bg-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: apartment.maxGuests }).map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="border-t border-border pt-4 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      €{apartment.pricePerNight} × {nights} noć{nights > 1 ? 'i' : ''}
                    </span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Ukupno</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>
              )}

              <Button
                variant="brand"
                className="w-full"
                size="lg"
                onClick={() => setBookingDialogOpen(true)}
                disabled={!checkIn || !checkOut}
              >
                Rezerviraj
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Još uvijek nećete biti terećeni.
              </p>
            </div>
          </aside>
        </div>

        {/* Booking Dialog */}
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Zahtjev za rezervaciju</DialogTitle>
              <DialogDescription>
                Ispunite vaše podatke za slanje zahtjeva za rezervaciju apartmana{' '}
                {apartment.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Ime i prezime *</Label>
                <Input
                  id="name"
                  value={bookingForm.name}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, name: e.target.value })
                  }
                  placeholder="Unesite svoje ime i prezime"
                />
              </div>

              <div>
                <Label htmlFor="email">Email adresa *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, email: e.target.value })
                  }
                  placeholder="ime.prezime@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefon (opcionalno)</Label>
                <Input
                  id="phone"
                  value={bookingForm.phone}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, phone: e.target.value })
                  }
                  placeholder="+385 ..."
                />
              </div>

              <div className="bg-muted p-4 rounded-md text-sm">
                <p className="font-medium mb-2">Detalji rezervacije:</p>
                <p>Apartman: {apartment.name}</p>
                <p>Datumi: {formatDateRange()}</p>
                <p>Gosti: {guests}</p>
                <p className="font-semibold mt-2">Ukupno: {totalPrice.toFixed(2)} €</p>
              </div>

              <Button variant="brand" className="w-full" onClick={handleBooking}>
                Pošalji zahtjev
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
