import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-orange-600">
          <SearchX size={40} />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-slate-600">
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}
