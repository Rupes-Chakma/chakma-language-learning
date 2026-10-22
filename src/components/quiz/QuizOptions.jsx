import { CheckCircle2, Circle, XCircle } from "lucide-react";

export default function QuizOptions({
  options = [],
  selectedOption,
  onSelect,
  disabled = false,
  correctAnswer,
  showFeedback = false,
}) {
  if (!options.length) {
    return (
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
        No answer options available.
      </p>
    );
  }

  const normalizeOption = (option, index) => {
    if (typeof option === "string") {
      return {
        value: option,
        label: option,
        key: option,
      };
    }

    return {
      value: option.value ?? option.id ?? String(index),
      label: option.label ?? option.text ?? "Option",
      key: option.id ?? option.value ?? index,
    };
  };

  return (
    <div
      className="grid gap-3 sm:grid-cols-2"
      role="group"
      aria-label="Answer options"
    >
      {options.map((option, index) => {
        const item = normalizeOption(option, index);
        const isSelected = selectedOption === item.value;
        const isCorrect = correctAnswer === item.value;

        let style =
          "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50";

        if (isSelected && !showFeedback) {
          style =
            "border-orange-500 bg-orange-50 text-orange-800 ring-2 ring-orange-100";
        }

        if (showFeedback && isCorrect) {
          style = "border-emerald-500 bg-emerald-50 text-emerald-800";
        } else if (showFeedback && isSelected && !isCorrect) {
          style = "border-red-400 bg-red-50 text-red-700";
        }

        return (
          <button
            key={item.key}
            type="button"
            disabled={disabled}
            onClick={() => onSelect?.(item.value)}
            aria-pressed={isSelected}
            className={`flex min-h-16 items-center gap-3 rounded-xl border-2 p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-90 ${style}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="flex-1 font-medium">{item.label}</span>

            {showFeedback && isCorrect ? (
              <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
            ) : showFeedback && isSelected ? (
              <XCircle size={20} className="shrink-0 text-red-500" />
            ) : isSelected ? (
              <CheckCircle2 size={20} className="shrink-0 text-orange-500" />
            ) : (
              <Circle size={20} className="shrink-0 text-slate-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}
