import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ItemGalleryProps {
  images: string[];
  name: string;
}

export function ItemGallery({ images, name }: ItemGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <AspectRatio ratio={4 / 3} className="border border-border bg-muted">
        <img
          src={activeImage}
          alt={`${name} preview ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <Button
              key={image}
              type="button"
              variant="outline"
              className={cn(
                "h-20 w-full overflow-hidden rounded-md border p-0 transition",
                isActive
                  ? "border-primary ring-2 ring-primary"
                  : "border-muted-foreground/20 hover:border-primary/60"
              )}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
