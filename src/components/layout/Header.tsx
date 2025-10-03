import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CitySwitcher } from './CitySwitcher';
import { CategoryMenu } from './CategoryMenu';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Search className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">
            Caut24
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <CitySwitcher />
          <CategoryMenu />
        </nav>

        <Button asChild variant="default" className="hidden md:inline-flex">
          <Link to="/pricing">Înregistrează firma</Link>
        </Button>

        <div className="md:hidden flex items-center gap-2">
          <CitySwitcher />
          <CategoryMenu />
        </div>
      </div>
    </header>
  );
};
