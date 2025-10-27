import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ItemGallery } from "@/components/item/ItemGallery";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { catalogItems } from "@/data/items";
import NotFoundPage from "@/pages/NotFoundPage";

const availabilityCopy: Record<
  (typeof catalogItems)[number]["availability"],
  { label: string; variant: "default" | "outline" | "success" | "info" }
> = {
  "in-stock": { label: "In stock", variant: "success" },
  backorder: { label: "Backorder", variant: "info" },
  discontinued: { label: "Discontinued", variant: "outline" },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(input));
}

function ItemDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const item = useMemo(
    () => catalogItems.find((entry) => entry.id === itemId),
    [itemId]
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = useCallback(async () => {
    if (!item) return;

    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/items/${item.id}`
          : `/items/${item.id}`;
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2200);
    } catch (error) {
      console.error("Copy failed", error);
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2200);
    }
  }, [item]);

  const handleShare = useCallback(async () => {
    if (!item) return;

    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/items/${item.id}`
        : `/items/${item.id}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: item.name, text: item.description, url });
        return;
      }

      await handleCopy();
    } catch (error) {
      console.error("Share failed", error);
    }
  }, [handleCopy, item]);

  if (!item) {
    return (
      <NotFoundPage message={`We couldn't find an item with the identifier “${itemId ?? "unknown"}”.`} />
    );
  }

  const availability = availabilityCopy[item.availability];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Catalog", href: "/catalog" },
          { label: item.name, isCurrent: true },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{item.name}</h1>
          <p className="text-muted-foreground">
            {formatDate(item.releaseDate)} · {item.reviews.toLocaleString()} reviews · {" "}
            <span className="font-semibold text-foreground">{item.rating.toFixed(1)}</span>/5 rating
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline">
            <Link to="/catalog">Back to catalog</Link>
          </Button>
          <Button onClick={handleShare} variant="default">
            {copyState === "copied"
              ? "Link copied"
              : copyState === "error"
              ? "Unable to share"
              : "Share"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <ItemGallery images={item.images} name={item.name} />

        <Card className="h-fit">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {item.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
              {availability ? (
                <Badge variant={availability.variant}>{availability.label}</Badge>
              ) : null}
            </div>
            <CardTitle className="text-3xl">{formatCurrency(item.price)}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Key specifications
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {item.specifications.map((spec) => (
                  <div key={spec.label} className="rounded-lg border border-border px-3 py-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <dl className="grid gap-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">SKU</dt>
                <dd className="font-medium text-foreground">{item.sku}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Availability</dt>
                <dd className="font-medium text-foreground">
                  {availability?.label ?? "Unavailable"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-medium text-foreground">{formatCurrency(item.price)}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted-foreground">Release</dt>
                <dd className="font-medium text-foreground">{formatDate(item.releaseDate)}</dd>
              </div>
            </dl>

            <Separator />

            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Share meaningful insights
              </h2>
              <p className="text-sm text-muted-foreground">
                Share this item with stakeholders or collaborators. Copy the link or use your
                device's share sheet to continue the conversation seamlessly.
              </p>
              <Button onClick={handleCopy} variant="outline" className="w-full sm:w-auto">
                {copyState === "copied"
                  ? "Copied to clipboard"
                  : copyState === "error"
                  ? "Try sharing again"
                  : "Copy shareable link"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ItemDetailPage;
