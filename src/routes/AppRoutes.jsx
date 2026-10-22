import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Learn from "../pages/Learn";
import WritingPractice from "../pages/WritingPractice";
import Quiz from "../pages/Quiz";
import MyProgress from "../pages/MyProgress";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/writing-practice" element={<WritingPractice />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/my-progress" element={<MyProgress />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
