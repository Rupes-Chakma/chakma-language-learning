import { Link } from "react-router-dom";
import { Heart, Languages } from "lucide-react";

const quickLinks = [
  { name: "Learn Alphabet", path: "/learn" },
  { name: "Writing Practice", path: "/writing-practice" },
  { name: "Quiz", path: "/quiz" },
  { name: "My Progress", path: "/my-progress" },
  { name: "About", path: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-orange-100 bg-orange-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Brand */}
        <div>
          <Link to="/" className="mb-4 inline-flex items-center gap-2">
            <span className="rounded-xl bg-orange-500 p-2 text-white">
              <Languages size={22} />
            </span>

            <span className="text-lg font-extrabold text-gray-900">
              Chakma<span className="text-orange-600">Learn</span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-6 text-gray-600">
            Explore the Chakma alphabet, practice writing, and develop your
            learning skills through interactive activities.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900">Quick Links</h2>

          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-gray-600 transition hover:text-orange-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Project information */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900">Our Mission</h2>

          <p className="text-sm leading-6 text-gray-600">
            Our goal is to make Chakma alphabet learning more accessible through
            a simple, user-friendly digital learning experience.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-orange-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:px-6 md:flex-row lg:px-8">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} ChakmaLearn. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-sm text-gray-600">
            Made for learners
            <Heart size={15} className="fill-red-500 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
