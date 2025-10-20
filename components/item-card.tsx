import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export type Item = {
  id: string;
  name: string;
  description: string;
  price?: string;
  tags?: string[];
  imageUrl?: string;
};

export function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge key={t} variant={t.toLowerCase().includes("fsu") || t.toLowerCase().includes("garnet") ? "default" : "secondary"}>
                {t}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md border bg-muted">
          {item.imageUrl ? (
            <Image
              alt={item.name}
              src={item.imageUrl}
              width={640}
              height={360}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          {item.price ? (
            <span className="text-lg font-semibold text-primary">{item.price}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Price on request</span>
          )}
          <Button>View details</Button>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
