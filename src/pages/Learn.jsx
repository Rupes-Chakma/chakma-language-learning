import { useMemo, useState } from "react";
import alphabetData from "../data/alphabetData";
import AlphabetGrid from "../components/alphabet/AlphabetGrid";
import AlphabetDetails from "../components/alphabet/AlphabetDetails";
import AlphabetFilters from "../components/alphabet/AlphabetFilters";

export default function Learn() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);

  const alphabets = Array.isArray(alphabetData) ? alphabetData : [];

  const categories = useMemo(() => {
    return [...new Set(alphabets.map((item) => item.category).filter(Boolean))];
  }, [alphabets]);

  const filteredAlphabets = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return alphabets.filter((item) => {
      const matchesSearch = [
        item.character,
        item.letter,
        item.name,
        item.pronunciation,
        item.meaning,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [alphabets, searchTerm, selectedCategory]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const handleSelect = (alphabet) => {
    setSelectedAlphabet(alphabet);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="font-semibold text-orange-600">Learn Chakma</p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Explore the Alphabet
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Browse the available characters, search for a character and select one
          to view its details.
        </p>
      </header>

      <AlphabetFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        onReset={resetFilters}
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-800">
          Available Characters
        </h2>

        <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
          {filteredAlphabets.length} found
        </span>
      </div>

      <AlphabetGrid
        alphabets={filteredAlphabets}
        onSelect={handleSelect}
        selectedCharacter={
          selectedAlphabet?.character || selectedAlphabet?.letter
        }
      />

      {selectedAlphabet && (
        <div className="mt-8" id="alphabet-details">
          <AlphabetDetails
            alphabet={selectedAlphabet}
            onClose={() => setSelectedAlphabet(null)}
          />
        </div>
      )}
    </div>
  );
}
