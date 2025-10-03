import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useSearchStore } from '@/store/useSearchStore';
import citiesData from '@/data/cities.json';

export const CitySwitcher = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { city, category, setCity } = useSearchStore();
  const navigate = useNavigate();

  const currentCity = citiesData.find((c) => c.slug === city);

  const filteredCities = citiesData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (citySlug: string) => {
    setCity(citySlug);
    setOpen(false);
    if (category) {
      navigate(`/${citySlug}/${category}`);
    } else {
      navigate(`/${citySlug}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[140px]"
        >
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{currentCity?.name || 'Oraș'}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <div className="p-2 border-b">
          <Input
            placeholder="Scrie un oraș..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-1">
          {filteredCities.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Niciun oraș găsit
            </div>
          )}
          {filteredCities.map((c) => (
            <button
              key={c.slug}
              onClick={() => handleSelect(c.slug)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
            >
              {city === c.slug && <Check className="h-4 w-4 text-primary" />}
              <span className={city === c.slug ? 'font-medium' : ''}>{c.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
