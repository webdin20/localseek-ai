import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Star, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactDialog } from '@/components/company/ContactDialog';
import companiesData from '@/data/companies.json';
import citiesData from '@/data/cities.json';
import categoriesData from '@/data/categories.json';
import { useState } from 'react';

const CompanyProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contactOpen, setContactOpen] = useState(false);

  const company = companiesData.find((c) => c.slug === slug);

  if (!company) {
    return <Navigate to="/" replace />;
  }

  const cityData = citiesData.find((c) => c.slug === company.city);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-hero py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="h-24 w-24 rounded-2xl bg-card flex items-center justify-center flex-shrink-0 shadow-soft">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="h-full w-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-4xl font-bold text-primary">{company.name[0]}</span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <h1 className="text-3xl font-bold">{company.name}</h1>
                  {company.verified && (
                    <Badge className="bg-success gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verificat
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-4">{company.shortDesc}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{company.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({company.reviewsCount} recenzii)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{cityData?.name}</span>
                  </div>
                  {company.lastActiveDays !== undefined && (
                    <span className="text-muted-foreground">
                      Ultima activitate: acum {company.lastActiveDays} {company.lastActiveDays === 1 ? 'zi' : 'zile'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.categories.map((catSlug) => {
                    const cat = categoriesData.find((c) => c.slug === catSlug);
                    return cat ? (
                      <Link key={catSlug} to={`/${company.city}/${catSlug}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          {cat.name}
                        </Badge>
                      </Link>
                    ) : null;
                  })}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => setContactOpen(true)}>
                    Cere ofertă
                  </Button>
                  {company.phone && (
                    <Button variant="outline" size="lg" asChild>
                      <a href={`tel:${company.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Sună
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="about">Despre</TabsTrigger>
              <TabsTrigger value="services">Servicii & Prețuri</TabsTrigger>
              <TabsTrigger value="reviews">Recenzii</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Despre companie</h2>
                  <p className="text-muted-foreground mb-6">
                    {company.description || company.shortDesc}
                  </p>

                  <h3 className="font-semibold mb-3">Zone acoperite</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {company.areas?.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="font-semibold mb-3">Contact</h3>
                  <div className="space-y-2 text-sm">
                    {company.phone && <p>Telefon: {company.phone}</p>}
                    {company.whatsapp && <p>WhatsApp: {company.whatsapp}</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Servicii oferite</h2>
                  <div className="space-y-4">
                    {company.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                      >
                        <span className="font-medium">{service.name}</span>
                        {service.fromPrice && (
                          <span className="text-primary font-semibold">
                            De la {service.fromPrice} RON
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Recenzii</h2>
                  <div className="text-center py-8 text-muted-foreground">
                    Această secțiune va conține recenziile clienților.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} companyName={company.name} />
    </div>
  );
};

export default CompanyProfile;
