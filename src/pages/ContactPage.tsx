import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: 'Greška',
        description: 'Molimo ispunite sva obavezna polja.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Poruka poslana!',
      description: 'Hvala na vašoj poruci. Javit ćemo vam se uskoro.',
    });
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-xl">
        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-semibold text-heading mb-2">
              Kontakt
            </h1>
            <p className="text-muted-foreground">
              Pošaljite nam upit putem e-maila ili telefona.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Ime i prezime</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Unesite svoje ime i prezime"
              />
            </div>

            <div>
              <Label htmlFor="email">Email adresa</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ime.prezime@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefon (opcionalno)</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+385 ..."
              />
            </div>

            <div>
              <Label htmlFor="message">Poruka</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Napišite nam za koji termin ste zainteresirani, broj gostiju i ostale detalje."
                rows={5}
              />
            </div>

            <Button variant="brand" type="submit" className="w-full" size="lg">
              Pošalji poruku
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-medium text-foreground mb-3">Kontakt podaci</h3>
            <p className="text-sm">
              Email:{' '}
              <a href="mailto:info@example.com" className="text-primary hover:underline">
                info@example.com
              </a>
            </p>
            <p className="text-sm">
              Telefon:{' '}
              <a href="tel:+38500000000" className="text-primary hover:underline">
                +385 00 000 000
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
