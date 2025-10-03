import { useEffect } from 'react';
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AiInterpretation } from '@/components/search/AiInterpretation';
import { CompanyCard } from '@/components/company/CompanyCard';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/store/useSearchStore';
import citiesData from '@/data/cities.json';
import categoriesData from '@/data/categories.json';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const CategoryListing = () => {
  const { city, category } = useParams<{ city: string; category: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const {
    setQuery,
    setCity,
    setCategory,
    search,
    parsed,
    results,
    loading,
    page,
    pageSize,
    setPage,
  } = useSearchStore();

  const cityData = citiesData.find((c) => c.slug === city);
  const categoryData = categoriesData.find((c) => c.slug === category);

  useEffect(() => {
    if (cityData && categoryData) {
      setCity(cityData.slug);
      setCategory(categoryData.slug);
      if (query) {
        setQuery(query);
      }
      search();
    }
  }, [city, category, query, cityData, categoryData, setCity, setCategory, setQuery, search]);

  if (!cityData || !categoryData) {
    return <Navigate to="/" replace />;
  }

  const totalPages = Math.ceil(results.length / pageSize);
  const paginatedResults = results.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 py-8 px-4 border-b">
          <div className="container mx-auto">
            <div className="text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-foreground">Acasă</Link>
              {' / '}
              <Link to={`/${cityData.slug}`} className="hover:text-foreground">{cityData.name}</Link>
              {' / '}
              <span className="text-foreground">{categoryData.name}</span>
            </div>
            <h1 className="text-3xl font-bold">{categoryData.name} în {cityData.name}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {parsed && <AiInterpretation parsed={parsed} />}

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <FilterSidebar city={cityData.slug} />
            </aside>

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
              ) : paginatedResults.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    Nu am găsit firme pentru această căutare.
                  </p>
                  <Button asChild>
                    <Link to="/">Încearcă o altă căutare</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {paginatedResults.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => page > 1 && setPage(page - 1)}
                            className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setPage(i + 1)}
                              isActive={page === i + 1}
                              className="cursor-pointer"
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => page < totalPages && setPage(page + 1)}
                            className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryListing;
