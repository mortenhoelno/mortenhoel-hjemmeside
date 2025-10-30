import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const utils = trpc.useUtils();
  const createPostMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success("Nyhet publisert!");
      setTitle("");
      setContent("");
      setExcerpt("");
      utils.news.list.invalidate();
    },
    onError: () => {
      toast.error("Kunne ikke publisere nyhet");
    }
  });

  const subscribersQuery = trpc.newsletter.listSubscribers.useQuery();

  if (loading) {
    return <div className="container py-12">Laster...</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Ingen tilgang</CardTitle>
            <CardDescription>Du må være administrator for å se denne siden</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")}>Tilbake til forsiden</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Tittel og innhold er påkrevd");
      return;
    }
    createPostMutation.mutate({ title, content, excerpt, published: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create News Post */}
          <Card>
            <CardHeader>
              <CardTitle>Publiser nyhet</CardTitle>
              <CardDescription>Legg til ny nyhet på forsiden</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tittel</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tittel på nyheten"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Kort beskrivelse (valgfritt)</label>
                  <Input
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Kort sammendrag"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Innhold</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Innholdet i nyheten"
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" disabled={createPostMutation.isPending}>
                  {createPostMutation.isPending ? "Publiserer..." : "Publiser"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Newsletter Subscribers */}
          <Card>
            <CardHeader>
              <CardTitle>Nyhetsbrev abonnenter</CardTitle>
              <CardDescription>
                {subscribersQuery.data?.length || 0} abonnenter
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscribersQuery.isLoading ? (
                <p className="text-muted-foreground">Laster...</p>
              ) : subscribersQuery.data && subscribersQuery.data.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {subscribersQuery.data.map((subscriber) => (
                    <div key={subscriber.id} className="border-b border-border pb-2">
                      <p className="font-medium">{subscriber.name || "Ingen navn"}</p>
                      <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Ingen abonnenter ennå</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button variant="outline" onClick={() => setLocation("/")}>
            Tilbake til forsiden
          </Button>
        </div>
      </div>
    </div>
  );
}
