import { BookOpen, Volume2 } from "lucide-react";

export default function AlphabetCard({
  alphabet,
  onClick,
  isSelected = false,
}) {
  if (!alphabet) return null;

  const character = alphabet.character || alphabet.letter || "?";

  const name = alphabet.name || alphabet.pronunciation || "Unknown";

  const handlePlayAudio = (event) => {
    event.stopPropagation();

    if (alphabet.audio) {
      const audio = new Audio(alphabet.audio);
      audio.play().catch(() => {
        console.warn("Audio could not be played.");
      });
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick?.(alphabet)}
      aria-pressed={isSelected}
      className={`group relative flex min-h-44 w-full flex-col items-center justify-center rounded-2xl border p-5 text-center transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
        isSelected
          ? "border-orange-500 bg-orange-50 shadow-md"
          : "border-slate-200 bg-white hover:border-orange-300"
      }`}
    >
      <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl font-bold text-orange-700 transition group-hover:bg-orange-200">
        {character}
      </span>

      <h3 className="text-base font-semibold text-slate-800">{name}</h3>

      {alphabet.meaning && (
        <p className="mt-1 text-sm text-slate-500">{alphabet.meaning}</p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600">
          <BookOpen size={14} />
          Learn
        </span>

        {alphabet.audio && (
          <span
            role="button"
            tabIndex={0}
            aria-label={`Play pronunciation of ${character}`}
            onClick={handlePlayAudio}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handlePlayAudio(event);
              }
            }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-orange-100 hover:text-orange-600"
          >
            <Volume2 size={16} />
          </span>
        )}
      </div>
    </button>
  );
}
