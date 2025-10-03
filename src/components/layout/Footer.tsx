import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-primary" />
              <span className="font-bold">Caut24</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Găsești firme reale în câteva secunde.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Pentru clienți</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Cum funcționează
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Orașe acoperite
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Categorii servicii
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Pentru firme</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/pricing" className="hover:text-foreground transition-colors">
                  Prețuri & Planuri
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-foreground transition-colors">
                  Înregistrare
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Termeni și condiții</li>
              <li>Politică confidențialitate</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          © 2025 Caut24. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
};
