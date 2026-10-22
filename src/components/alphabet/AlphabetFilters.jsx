import { RotateCcw, Search } from "lucide-react";

export default function AlphabetFilters({
  searchTerm = "",
  onSearchChange,
  selectedCategory = "all",
  onCategoryChange,
  categories = [],
  onReset,
}) {
  const filterCategories = [
    { label: "All Alphabets", value: "all" },
    ...categories.map((category) => {
      if (typeof category === "string") {
        return {
          label: category,
          value: category,
        };
      }

      return {
        label: category.label || category.name,
        value: category.value || category.id || category.name,
      };
    }),
  ];

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={20}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search alphabet..."
            aria-label="Search alphabets"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filterCategories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => onCategoryChange?.(category.value)}
              aria-pressed={selectedCategory === category.value}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                selectedCategory === category.value
                  ? "bg-orange-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-700"
              }`}
            >
              {category.label}
            </button>
          ))}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Reset filters"
              aria-label="Reset filters"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 transition hover:border-orange-300 hover:text-orange-600"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
