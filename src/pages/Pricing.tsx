import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Basic',
    price: 49,
    features: [
      'Profil verificat',
      'Până la 5 servicii listate',
      'Răspunsuri nelimitate la cereri',
      'Statistici de bază',
    ],
  },
  {
    name: 'Premium',
    price: 99,
    features: [
      'Toate din Basic',
      'Badge "Verificat Premium"',
      'Servicii nelimitate',
      'Prioritate în rezultate',
      'Statistici avansate',
      'Galerie foto extinsă',
    ],
    highlighted: true,
  },
  {
    name: 'Gold',
    price: 199,
    features: [
      'Toate din Premium',
      'Badge "Top Expert"',
      'Poziționare #1 în oraș',
      'Manager dedicat',
      'Campanii promoționale',
      'Rapoarte personalizate',
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-hero py-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Planuri pentru firme</h1>
            <p className="text-lg text-muted-foreground">
              Alege planul potrivit pentru afacerea ta și primește mai multe cereri de ofertă
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.highlighted
                    ? 'border-primary shadow-soft scale-105'
                    : ''
                }
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> RON/lună</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="w-full"
                  >
                    <Link to="/auth">Alege {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
