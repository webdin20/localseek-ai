import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchHero } from '@/components/search/SearchHero';
import * as icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import citiesData from '@/data/cities.json';
import categoriesData from '@/data/categories.json';
import { useSearchStore } from '@/store/useSearchStore';
import { useEffect } from 'react';

const CityHome = () => {
  const { city } = useParams<{ city: string }>();
  const { setCity, setCategory } = useSearchStore();

  const cityData = citiesData.find((c) => c.slug === city);

  useEffect(() => {
    if (cityData) {
      setCity(cityData.slug);
    }
  }, [cityData, setCity]);

  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-hero py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Caută servicii în {cityData.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descrie ce ai nevoie și găsește rapid firme verificate în {cityData.name}
            </p>
            <SearchHero cityContext={cityData.slug} />
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Categorii populare în {cityData.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoriesData.map((cat) => {
                const IconComponent = (icons as any)[cat.icon] || icons.Wrench;
                return (
                  <Link
                    key={cat.slug}
                    to={`/${cityData.slug}/${cat.slug}`}
                    onClick={() => setCategory(cat.slug)}
                  >
                    <Card className="p-6 hover:shadow-soft transition-all hover:scale-105 cursor-pointer">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-medium">{cat.name}</span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CityHome;
