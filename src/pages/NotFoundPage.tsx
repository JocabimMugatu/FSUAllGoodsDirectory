import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface NotFoundPageProps {
  message?: string;
}

function NotFoundPage({ message }: NotFoundPageProps) {
  const location = useLocation();

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary/70">
          404 · Not found
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          We couldn't locate that page
        </h1>
        <p className="text-muted-foreground">
          {message ?? "The page you're looking for may have been moved, renamed, or no longer exists."}
        </p>
        <p className="text-xs text-muted-foreground">
          Requested URL: <span className="font-mono">{location.pathname}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/catalog">Return to catalog</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
