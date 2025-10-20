import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "FSU Shadcn UI Demo",
  description: "Shadcn/ui integrated with FSU branding (Garnet & Gold)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <header className="sticky top-0 z-40 w-full border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">FS</div>
                <span className="text-lg font-semibold tracking-tight">Florida State</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary">Action</Button>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <Separator />
          <main className="container py-8">
            {children}
          </main>
          <footer className="container border-t py-6 mt-8 text-sm text-muted-foreground flex items-center justify-between">
            <span>© {new Date().getFullYear()} FSU</span>
            <a href="https://www.fsu.edu" className="text-primary hover:underline">fsu.edu</a>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
