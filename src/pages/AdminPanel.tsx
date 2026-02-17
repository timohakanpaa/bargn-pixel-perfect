import { useAuth } from "@/hooks/use-auth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Activity, BarChart3, FileText, GitBranch, ShieldCheck, 
  Palette, User, LogOut, Shield
} from "lucide-react";

const adminTools = [
  {
    title: "Blog Admin",
    description: "Hallinnoi artikkeleita, luo ja ajasta sisältöä tekoälyllä",
    icon: FileText,
    path: "/blog/admin",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Blog Dashboard",
    description: "Blogijärjestelmän koontinäyttö ja tilastot",
    icon: FileText,
    path: "/blog/admin/dashboard",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Analytics",
    description: "Sivuston analytiikka, kävijätiedot ja tapahtumat",
    icon: BarChart3,
    path: "/analytics",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Performance",
    description: "Core Web Vitals ja suorituskykymittarit",
    icon: Activity,
    path: "/performance",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Funnels",
    description: "Konversiosuppilot, kohortti- ja pudotusanalyysi",
    icon: GitBranch,
    path: "/funnels",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Materiaalipankki",
    description: "Sosiaalisen median sisällöt ja markkinointimateriaalit",
    icon: Palette,
    path: "/materials",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Site Audit",
    description: "Tarkista linkit, käännökset, kuvat ja UI:n yhtenäisyys",
    icon: ShieldCheck,
    path: "/site-audit",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

const AdminPanel = () => {
  const { user, signOut } = useAuth();

  return (
    <AdminGuard>
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px] pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-black text-primary">
                  Admin Panel
                </h1>
              </div>
              <p className="text-muted-foreground">
                Kaikki hallinta&shy;työkalut yhdessä paikassa
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {user?.email}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Kirjaudu ulos
              </Button>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/30 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 ${tool.color}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Quick Links */}
          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="text-lg">PikaLinkit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/blog">Blogi (julkinen)</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/">Etusivu</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/partners">Kumppanit</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/members">Jäsenet</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="https://buy.stripe.com/fZu9AT5Oobc1fY65Lu3ZK04" target="_blank" rel="noopener noreferrer">
                    Stripe Checkout
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
    </AdminGuard>
  );
};

export default AdminPanel;
