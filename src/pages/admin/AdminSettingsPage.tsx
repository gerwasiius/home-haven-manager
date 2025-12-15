import { useState } from 'react';
import { mockSettings } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(mockSettings);

  const handleSave = () => {
    toast({
      title: 'Spremljeno!',
      description: 'Postavke su uspješno ažurirane.',
    });
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-heading mb-8">Podešavanja</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Settings */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="font-medium text-heading mb-4">Podaci za plaćanje</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bankAccount">Naziv računa</Label>
              <Input
                id="bankAccount"
                value={settings.bankAccount}
                onChange={(e) => setSettings({ ...settings, bankAccount: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                value={settings.iban}
                onChange={(e) => setSettings({ ...settings, iban: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="currency">Valuta</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="paymentDeadline">Rok za plaćanje (dana)</Label>
              <Input
                id="paymentDeadline"
                type="number"
                min={1}
                value={settings.paymentDeadlineDays}
                onChange={(e) =>
                  setSettings({ ...settings, paymentDeadlineDays: parseInt(e.target.value) || 7 })
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="font-medium text-heading mb-4">Email predlošci</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="emailReceived">Potvrda primitka rezervacije</Label>
              <Textarea
                id="emailReceived"
                value={settings.emailTemplates.reservationReceived}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailTemplates: {
                      ...settings.emailTemplates,
                      reservationReceived: e.target.value,
                    },
                  })
                }
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="emailPayment">Upute za plaćanje</Label>
              <Textarea
                id="emailPayment"
                value={settings.emailTemplates.paymentInstructions}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailTemplates: {
                      ...settings.emailTemplates,
                      paymentInstructions: e.target.value,
                    },
                  })
                }
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="emailConfirmed">Potvrda rezervacije</Label>
              <Textarea
                id="emailConfirmed"
                value={settings.emailTemplates.reservationConfirmed}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailTemplates: {
                      ...settings.emailTemplates,
                      reservationConfirmed: e.target.value,
                    },
                  })
                }
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="emailCancelled">Otkazivanje rezervacije</Label>
              <Textarea
                id="emailCancelled"
                value={settings.emailTemplates.reservationCancelled}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailTemplates: {
                      ...settings.emailTemplates,
                      reservationCancelled: e.target.value,
                    },
                  })
                }
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="admin" onClick={handleSave}>
          Spremi postavke
        </Button>
      </div>
    </div>
  );
}
