import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  useSmoothScroll();
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-container py-32 sm:py-40">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p className="text-lg">
            Our Terms of Service will be updated soon. Please check back later for the complete terms and conditions governing your use of our platform.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
