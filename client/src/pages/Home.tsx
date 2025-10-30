import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Weight, Brain, Video, Goal } from "lucide-react";

interface ServicePortal {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ReactNode;
  image: string;
}

const servicePortals: ServicePortal[] = [
  {
    id: "weight",
    title: "Fysisk helse",
    shortDesc: "Sterkere kropp, mer energi",
    fullDesc: "Vektnedgang som endrer både kropp og mentalt. Jeg hjelper deg med å finne en enkel og effektiv vei til bedre helse. Ikke lange prosesser – bare resultater som varer.",
    icon: <Weight className="w-8 h-8" />,
    image: "/weight-loss.jpg"
  },
  {
    id: "drone",
    title: "Dronefilm",
    shortDesc: "Oppdrag kropp, & mer energi",
    fullDesc: "Flotte videoprosjekter for bedrifter og huseiere. Jeg leverer profesjonelle droneopptak som viser eiendommen eller bedriften din fra sitt beste perspektiv.",
    icon: <Video className="w-8 h-8" />,
    image: "/drone-landscape.jpg"
  },
  {
    id: "mental",
    title: "Mental styrke",
    shortDesc: "Finn hjelp med å hjelpe barná dinet",
    fullDesc: "Psykisk helsehjelp for alle aldre. Jeg jobber med stress, angst og mental klarhet. Du får verktøy som fungerer – enkelt og effektivt.",
    icon: <Brain className="w-8 h-8" />,
    image: "/mental-health.jpg"
  },
  {
    id: "goalkeeper",
    title: "Idrettsviphing",
    shortDesc: "Finn infre o f unge dine",
    fullDesc: "Fotballtrening for barn som vil bli bedre keepere. Jeg fokuserer på teknikk, selvtillit og spilleglede. Barna lærer raskt og får resultater.",
    icon: <Goal className="w-8 h-8" />,
    image: "/goalkeeper.webp"
  }
];

export default function Home() {
  const [selectedPortal, setSelectedPortal] = useState<ServicePortal | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");

  const newsQuery = trpc.news.list.useQuery();
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Takk for at du meldte deg på nyhetsbrevet!");
      setNewsletterEmail("");
      setNewsletterName("");
    },
    onError: () => {
      toast.error("Noe gikk galt. Prøv igjen.");
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Vennligst fyll inn e-postadressen din");
      return;
    }
    subscribeMutation.mutate({ email: newsletterEmail, name: newsletterName });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content - Left */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Hei, jeg er Morten.
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-muted-foreground">
              Jeg skriver med høyre og sparker med venstre.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Kanskje er det derfor jeg lykkes med å krysskoble kunnskap og erfaring fra mange områder for å finne enkle og effektive løsninger som virker for deg.
            </p>
          </div>

          {/* Portrait - Right */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <img 
                src="/morten-hero.png" 
                alt="Morten Hoel" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Portals - Horizontal Row */}
      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {servicePortals.map((portal) => (
            <Card 
              key={portal.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
              onClick={() => setSelectedPortal(portal)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={portal.image} 
                  alt={portal.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-primary">
                    {portal.icon}
                  </div>
                  <CardTitle className="text-2xl">{portal.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {portal.shortDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  GÅ TIL PORTAL
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Portal Detail Dialog */}
      <Dialog open={!!selectedPortal} onOpenChange={() => setSelectedPortal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl flex items-center gap-3">
              <span className="text-primary">{selectedPortal?.icon}</span>
              {selectedPortal?.title}
            </DialogTitle>
            <DialogDescription className="text-lg pt-4">
              {selectedPortal?.fullDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img 
              src={selectedPortal?.image} 
              alt={selectedPortal?.title}
              className="w-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Section */}
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Chatbot */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Chatbot</CardTitle>
              <CardDescription>
                Still meg et spørsmål...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-center py-8">
                <p>Chat-funksjonalitet kommer snart</p>
              </div>
            </CardContent>
          </Card>

          {/* News/Aktuelt */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Aktuelt</CardTitle>
              <CardDescription>
                Siste nyheter og tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              {newsQuery.isLoading ? (
                <p className="text-muted-foreground">Laster...</p>
              ) : newsQuery.data && newsQuery.data.length > 0 ? (
                <div className="space-y-4">
                  {newsQuery.data.slice(0, 3).map((post) => (
                    <div key={post.id} className="border-b border-border pb-4 last:border-0">
                      <h4 className="font-semibold mb-1">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {post.excerpt || post.content.substring(0, 100) + "..."}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <h4 className="font-semibold mb-1">20% rabatt på alle kurs!</h4>
                    <p className="text-sm text-muted-foreground">
                      Spesialtilbud denne måneden
                    </p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <h4 className="font-semibold mb-1">Ny video ute nå</h4>
                    <p className="text-sm text-muted-foreground">
                      Se vårt nyeste droneprosjekt
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container py-12 pb-20">
        <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Meld deg på nyhetsbrevet</CardTitle>
            <CardDescription className="text-base">
              Få tips, inspirasjon og nyheter direkte i innboksen din
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <Input 
                  type="text"
                  placeholder="Navn (valgfritt)"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div>
                <Input 
                  type="email"
                  placeholder="Din e-postadresse"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? "Melder deg på..." : "Meld deg på"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
