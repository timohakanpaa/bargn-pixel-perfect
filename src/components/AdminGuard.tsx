import { useAuth } from "@/hooks/use-auth";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { isAdmin, loading } = useAuth(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-[132px] flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-[132px] flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full mx-6">
            <CardContent className="pt-12 pb-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
              <h2 className="text-2xl font-black mb-2">Pääsy estetty</h2>
              <p className="text-muted-foreground mb-6">
                Tämä sivu on vain admin-käyttäjille.
              </p>
              <Button asChild>
                <Link to="/auth">Kirjaudu sisään</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
