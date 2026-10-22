import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import quizData from "../data/quizData";
import QuizCard from "../components/quiz/QuizCard";
import QuizOptions from "../components/quiz/QuizOptions";
import QuizResult from "../components/quiz/QuizResult";

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function getCorrectAnswer(question) {
  const answer =
    question.correctAnswer ?? question.answer ?? question.correctOption;

  if (Array.isArray(answer)) {
    return answer[0];
  }

  return answer;
}

export default function Quiz() {
  const questions = Array.isArray(quizData) ? quizData : [];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[questionIndex];

  const correctAnswer = currentQuestion
    ? getCorrectAnswer(currentQuestion)
    : null;

  const score = answers.filter((answer) => answer.isCorrect).length;

  const resetQuiz = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsSubmitted(false);
    setIsFinished(false);
  };

  const submitAnswer = () => {
    if (!currentQuestion || selectedOption === null || isSubmitted) {
      return;
    }

    const expectedAnswer = getCorrectAnswer(currentQuestion);

    const isCorrect = normalize(selectedOption) === normalize(expectedAnswer);

    const nextAnswers = [
      ...answers,
      {
        question: currentQuestion.question || currentQuestion.text,
        selectedOption,
        correctAnswer: expectedAnswer,
        isCorrect,
      },
    ];

    setAnswers(nextAnswers);
    setIsSubmitted(true);
  };

  const goToNextQuestion = () => {
    if (questionIndex + 1 >= questions.length) {
      const finalScore = answers.filter((answer) => answer.isCorrect).length;

      try {
        const previous = JSON.parse(
          localStorage.getItem("chakma-learning-progress") || "{}",
        );

        const history = Array.isArray(previous.quizHistory)
          ? previous.quizHistory
          : [];

        localStorage.setItem(
          "chakma-learning-progress",
          JSON.stringify({
            ...previous,
            quizzesCompleted: (previous.quizzesCompleted || 0) + 1,
            bestScore: Math.max(previous.bestScore || 0, finalScore),
            lastScore: finalScore,
            lastTotal: questions.length,
            quizHistory: [
              ...history,
              {
                score: finalScore,
                total: questions.length,
                date: new Date().toISOString(),
              },
            ].slice(-20),
          }),
        );
      } catch {
        // The quiz can still finish if browser storage is unavailable.
      }

      setIsFinished(true);
      return;
    }

    setQuestionIndex((index) => index + 1);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Quiz Coming Soon</h1>

        <p className="mt-4 text-slate-600">
          Add questions to src/data/quizData.js to start the quiz.
        </p>

        <Link
          to="/learn"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Learn Alphabet
        </Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRetry={resetQuiz}
          onReview={() => {
            setIsFinished(false);
            setQuestionIndex(0);
            setSelectedOption(null);
            setIsSubmitted(true);
          }}
        />

        {answers.length > 0 && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-slate-900">Answer Review</h2>

            <div className="mt-5 space-y-4">
              {answers.map((answer, index) => (
                <article
                  key={`${index}-${answer.question}`}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-800">
                    {index + 1}. {answer.question}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    Your answer: {String(answer.selectedOption)}
                  </p>

                  {!answer.isCorrect && (
                    <p className="mt-1 text-sm text-emerald-700">
                      Correct answer: {String(answer.correctAnswer)}
                    </p>
                  )}

                  <p
                    className={`mt-2 text-sm font-semibold ${
                      answer.isCorrect ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {answer.isCorrect ? "Correct" : "Incorrect"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600"
        >
          <ArrowLeft size={17} />
          Back to Learning
        </Link>

        <p className="mt-6 font-semibold text-orange-600">Knowledge Check</p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Alphabet Quiz
        </h1>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-orange-500 transition-all"
            style={{
              width: `${((questionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      <QuizCard
        question={currentQuestion.question || currentQuestion.text}
        questionNumber={questionIndex + 1}
        totalQuestions={questions.length}
      >
        <QuizOptions
          options={currentQuestion.options || []}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          disabled={isSubmitted}
          correctAnswer={correctAnswer}
          showFeedback={isSubmitted}
        />

        {isSubmitted && (
          <div
            className={`mt-5 rounded-xl p-4 text-sm font-medium ${
              normalize(selectedOption) === normalize(correctAnswer)
                ? "bg-emerald-50 text-emerald-800"
                : "bg-red-50 text-red-700"
            }`}
            role="status"
          >
            {normalize(selectedOption) === normalize(correctAnswer)
              ? "Well done! Your answer is correct."
              : `Not quite. Correct answer: ${String(correctAnswer)}`}
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Restart
          </button>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={submitAnswer}
              disabled={selectedOption === null}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Check Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNextQuestion}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              {questionIndex + 1 === questions.length
                ? "View Results"
                : "Next Question"}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </QuizCard>
    </div>
  );
}
