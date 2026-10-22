import { Award, CheckCircle2, RotateCcw, Target, XCircle } from "lucide-react";

export default function QuizResult({
  score = 0,
  totalQuestions = 0,
  onRetry,
  onReview,
}) {
  const safeTotal = Math.max(0, totalQuestions);
  const safeScore = Math.min(safeTotal, Math.max(0, score));

  const percentage =
    safeTotal > 0 ? Math.round((safeScore / safeTotal) * 100) : 0;

  const getMessage = () => {
    if (percentage >= 90) {
      return {
        title: "Excellent Work!",
        description: "You have done a great job. Keep learning!",
      };
    }

    if (percentage >= 70) {
      return {
        title: "Great Job!",
        description: "You are making good progress. Keep practising!",
      };
    }

    if (percentage >= 50) {
      return {
        title: "Good Effort!",
        description: "A little more practice will help you improve.",
      };
    }

    return {
      title: "Keep Practising!",
      description: "Review the characters and try the quiz again.",
    };
  };

  const result = getMessage();

  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600">
        <Award size={42} />
      </div>

      <h2 className="mt-5 text-3xl font-bold text-slate-900">{result.title}</h2>

      <p className="mt-2 text-slate-600">{result.description}</p>

      <div className="my-8">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
          Your Score
        </p>

        <p className="mt-2 text-5xl font-extrabold text-orange-600">
          {safeScore}
          <span className="text-2xl font-semibold text-slate-400">
            {" "}
            / {safeTotal}
          </span>
        </p>

        <div className="mx-auto mt-5 h-3 max-w-md overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-700"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Quiz score percentage"
          />
        </div>

        <p className="mt-2 font-semibold text-slate-700">
          {percentage}% completed
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <CheckCircle2 size={24} className="mx-auto text-emerald-600" />

          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {safeScore}
          </p>

          <p className="text-sm text-emerald-700">Correct Answers</p>
        </div>

        <div className="rounded-2xl bg-red-50 p-4">
          <XCircle size={24} className="mx-auto text-red-500" />

          <p className="mt-2 text-2xl font-bold text-red-600">
            {safeTotal - safeScore}
          </p>

          <p className="text-sm text-red-600">Incorrect Answers</p>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
        )}

        {onReview && (
          <button
            type="button"
            onClick={onReview}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Target size={18} />
            Review Answers
          </button>
        )}
      </div>
    </section>
  );
}
