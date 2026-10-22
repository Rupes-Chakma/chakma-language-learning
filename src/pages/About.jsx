import { Link } from "react-router-dom";
import { BookOpen, Heart, PencilLine, Target } from "lucide-react";

const goals = [
  {
    icon: BookOpen,
    title: "Alphabet Learning",
    description:
      "Provide an organised place to explore available Chakma characters.",
  },
  {
    icon: PencilLine,
    title: "Writing Practice",
    description: "Offer a digital canvas for practising character shapes.",
  },
  {
    icon: Target,
    title: "Knowledge Checks",
    description:
      "Help learners review their knowledge through interactive quizzes.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-br from-orange-50 to-amber-100 px-6 py-14 text-center sm:px-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
          <BookOpen size={32} />
        </div>

        <p className="mt-6 font-semibold text-orange-600">About the Project</p>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-5xl">
          Welcome to ChakmaLearn
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
          ChakmaLearn is a learning project designed to help users explore
          Chakma characters, practise writing and check their learning progress
          in one place.
        </p>
      </section>

      <section className="py-14">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What You Can Do
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Explore the learning tools available in the application.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {goals.map((goal) => {
            const Icon = goal.icon;

            return (
              <article
                key={goal.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {goal.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {goal.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
            <Heart size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Respect for Language and Culture
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Language-learning content should be accurate, respectful and
              checked against reliable sources. Character forms, pronunciation
              and writing instructions should be verified before the website is
              used as an authoritative learning resource.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-10 text-center">
        <Link
          to="/learn"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
}
