import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  Filter,
  Sparkles,
  ListFilter,
  ChevronDown,
  MapPin,
  GraduationCap,
  CalendarDays,
  Star,
} from "lucide-react";
import type { DirectoryCategory } from "../data/fsu-directory";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useDirectoryData } from "../features/directory/useDirectoryData";
const sortOptions = [
  { value: "name", label: "Alphabetical (A-Z)" },
  { value: "rating", label: "Highest Rated" },
  { value: "established", label: "Most Established" },
];

const ratingOptions = [
  { value: 0, label: "All ratings" },
  { value: 3, label: "3+ stars" },
  { value: 4, label: "4+ stars" },
  { value: 5, label: "5 stars" },
];

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchDraft, setSearchDraft] = useState(searchParams.get("search") ?? "");
  const { items, isLoading } = useDirectoryData();

  const categories = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [items]
  );

  const decades = useMemo(() => {
    const decadeSet = new Set(
      items.map((item) => Math.floor(item.established / 10) * 10)
    );
    return Array.from(decadeSet).sort((a, b) => b - a);
  }, [items]);

  const selectedCategories = (searchParams.get("categories") ?? "")
    .split(",")
    .filter(Boolean) as DirectoryCategory[];
  const searchTerm = searchParams.get("search") ?? "";
  const minRating = Number(searchParams.get("rating") ?? "0");
  const sortValue = searchParams.get("sort") ?? "name";
  const decadeFilter = searchParams.get("decade") ?? "all";

  const updateParams = (key: string, value: string | number | null) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "" || value === "all" || value === 0) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
    setSearchParams(next, { replace: true });
  };

  const toggleCategory = (category: DirectoryCategory) => {
    const next = new URLSearchParams(searchParams);
    const current = new Set(selectedCategories);
    if (current.has(category)) {
      current.delete(category);
    } else {
      current.add(category);
    }
    if (current.size === 0) {
      next.delete("categories");
    } else {
      next.set("categories", Array.from(current).join(","));
    }
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
    setSearchDraft("");
  };

  const filteredItems = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesSearch =
        normalizedTerm.length === 0 ||
        [
          item.name,
          item.shortDescription,
          item.description,
          item.department,
          item.location,
          item.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedTerm);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      const matchesRating = item.rating >= minRating;

      const matchesDecade =
        decadeFilter === "all" ||
        Math.floor(item.established / 10) * 10 === Number(decadeFilter);

      return matchesSearch && matchesCategory && matchesRating && matchesDecade;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortValue === "rating") {
        return b.rating - a.rating || a.name.localeCompare(b.name);
      }
      if (sortValue === "established") {
        return b.established - a.established || a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [decadeFilter, items, minRating, searchTerm, selectedCategories, sortValue]);

  const stats = useMemo(() => {
    const departments = new Set(items.map((item) => item.department));
    return {
      total: items.length,
      uniqueDepartments: departments.size,
      categories: categories.length,
    };
  }, [categories.length, items]);

  return (
    <div className="space-y-8" id="directory">
      <section className="grid gap-6 rounded-3xl bg-white/90 p-8 shadow-fsu-card md:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-fsu-garnet/80">
            <GraduationCap className="h-4 w-4" /> Discover FSU
          </p>
          <h1 className="text-4xl font-display leading-tight text-fsu-garnet md:text-5xl">
            Explore 500+ Florida State University resources, programs, and experiences.
          </h1>
          <p className="text-base text-fsu-charcoal/80 md:text-lg">
            Search the directory, refine with smart filters, and find the exact campus support you need. Built with reliability in mind so your deployment stays rock-solid.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-fsu-gold/50 bg-fsu-sand/70 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-fsu-charcoal/70">
              <Sparkles className="h-4 w-4 text-fsu-garnet" />
              {isLoading ? "Loading" : `${stats.total} resources`}
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-fsu-gold/50 bg-fsu-sand/70 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-fsu-charcoal/70">
              <ListFilter className="h-4 w-4 text-fsu-garnet" />
              {isLoading ? "Preparing" : `${stats.categories} categories`}
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-fsu-gold/50 bg-fsu-sand/70 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-fsu-charcoal/70">
              <MapPin className="h-4 w-4 text-fsu-garnet" />
              {isLoading ? "Updating" : `${stats.uniqueDepartments} departments`}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-fsu-gold/60 bg-fsu-garnet/5 p-6">
          <div className="space-y-2 text-sm text-fsu-charcoal/70">
            <p className="font-semibold uppercase tracking-[0.35em] text-fsu-garnet/80">
              Success Playbook
            </p>
            <p>
              1. Start minimal. 2. Add styling. 3. Layer data. 4. Launch features incrementally. 5. Verify production builds every step of the way.
            </p>
          </div>
          <div className="rounded-2xl bg-white/90 p-4 text-xs uppercase tracking-[0.3em] text-fsu-charcoal/60">
            Built with Vite + React + Tailwind + ShadCN
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-fsu-charcoal/60">
                <Search className="h-4 w-4 text-fsu-garnet" /> Search Directory
              </div>
              <div className="relative">
                <Input
                  value={searchDraft}
                  onChange={(event) => {
                    setSearchDraft(event.target.value);
                    updateParams("search", event.target.value.trim());
                  }}
                  placeholder="Search by title, tag, department, or keyword"
                  className="w-full pr-12"
                />
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fsu-garnet/60" />
              </div>
            </div>
            <Button variant="ghost" className="self-start text-xs uppercase tracking-[0.35em]" onClick={clearFilters}>
              Clear filters
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {searchTerm && <Badge variant="gold">Search: “{searchTerm}”</Badge>}
              {selectedCategories.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
              {minRating > 0 && <Badge variant="gold">Rating {minRating}+</Badge>}
              {decadeFilter !== "all" && <Badge variant="outline">{decadeFilter}s Established</Badge>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-[0.35em] text-fsu-charcoal/80">
              <Filter className="h-4 w-4 text-fsu-garnet" /> Filters
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-[0.4em] text-fsu-charcoal/60">
              Refine the catalog to match your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fsu-charcoal/60">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategories.includes(category as DirectoryCategory);
                  return (
                    <Button
                      key={category}
                      variant={active ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategory(category as DirectoryCategory)}
                    >
                      {category}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fsu-charcoal/60">
                Minimum rating
              </p>
              <div className="flex flex-wrap gap-2">
                {ratingOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={minRating === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateParams("rating", option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fsu-charcoal/60">
                Established decade
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={decadeFilter === "all" ? "default" : "outline"}
                  onClick={() => updateParams("decade", null)}
                >
                  All decades
                </Button>
                {decades.map((decade) => (
                  <Button
                    key={decade}
                    size="sm"
                    variant={decadeFilter === String(decade) ? "default" : "outline"}
                    onClick={() => updateParams("decade", decade)}
                  >
                    {decade}s
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fsu-charcoal/60">
                Sort results
              </p>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortValue === option.value ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => updateParams("sort", option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-display text-fsu-garnet">
            {isLoading ? "Loading catalog..." : `${filteredItems.length} directory matches`}
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-fsu-charcoal/60">
            Results update instantly as you search, filter, and sort.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[22rem] animate-pulse rounded-3xl border border-fsu-gold/30 bg-white/60"
                />
              ))
            : filteredItems.map((item) => (
                <Card key={item.id} className="flex flex-col bg-white/95">
                  <div
                    className="h-40 w-full rounded-t-3xl bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(120, 47, 64, 0.25), rgba(120, 47, 64, 0.65)), url(${item.image})`,
                    }}
                  />
                  <CardHeader className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-fsu-charcoal/60">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1 text-fsu-gold">
                        <Star className="h-3.5 w-3.5" /> {item.rating.toFixed(1)}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight text-fsu-charcoal">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-fsu-charcoal/80">
                      {item.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-fsu-charcoal/60">
                      <MapPin className="h-4 w-4 text-fsu-garnet" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-fsu-charcoal/60">
                      <CalendarDays className="h-4 w-4 text-fsu-garnet" /> Founded {item.established}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="lowercase">
                          #{tag.replace(/\s+/g, "-")}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link to={`/item/${item.id}`}>View detail</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
        </div>
        {!isLoading && filteredItems.length === 0 && (
          <Card className="border-dashed border-fsu-garnet/40 bg-white/70 py-16 text-center">
            <CardHeader className="items-center gap-3">
              <CardTitle className="text-xl">No matches yet</CardTitle>
              <CardDescription>
                Try adjusting your filters or search terms to uncover more campus opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button variant="outline" onClick={clearFilters} className="gap-2">
                Reset filters
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
