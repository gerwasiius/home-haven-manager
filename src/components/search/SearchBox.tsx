import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { hr } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

interface SearchBoxProps {
  variant?: 'hero' | 'sidebar';
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  initialGuests?: number;
}

export function SearchBox({
  variant = 'hero',
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}: SearchBoxProps) {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialCheckIn && initialCheckOut
      ? { from: initialCheckIn, to: initialCheckOut }
      : undefined
  );
  const [guests, setGuests] = useState(initialGuests.toString());

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (dateRange?.from) {
      params.set('from', format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange?.to) {
      params.set('to', format(dateRange.to, 'yyyy-MM-dd'));
    }
    params.set('guests', guests);
    navigate(`/apartments?${params.toString()}`);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return 'Od — Do';
    if (!dateRange?.to) return format(dateRange.from, 'd. MMM yyyy', { locale: hr });
    return `${format(dateRange.from, 'd. MMM yyyy', { locale: hr })} - ${format(dateRange.to, 'd. MMM yyyy', { locale: hr })}`;
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={cn(
        'bg-card rounded-lg shadow-lg',
        isHero ? 'p-6 max-w-md mx-auto' : 'p-5'
      )}
    >
      {!isHero && (
        <h3 className="font-heading text-lg font-semibold text-heading mb-4">
          Pretraži apartmane
        </h3>
      )}

      <div className="space-y-4">
        {/* Date Range */}
        <div>
          <label className="flex items-center text-sm font-medium text-foreground mb-2">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            {isHero ? 'Odaberite datum:' : 'Datumi'}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                {formatDateRange()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="flex items-center text-sm font-medium text-foreground mb-2">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            {isHero ? 'Odaberite broj gostiju:' : 'Gosti'}
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Broj gostiju" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button variant="brand" className="w-full" size="lg" onClick={handleSearch}>
          Pretraži dostupnost
        </Button>
      </div>
    </div>
  );
}
