import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

import { CatalogDataProvider } from "@/providers/catalog-data-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Explore a performant catalog grid with 500 curated items."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CatalogDataProvider>{children}</CatalogDataProvider>
      </body>
    </html>
  );
}
