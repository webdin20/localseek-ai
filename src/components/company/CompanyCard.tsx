import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Company } from '@/types';

type CompanyCardProps = {
  company: Company;
};

export const CompanyCard = memo(({ company }: CompanyCardProps) => {
  const minPrice = Math.min(
    ...company.services.filter((s) => s.fromPrice).map((s) => s.fromPrice!)
  );

  return (
    <Card className="hover:shadow-soft transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">
                {company.name[0]}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <Link
                  to={`/company/${company.slug}`}
                  className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
                >
                  {company.name}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {company.shortDesc}
                </p>
              </div>
              {company.verified && (
                <Badge variant="default" className="gap-1 flex-shrink-0 bg-success">
                  <CheckCircle2 className="h-3 w-3" />
                  Verificat
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{company.rating.toFixed(1)}</span>
                <span>({company.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{company.areas?.[0] || company.city}</span>
              </div>
              {!isNaN(minPrice) && (
                <span className="font-medium text-primary">De la {minPrice} RON</span>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">
                  {company.services.slice(0, 2).map((s) => s.name).join(' • ')}
                </p>
              </div>
              <Button asChild size="sm">
                <Link to={`/company/${company.slug}`}>Vezi profil</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CompanyCard.displayName = 'CompanyCard';
