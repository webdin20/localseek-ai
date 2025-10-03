import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MessageSquare, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Vizualizări profil', value: '1,234', icon: Eye, change: '+12%' },
    { label: 'Cereri de ofertă', value: '45', icon: MessageSquare, change: '+8%' },
    { label: 'Rating mediu', value: '4.8', icon: TrendingUp, change: '+0.2' },
    { label: 'Total clienți', value: '89', icon: Users, change: '+15' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-hero py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Bine ai revenit! Iată o privire de ansamblu.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-success mt-1">{stat.change} față de luna trecută</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cereri recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">Cerere #{i}</p>
                      <p className="text-sm text-muted-foreground">Acum 2 ore • Sector 3</p>
                    </div>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Nou
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
