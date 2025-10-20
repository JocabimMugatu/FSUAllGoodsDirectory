import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemCard, type Item } from "@/components/item-card";

const items: Item[] = [
  {
    id: "1",
    name: "FSU Garnet Tee",
    description: "Classic tee in Garnet with the FSU wordmark.",
    price: "$24.99",
    tags: ["FSU", "Garnet", "Apparel"],
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Gold Cap",
    description: "Adjustable cap in Gold with embroidered spear.",
    price: "$29.99",
    tags: ["Gold", "Headwear"],
    imageUrl: "https://images.unsplash.com/photo-1618354691323-7c5238681f83?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Campus Mug",
    description: "Ceramic mug featuring Westcott Fountain.",
    tags: ["Merch"],
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border bg-card p-6">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to the FSU Store</h1>
        <p className="text-muted-foreground">Powered by shadcn/ui components, styled with Garnet & Gold.</p>
        <form className="mt-4 flex items-center gap-2">
          <Input placeholder="Search items" className="max-w-sm" />
          <Button type="submit">Search</Button>
        </form>
      </section>

      <Separator />

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />)
        )}
      </section>
    </div>
  );
}
