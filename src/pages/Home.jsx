import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  PencilLine,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learn Alphabet",
    description: "Explore characters and learn their details.",
    link: "/learn",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: PencilLine,
    title: "Writing Practice",
    description: "Practise drawing characters on a digital canvas.",
    link: "/writing-practice",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Trophy,
    title: "Take a Quiz",
    description: "Test your knowledge and check your score.",
    link: "/quiz",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function Home() {
  return (
    <div>
      <section className="overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700">
              Discover • Learn • Practise
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn the <span className="text-orange-600">Chakma</span> Alphabet
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore the Chakma writing system, practise writing characters and
              test your knowledge with interactive learning activities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Start Learning
                <ArrowRight size={19} />
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
              >
                About Project
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[2rem] border border-orange-100 bg-white/80 p-8 shadow-xl shadow-orange-100/60">
            <div className="absolute inset-5 rounded-[1.5rem] border-2 border-dashed border-orange-200" />

            <div className="relative text-center">
              <GraduationCap
                size={42}
                className="mx-auto mb-5 text-orange-500"
              />

              <div className="text-7xl font-bold text-orange-600 sm:text-8xl">
                Learn
              </div>

              <p className="mt-4 text-sm font-medium tracking-widest text-slate-500">
                YOUR LANGUAGE LEARNING JOURNEY
              </p>
            </div>

            <div className="absolute right-5 top-7 rounded-2xl bg-orange-100 p-3 text-orange-600">
              <BookOpen size={24} />
            </div>

            <div className="absolute bottom-7 left-5 rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <PencilLine size={24} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-semibold text-orange-600">Learning Tools</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Everything You Need to Practise
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Learn at your own pace with simple and interactive tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
                >
                  Explore
                  <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
