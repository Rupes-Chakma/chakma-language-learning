import useLocalStorage from "./useLocalStorage";

const INITIAL_PROGRESS = {
  learnedCharacters: [],
  quizHistory: [],
  totalQuizzes: 0,
  bestScore: 0,
};

export default function useProgress() {
  const [progress, setProgress] = useLocalStorage(
    "chakma-learning-progress",
    INITIAL_PROGRESS,
  );

  const markCharacterLearned = (character) => {
    if (!character) return;

    setProgress((previous) => {
      const learnedCharacters = previous.learnedCharacters || [];

      if (learnedCharacters.includes(character)) {
        return previous;
      }

      return {
        ...previous,
        learnedCharacters: [...learnedCharacters, character],
      };
    });
  };

  const saveQuizResult = (score, totalQuestions) => {
    if (
      typeof score !== "number" ||
      typeof totalQuestions !== "number" ||
      totalQuestions <= 0
    ) {
      return;
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    const result = {
      id: `${Date.now()}`,
      score,
      totalQuestions,
      percentage,
      date: new Date().toISOString(),
    };

    setProgress((previous) => ({
      ...previous,
      quizHistory: [...(previous.quizHistory || []), result],
      totalQuizzes: (previous.totalQuizzes || 0) + 1,
      bestScore: Math.max(previous.bestScore || 0, percentage),
    }));
  };

  const resetProgress = () => {
    setProgress({ ...INITIAL_PROGRESS });
  };

  return {
    progress,
    learnedCount: (progress.learnedCharacters || []).length,
    quizHistory: progress.quizHistory || [],
    totalQuizzes: progress.totalQuizzes || 0,
    bestScore: progress.bestScore || 0,
    markCharacterLearned,
    saveQuizResult,
    resetProgress,
  };
}
