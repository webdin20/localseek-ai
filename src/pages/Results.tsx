import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AiInterpretation } from '@/components/search/AiInterpretation';
import { CompanyCard } from '@/components/company/CompanyCard';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/store/useSearchStore';
import { Skeleton } from '@/components/ui/skeleton';

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { setQuery, search, parsed, results, loading, city } = useSearchStore();

  useEffect(() => {
    if (query) {
      setQuery(query);
      search();
    }
  }, [query, setQuery, search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 py-8 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Rezultate căutare</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {parsed && <AiInterpretation parsed={parsed} />}

          <div className="flex flex-col lg:flex-row gap-8">
            {city && (
              <aside className="lg:w-64 flex-shrink-0">
                <FilterSidebar city={city} />
              </aside>
            )}

            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">
                {results.length} firme găsite
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full" />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    Nu am găsit firme pentru această căutare.
                  </p>
                  <Button asChild>
                    <Link to="/">Încearcă o altă căutare</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
