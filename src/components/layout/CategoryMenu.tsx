import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import * as icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearchStore } from '@/store/useSearchStore';
import categoriesData from '@/data/categories.json';

export const CategoryMenu = () => {
  const { city, setCategory } = useSearchStore();
  const navigate = useNavigate();

  const handleSelect = (categorySlug: string) => {
    setCategory(categorySlug);
    if (city) {
      navigate(`/${city}/${categorySlug}`);
    } else {
      navigate(`/results?category=${categorySlug}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="h-4 w-4 mr-2" />
          Categorii
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        {categoriesData.map((cat) => {
          const IconComponent = (icons as any)[cat.icon] || icons.Wrench;
          return (
            <DropdownMenuItem
              key={cat.slug}
              onClick={() => handleSelect(cat.slug)}
              className="flex items-start gap-3 p-3 cursor-pointer"
            >
              <IconComponent className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">{cat.name}</div>
                {cat.description && (
                  <div className="text-xs text-muted-foreground">{cat.description}</div>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
