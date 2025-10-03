import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchStore } from '@/store/useSearchStore';
import { parseQuery } from '@/lib/queryParser';
import { exampleQueries } from '@/data/examples';

type SearchHeroProps = {
  cityContext?: string;
};

export const SearchHero = ({ cityContext }: SearchHeroProps) => {
  const [input, setInput] = useState('');
  const { setQuery, setCity, setCategory, search } = useSearchStore();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setQuery(input);
    const parsed = parseQuery(input);

    if (parsed.city && parsed.category) {
      setCity(parsed.city);
      setCategory(parsed.category);
      navigate(`/${parsed.city}/${parsed.category}?q=${encodeURIComponent(input)}`);
    } else if (parsed.city) {
      setCity(parsed.city);
      navigate(`/${parsed.city}?q=${encodeURIComponent(input)}`);
    } else if (parsed.category) {
      setCategory(parsed.category);
      const cityToUse = cityContext || '';
      if (cityToUse) {
        setCity(cityToUse);
        navigate(`/${cityToUse}/${parsed.category}?q=${encodeURIComponent(input)}`);
      } else {
        navigate(`/results?q=${encodeURIComponent(input)}`);
      }
    } else {
      navigate(`/results?q=${encodeURIComponent(input)}`);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ex: am nevoie azi de un electrician în București, sector 3"
            className="pl-12 pr-24 h-14 text-base rounded-2xl shadow-soft"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            Caută
          </Button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {exampleQueries.slice(0, 4).map((example, idx) => (
          <button
            key={idx}
            onClick={() => handleExampleClick(example)}
            className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            {example.length > 40 ? example.slice(0, 40) + '...' : example}
          </button>
        ))}
      </div>
    </div>
  );
};
