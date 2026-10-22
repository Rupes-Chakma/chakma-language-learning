import { BookOpen, Volume2, X } from "lucide-react";

export default function AlphabetDetails({ alphabet, onClose }) {
  if (!alphabet) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <BookOpen size={32} className="mx-auto text-orange-500" />

        <p className="mt-3 font-medium text-slate-700">
          Select an alphabet to see its details.
        </p>
      </div>
    );
  }

  const character = alphabet.character || alphabet.letter || "?";

  const playAudio = () => {
    if (!alphabet.audio) return;

    const audio = new Audio(alphabet.audio);
    audio.play().catch(() => {
      console.warn("Audio could not be played.");
    });
  };

  return (
    <section className="relative rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close alphabet details"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <X size={20} />
        </button>
      )}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-orange-100 text-6xl font-bold text-orange-700">
          {character}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Alphabet Details
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {alphabet.name || alphabet.pronunciation || "Alphabet"}
          </h2>

          {alphabet.pronunciation && (
            <p className="mt-2 text-slate-600">
              Pronunciation: {alphabet.pronunciation}
            </p>
          )}

          {alphabet.meaning && (
            <p className="mt-2 text-slate-600">Meaning: {alphabet.meaning}</p>
          )}

          {alphabet.description && (
            <p className="mt-4 leading-7 text-slate-600">
              {alphabet.description}
            </p>
          )}

          {alphabet.example && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Example</p>

              <p className="mt-1 text-slate-600">{alphabet.example}</p>
            </div>
          )}

          {alphabet.audio && (
            <button
              type="button"
              onClick={playAudio}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 font-medium text-white transition hover:bg-orange-600"
            >
              <Volume2 size={18} />
              Play Pronunciation
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
