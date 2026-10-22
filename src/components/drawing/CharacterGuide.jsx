import { BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

export default function CharacterGuide({ alphabet, steps = [] }) {
  if (!alphabet) {
    return (
      <aside className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold text-slate-800">Character Guide</h2>

        <p className="mt-2 text-sm text-slate-500">
          Select a character to see its writing guide.
        </p>
      </aside>
    );
  }

  const character = alphabet.character || alphabet.letter || "?";

  const guideSteps =
    steps.length > 0
      ? steps
      : Array.isArray(alphabet.writingSteps)
        ? alphabet.writingSteps
        : [];

  return (
    <aside className="rounded-2xl border border-orange-100 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl font-bold text-orange-700">
          {character}
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">Character Guide</h2>

          <p className="text-sm text-slate-500">
            {alphabet.name || alphabet.pronunciation || "Writing practice"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <BookOpen size={18} className="text-orange-500" />
          Writing Steps
        </h3>

        {guideSteps.length > 0 ? (
          <ol className="mt-3 space-y-3">
            {guideSteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                  {index + 1}
                </span>

                <span>
                  {typeof step === "string"
                    ? step
                    : step.instruction || step.text || ""}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Practise the character slowly and follow its correct stroke order.
            Verified character-specific instructions can be added to the
            alphabet data.
          </p>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-emerald-50 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={17} />
          Practice Tips
        </h3>

        <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-800">
          <li>• Start slowly and focus on the shape.</li>
          <li>• Keep the character inside the practice area.</li>
          <li>• Repeat the exercise until you feel comfortable.</li>
        </ul>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
        <Lightbulb size={18} className="mt-0.5 shrink-0" />

        <p>
          Use a verified Chakma-language reference for the correct stroke order
          and pronunciation.
        </p>
      </div>
    </aside>
  );
}
