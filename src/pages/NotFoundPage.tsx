import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function NotFoundPage() {
  return (
    <Card className="mx-auto max-w-2xl border-dashed border-fsu-garnet/40 bg-white/85 py-12 text-center">
      <CardHeader className="items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-fsu-garnet/10 text-fsu-garnet">
          <Compass className="h-8 w-8" />
        </span>
        <CardTitle className="text-3xl">Page not found</CardTitle>
        <CardDescription className="text-base text-fsu-charcoal/70">
          The page you are looking for does not exist. Explore the directory to discover hundreds of FSU resources instead.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button asChild>
          <Link to="/">Back to catalog</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
