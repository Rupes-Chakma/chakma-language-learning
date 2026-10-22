import AlphabetCard from "./AlphabetCard";

export default function AlphabetGrid({
  alphabets = [],
  onSelect,
  selectedCharacter,
}) {
  if (!alphabets.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-slate-700">
          No alphabets found
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {alphabets.map((alphabet, index) => {
        const key =
          alphabet.id ?? alphabet.character ?? alphabet.letter ?? index;

        const character = alphabet.character || alphabet.letter;

        return (
          <AlphabetCard
            key={key}
            alphabet={alphabet}
            onClick={onSelect}
            isSelected={selectedCharacter === character}
          />
        );
      })}
    </div>
  );
}
