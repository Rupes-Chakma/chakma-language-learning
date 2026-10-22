import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, RotateCcw, Target, Trophy } from "lucide-react";

const STORAGE_KEY = "chakma-learning-progress";

const emptyProgress = {
  quizzesCompleted: 0,
  bestScore: 0,
  lastScore: 0,
  lastTotal: 0,
  quizHistory: [],
};

export default function MyProgress() {
  const [progress, setProgress] = useState(emptyProgress);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

      setProgress({
        ...emptyProgress,
        ...saved,
        quizHistory: Array.isArray(saved.quizHistory) ? saved.quizHistory : [],
      });
    } catch {
      setProgress(emptyProgress);
    }
  }, []);

  const latestPercentage =
    progress.lastTotal > 0
      ? Math.round((progress.lastScore / progress.lastTotal) * 100)
      : 0;

  const stats = [
    {
      label: "Quizzes Completed",
      value: progress.quizzesCompleted,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Best Score",
      value: progress.bestScore,
      icon: Trophy,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Latest Score",
      value: `${latestPercentage}%`,
      icon: Target,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const clearProgress = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your saved quiz progress?",
    );

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    setProgress(emptyProgress);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-orange-600">Your Learning Journey</p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            My Progress
          </h1>

          <p className="mt-3 text-slate-600">
            Track your quiz results and keep practising.
          </p>
        </div>

        <button
          type="button"
          onClick={clearProgress}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          Reset Progress
        </button>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
              >
                <Icon size={24} />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.label}
              </p>

              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                {stat.value}
              </p>
            </article>
          );
        })}
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <Award size={25} className="text-orange-500" />

          <h2 className="text-xl font-bold text-slate-900">Quiz History</h2>
        </div>

        {progress.quizHistory.length === 0 ? (
          <div className="py-10 text-center">
            <BookOpen size={40} className="mx-auto text-slate-300" />

            <p className="mt-4 font-semibold text-slate-700">
              Your journey starts here
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Complete a quiz to see your results here.
            </p>

            <Link
              to="/quiz"
              className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Start a Quiz
            </Link>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {[...progress.quizHistory].reverse().map((item, index) => {
              const percentage =
                item.total > 0
                  ? Math.round((item.score / item.total) * 100)
                  : 0;

              return (
                <article
                  key={`${item.date}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      Quiz Attempt {progress.quizHistory.length - index}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.date
                        ? new Date(item.date).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-slate-900">
                      {item.score}/{item.total}
                    </p>

                    <p className="text-sm text-orange-600">{percentage}%</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
