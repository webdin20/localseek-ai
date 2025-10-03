import { useSearchStore } from '@/store/useSearchStore';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import citiesData from '@/data/cities.json';

type FilterSidebarProps = {
  city: string;
};

export const FilterSidebar = ({ city }: FilterSidebarProps) => {
  const { filters, setFilters, sort, setSort, search } = useSearchStore();
  const cityData = citiesData.find((c) => c.slug === city);

  const handleAreaToggle = (area: string) => {
    const newAreas = filters.areas.includes(area)
      ? filters.areas.filter((a) => a !== area)
      : [...filters.areas, area];
    setFilters({ areas: newAreas });
    search();
  };

  const handleVerifiedChange = (checked: boolean) => {
    setFilters({ verified: checked ? true : undefined });
    search();
  };

  const handlePriceChange = (values: number[]) => {
    setFilters({ priceMin: values[0], priceMax: values[1] });
  };

  const handlePriceChangeEnd = () => {
    search();
  };

  return (
    <Card className="p-4 sticky top-20">
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 block">Sortare</Label>
          <Select value={sort} onValueChange={(v: any) => setSort(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevanță</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="priceAsc">Preț crescător</SelectItem>
              <SelectItem value="priceDesc">Preț descrescător</SelectItem>
              <SelectItem value="recent">Activitate recentă</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {cityData?.areas && cityData.areas.length > 0 && (
          <div>
            <Label className="text-sm font-semibold mb-3 block">Zone</Label>
            <div className="flex flex-wrap gap-2">
              {cityData.areas.map((area) => (
                <Badge
                  key={area}
                  variant={filters.areas.includes(area) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleAreaToggle(area)}
                >
                  {area}
                  {filters.areas.includes(area) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold">Verificat</Label>
            <Switch
              checked={filters.verified || false}
              onCheckedChange={handleVerifiedChange}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Preț orientativ: {filters.priceMin || 0} - {filters.priceMax || 2000} RON
          </Label>
          <Slider
            min={0}
            max={2000}
            step={50}
            value={[filters.priceMin || 0, filters.priceMax || 2000]}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceChangeEnd}
            className="mb-2"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-3 block">Rating minim</Label>
          <Select
            value={filters.ratingMin?.toString() || 'none'}
            onValueChange={(v) => {
              setFilters({ ratingMin: v === 'none' ? undefined : parseFloat(v) });
              search();
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Orice rating</SelectItem>
              <SelectItem value="3.5">3.5+</SelectItem>
              <SelectItem value="4.0">4.0+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
