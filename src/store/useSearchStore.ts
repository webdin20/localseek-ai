import { create } from 'zustand';
import type { Company, Filters, ParsedQuery, SortOption } from '@/types';
import { parseQuery } from '@/lib/queryParser';
import { scoreCompany } from '@/lib/scoring';
import companiesData from '@/data/companies.json';

type SearchState = {
  query: string;
  city?: string;
  category?: string;
  parsed?: ParsedQuery;
  filters: Filters;
  sort: SortOption;
  page: number;
  pageSize: number;
  results: Company[];
  loading: boolean;
  error?: string;

  setQuery: (query: string) => void;
  setCity: (city?: string) => void;
  setCategory: (category?: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setSort: (sort: SortOption) => void;
  setPage: (page: number) => void;
  search: () => void;
  reset: () => void;
};

const initialFilters: Filters = {
  areas: [],
  verified: undefined,
  ratingMin: undefined,
  priceMin: undefined,
  priceMax: undefined,
  availability: undefined,
};

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  filters: initialFilters,
  sort: 'relevance',
  page: 1,
  pageSize: 10,
  results: [],
  loading: false,

  setQuery: (query) => set({ query }),
  setCity: (city) => set({ city }),
  setCategory: (category) => set({ category }),
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setSort: (sort) => {
    set({ sort, page: 1 });
    get().search();
  },
  setPage: (page) => {
    set({ page });
    get().search();
  },

  search: () => {
    const { query, city, category, filters, sort } = get();
    set({ loading: true, error: undefined });

    try {
      const parsed = query ? parseQuery(query) : undefined;
      let filtered = [...(companiesData as Company[])];

      // Apply city filter
      const cityToUse = city || parsed?.city;
      if (cityToUse) {
        filtered = filtered.filter((c) => c.city === cityToUse);
      }

      // Apply category filter
      const categoryToUse = category || parsed?.category;
      if (categoryToUse) {
        filtered = filtered.filter((c) => c.categories.includes(categoryToUse));
      }

      // Apply areas filter
      if (filters.areas.length > 0) {
        filtered = filtered.filter((c) =>
          c.areas?.some((a) => filters.areas.includes(a))
        );
      }

      // Apply verified filter
      if (filters.verified !== undefined) {
        filtered = filtered.filter((c) => c.verified === filters.verified);
      }

      // Apply rating filter
      if (filters.ratingMin !== undefined) {
        filtered = filtered.filter((c) => c.rating >= filters.ratingMin!);
      }

      // Apply price filter
      if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        filtered = filtered.filter((c) => {
          const minPrice = Math.min(
            ...c.services
              .filter((s) => s.fromPrice !== undefined)
              .map((s) => s.fromPrice!)
          );
          if (isNaN(minPrice)) return false;
          if (filters.priceMin && minPrice < filters.priceMin) return false;
          if (filters.priceMax && minPrice > filters.priceMax) return false;
          return true;
        });
      }

      // Score and sort
      const scored = filtered.map((c) => ({
        ...c,
        score: scoreCompany(c, parsed, categoryToUse, cityToUse),
      }));

      switch (sort) {
        case 'relevance':
          scored.sort((a, b) => b.score - a.score);
          break;
        case 'rating':
          scored.sort((a, b) => b.rating - a.rating);
          break;
        case 'priceAsc':
          scored.sort((a, b) => {
            const aMin = Math.min(...a.services.map((s) => s.fromPrice || Infinity));
            const bMin = Math.min(...b.services.map((s) => s.fromPrice || Infinity));
            return aMin - bMin;
          });
          break;
        case 'priceDesc':
          scored.sort((a, b) => {
            const aMin = Math.min(...a.services.map((s) => s.fromPrice || Infinity));
            const bMin = Math.min(...b.services.map((s) => s.fromPrice || Infinity));
            return bMin - aMin;
          });
          break;
        case 'recent':
          scored.sort((a, b) => (a.lastActiveDays || 999) - (b.lastActiveDays || 999));
          break;
      }

      set({ results: scored, parsed, loading: false });
    } catch (error) {
      set({ error: 'A apărut o eroare la căutare', loading: false });
    }
  },

  reset: () =>
    set({
      query: '',
      city: undefined,
      category: undefined,
      parsed: undefined,
      filters: initialFilters,
      sort: 'relevance',
      page: 1,
      results: [],
      loading: false,
      error: undefined,
    }),
}));
