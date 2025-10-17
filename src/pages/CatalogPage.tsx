import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { catalogItems } from "@/data/items";

function CatalogPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">
              Product catalog
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Discover the latest in purposeful technology
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Browse a curated selection of devices designed to elevate the way you work, create,
              and live. Each item includes in-depth details, rich media, and transparent
              specifications to help you make confident decisions.
            </p>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link to="/" aria-label="Return home">
              Go to landing
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {catalogItems.map((item) => (
            <Card key={item.id} className="flex h-full flex-col">
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {item.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <CardDescription>
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto grid gap-2">
                <p className="text-lg font-semibold text-foreground">
                  ${item.price.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {item.reviews.toLocaleString()} verified reviews · {item.rating.toFixed(1)} / 5
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/items/${item.id}`} aria-label={`View details for ${item.name}`}>
                    View details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;
