import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, X, GripVertical } from 'lucide-react';

export default function AdminApartmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isNew = id === 'new';
  const existingApartment = !isNew ? mockApartments.find((a) => a.id === id) : null;

  const [form, setForm] = useState({
    name: existingApartment?.name || '',
    subtitle: existingApartment?.subtitle || '',
    shortDescription: existingApartment?.shortDescription || '',
    fullDescription: existingApartment?.fullDescription || '',
    beds: existingApartment?.beds || 1,
    bathrooms: existingApartment?.bathrooms || 1,
    maxGuests: existingApartment?.maxGuests || 2,
    pricePerNight: existingApartment?.pricePerNight || 100,
    amenities: existingApartment?.amenities.join('\n') || '',
    houseRules: existingApartment?.houseRules.join('\n') || '',
    isActive: existingApartment?.isActive ?? true,
  });

  const [images, setImages] = useState<string[]>(existingApartment?.images || []);

  const handleSave = () => {
    if (!form.name || !form.shortDescription) {
      toast({
        title: 'Greška',
        description: 'Molimo ispunite naziv i kratak opis.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Spremljeno!',
      description: isNew ? 'Apartman je uspješno dodan.' : 'Apartman je uspješno ažuriran.',
    });
    navigate('/admin/apartments');
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button
        onClick={() => navigate('/admin/apartments')}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Natrag na apartmane
      </button>

      <h1 className="font-heading text-3xl font-semibold text-heading mb-8">
        {isNew ? 'Novi apartman' : `Uredi: ${existingApartment?.name}`}
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-medium text-heading mb-4">Osnovni podaci</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Naziv apartmana *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Podnaslov</Label>
                <Input
                  id="subtitle"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="mt-1"
                  placeholder="npr. Suite 1"
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Kratak opis *</Label>
                <Textarea
                  id="shortDescription"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="fullDescription">Puni opis</Label>
                <Textarea
                  id="fullDescription"
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="mt-1"
                  rows={5}
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-medium text-heading mb-4">Kapacitet i cijena</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="beds">Broj kreveta</Label>
                <Input
                  id="beds"
                  type="number"
                  min={1}
                  value={form.beds}
                  onChange={(e) => setForm({ ...form, beds: parseInt(e.target.value) || 1 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Kupaonice</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min={1}
                  value={form.bathrooms}
                  onChange={(e) => setForm({ ...form, bathrooms: parseInt(e.target.value) || 1 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="maxGuests">Max gostiju</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  min={1}
                  value={form.maxGuests}
                  onChange={(e) => setForm({ ...form, maxGuests: parseInt(e.target.value) || 1 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="pricePerNight">Cijena/noć (€)</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  min={0}
                  value={form.pricePerNight}
                  onChange={(e) => setForm({ ...form, pricePerNight: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-medium text-heading mb-4">Dodatne informacije</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amenities">Sadržaji (jedan po liniji)</Label>
                <Textarea
                  id="amenities"
                  value={form.amenities}
                  onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                  className="mt-1"
                  rows={4}
                  placeholder="Air conditioning&#10;Free WiFi&#10;TV"
                />
              </div>

              <div>
                <Label htmlFor="houseRules">Kućni red (jedan po liniji)</Label>
                <Textarea
                  id="houseRules"
                  value={form.houseRules}
                  onChange={(e) => setForm({ ...form, houseRules: e.target.value })}
                  className="mt-1"
                  rows={3}
                  placeholder="No smoking&#10;No pets"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Images & Status */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-medium text-heading mb-4">Slike</h2>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Povucite slike ovdje ili kliknite za odabir
              </p>
              <Button variant="outline" size="sm">
                Odaberi slike
              </Button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute top-1 left-1 w-6 h-6 bg-background/80 rounded flex items-center justify-center cursor-move">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-medium text-heading mb-4">Status</h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Apartman aktivan</p>
                <p className="text-sm text-muted-foreground">
                  Aktivni apartmani su vidljivi posjetiteljima
                </p>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1" onClick={() => navigate('/admin/apartments')}>
              Odustani
            </Button>
            <Button variant="admin" className="flex-1" onClick={handleSave}>
              {isNew ? 'Dodaj apartman' : 'Spremi promjene'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
