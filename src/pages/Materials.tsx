import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import MaterialBank from "@/components/admin/MaterialBank";

const Materials = () => {
  const { loading } = useAuth(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[132px] pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-black mb-2 text-foreground text-center">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Materiaalipankki
            </span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Luo ja hallinnoi some-sisältöä yhteistyökumppaneille
          </p>
          <MaterialBank />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Materials;
