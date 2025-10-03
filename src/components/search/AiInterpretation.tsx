import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ParsedQuery } from '@/types';
import citiesData from '@/data/cities.json';
import categoriesData from '@/data/categories.json';

type AiInterpretationProps = {
  parsed: ParsedQuery;
};

export const AiInterpretation = ({ parsed }: AiInterpretationProps) => {
  const city = citiesData.find((c) => c.slug === parsed.city);
  const category = categoriesData.find((c) => c.slug === parsed.category);

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium">Ai căutat: &quot;{parsed.raw}&quot;</p>
          <div className="flex flex-wrap gap-2">
            {city && (
              <Badge variant="secondary" className="gap-1">
                <span className="text-xs">📍</span> {city.name}
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="gap-1">
                <span className="text-xs">🔧</span> {category.name}
              </Badge>
            )}
            {parsed.urgency && parsed.urgency !== 'flexibil' && (
              <Badge variant="secondary" className="gap-1">
                <span className="text-xs">⏰</span> {parsed.urgency}
              </Badge>
            )}
            {parsed.budgetLevel && (
              <Badge variant="secondary" className="gap-1">
                <span className="text-xs">💰</span> Buget {parsed.budgetLevel}
              </Badge>
            )}
            {parsed.areas && parsed.areas.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <span className="text-xs">📌</span> {parsed.areas.join(', ')}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
