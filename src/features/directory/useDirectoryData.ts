import { useEffect, useState } from "react";
import type { DirectoryItem } from "../../data/fsu-directory";

interface DirectoryState {
  items: DirectoryItem[];
  isLoading: boolean;
}

export function useDirectoryData(): DirectoryState {
  const [items, setItems] = useState<DirectoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadData() {
      setIsLoading(true);
      const module = await import("../../data/fsu-directory");
      if (isActive) {
        setItems(module.directoryItems);
        setIsLoading(false);
      }
    }

    loadData().catch(() => {
      if (isActive) {
        setItems([]);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return { items, isLoading };
}
