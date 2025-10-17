import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Star,
  CalendarClock,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useDirectoryData } from "../features/directory/useDirectoryData";

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, isLoading } = useDirectoryData();

  const item = useMemo(() => items.find((entry) => entry.id === id), [id, items]);

  if (isLoading) {
    return (
      <Card className="mx-auto max-w-4xl animate-pulse border border-dashed border-fsu-gold/40 bg-white/70 p-10">
        <div className="h-64 w-full rounded-3xl bg-fsu-gold/20" />
        <div className="mt-6 space-y-4">
          <div className="h-6 w-3/4 rounded-full bg-fsu-garnet/20" />
          <div className="h-4 w-full rounded-full bg-fsu-garnet/10" />
          <div className="grid gap-3 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-12 rounded-2xl bg-fsu-gold/20" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!item) {
    return (
      <Card className="mx-auto max-w-3xl border-dashed border-fsu-garnet/40 bg-white/80 p-10 text-center">
        <CardHeader className="items-center gap-4">
          <CardTitle className="text-2xl">We could not find that listing</CardTitle>
          <CardDescription>
            The resource you are looking for might have been archived. Go back to the directory to browse other opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => navigate("/", { replace: true })} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to catalog
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild className="gap-2">
            <a href={item.website} target="_blank" rel="noreferrer">
              Visit website <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="default" asChild className="gap-2">
            <a href={`mailto:${item.email}`}>
              Connect <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="overflow-hidden">
          <div
            className="h-64 w-full bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(33, 33, 33, 0.25), rgba(33, 33, 33, 0.65)), url(${item.image})` }}
          />
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-fsu-charcoal/60">
              <Badge variant="gold">{item.category}</Badge>
              <span className="flex items-center gap-2 text-fsu-garnet">
                <Star className="h-4 w-4" /> {item.rating.toFixed(1)} / 5 rating
              </span>
              <span className="flex items-center gap-2 text-fsu-charcoal/60">
                <CalendarClock className="h-4 w-4" /> Established {item.established}
              </span>
            </div>
            <CardTitle className="text-3xl text-fsu-garnet">{item.name}</CardTitle>
            <CardDescription className="text-base text-fsu-charcoal/80">
              {item.shortDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed text-fsu-charcoal/85">
            <p>{item.description}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fsu-charcoal/60">
                Key highlights
              </p>
              <ul className="mt-3 grid gap-2 md:grid-cols-2">
                {item.tags.slice(0, 6).map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-2 rounded-full bg-fsu-sand/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-fsu-charcoal/70"
                  >
                    <LinkIcon className="h-3.5 w-3.5 text-fsu-garnet" /> #{tag.replace(/\s+/g, "-")}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-[0.35em] text-fsu-charcoal/70">
                Contact & access
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-[0.3em] text-fsu-charcoal/50">
                Reach out directly to learn more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3 rounded-2xl bg-fsu-sand/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-fsu-charcoal/70">
                <MapPin className="h-4 w-4 text-fsu-garnet" /> {item.location}
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-fsu-sand/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-fsu-charcoal/70">
                <Phone className="h-4 w-4 text-fsu-garnet" /> {item.phone}
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-fsu-sand/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-fsu-charcoal/70">
                <Mail className="h-4 w-4 text-fsu-garnet" /> {item.email}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-[0.35em] text-fsu-charcoal/70">
                Explore more
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-[0.3em] text-fsu-charcoal/50">
                Continue your discovery journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Browse catalog</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <a href={item.website} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                  Official site <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
