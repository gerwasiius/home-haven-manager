import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Calendar,
  Home,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { mockReservations, mockApartments } from "@/data/mockData";
import { format } from "date-fns";

const AdminReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const reservation = mockReservations.find(r => r.id === id);
  const apartment = reservation ? mockApartments.find(a => a.id === reservation.apartmentId) : null;

  if (!reservation || !apartment) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Rezervacija nije pronađena.</p>
        <Button variant="outline" onClick={() => navigate("/admin/reservations")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Povratak na rezervacije
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Na čekanju</Badge>;
      case "payment_pending":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Čeka uplatu</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Potvrđeno</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Otkazano</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Isteklo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const nights = Math.ceil((new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/reservations")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Rezervacija #{reservation.id}</h1>
            <p className="text-muted-foreground text-sm">Kreirana {format(new Date(reservation.createdAt), "dd.MM.yyyy. HH:mm")}</p>
          </div>
        </div>
        {getStatusBadge(reservation.status)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Guest Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                Podaci o gostu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ime i prezime</p>
                  <p className="font-medium">{reservation.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{reservation.guestEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium">{reservation.guestPhone || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Broj gostiju</p>
                  <p className="font-medium">{reservation.guests}</p>
                </div>
              </div>
              {reservation.notes && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Napomena gosta</p>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">{reservation.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Apartment & Dates */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="w-5 h-5 text-muted-foreground" />
                Smještaj i termini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={apartment.images[0]} 
                  alt={apartment.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{apartment.name}</p>
                  <p className="text-sm text-muted-foreground">{apartment.subtitle}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="font-medium">{format(new Date(reservation.checkIn), "dd.MM.yyyy.")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="font-medium">{format(new Date(reservation.checkOut), "dd.MM.yyyy.")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Noćenja</p>
                  <p className="font-medium">{nights}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Vremenska linija
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservation.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        event.action.includes('kreirana') ? 'bg-blue-500' :
                        event.action.includes('plaćanje') ? 'bg-yellow-500' :
                        event.action.includes('Potvrđena') ? 'bg-green-500' :
                        event.action.includes('Otkazana') ? 'bg-red-500' :
                        'bg-gray-400'
                      }`} />
                      {index < reservation.timeline.length - 1 && (
                        <div className="w-px h-full bg-border flex-1 mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-sm">{event.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(event.timestamp), "dd.MM.yyyy. HH:mm")}
                      </p>
                      {event.details && (
                        <p className="text-xs text-muted-foreground mt-1">{event.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                Plaćanje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{nights} noćenja × {apartment.pricePerNight}€</span>
                <span>{nights * apartment.pricePerNight}€</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Ukupno</span>
                <span>{reservation.totalAmount}€</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Akcije</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {reservation.status === "pending" && (
                <Button className="w-full" variant="default">
                  <Mail className="w-4 h-4 mr-2" />
                  Pošalji upute za plaćanje
                </Button>
              )}
              {reservation.status === "payment_pending" && (
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Potvrdi rezervaciju
                </Button>
              )}
              {(reservation.status === "pending" || reservation.status === "payment_pending") && (
                <Button className="w-full" variant="outline">
                  <XCircle className="w-4 h-4 mr-2" />
                  Otkaži rezervaciju
                </Button>
              )}
              <Button className="w-full" variant="ghost">
                <MessageSquare className="w-4 h-4 mr-2" />
                Dodaj napomenu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminReservationDetailPage;
