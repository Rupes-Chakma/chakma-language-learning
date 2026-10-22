import { HelpCircle } from "lucide-react";

export default function QuizCard({
  question,
  questionNumber = 1,
  totalQuestions = 1,
  children,
}) {
  const questionText =
    typeof question === "string"
      ? question
      : question?.question || question?.text || "";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">
          <HelpCircle size={16} />
          Question {questionNumber}
        </span>

        <span className="text-sm font-medium text-slate-500">
          {questionNumber} of {totalQuestions}
        </span>
      </div>

      <div
        className="mb-7 text-xl font-bold leading-relaxed text-slate-900 sm:text-2xl"
        aria-live="polite"
      >
        {questionText || "No question available."}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}
