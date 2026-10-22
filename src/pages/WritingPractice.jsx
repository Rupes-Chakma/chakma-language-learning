import { useRef, useState } from "react";
import alphabetData from "../data/alphabetData";
import DrawingCanvas from "../components/drawing/DrawingCanvas";
import DrawingToolbar from "../components/drawing/DrawingToolbar";
import CharacterGuide from "../components/drawing/CharacterGuide";

export default function WritingPractice() {
  const canvasRef = useRef(null);

  const alphabets = Array.isArray(alphabetData) ? alphabetData : [];

  const [selectedId, setSelectedId] = useState(
    alphabets[0]?.id ?? alphabets[0]?.character ?? alphabets[0]?.letter ?? "",
  );

  const [color, setColor] = useState("#ea580c");
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [clearSignal, setClearSignal] = useState(0);

  const selectedAlphabet =
    alphabets.find(
      (item) => (item.id ?? item.character ?? item.letter) === selectedId,
    ) ?? null;

  const downloadDrawing = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "chakma-writing-practice.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="font-semibold text-orange-600">Writing Practice</p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Practise Writing
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          Select a character, trace its shape and practise using the drawing
          tools.
        </p>
      </header>

      <div className="mb-6 max-w-md">
        <label
          htmlFor="practice-character"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Choose a character
        </label>

        <select
          id="practice-character"
          value={selectedId}
          onChange={(event) => {
            const nextId = event.target.value;
            setSelectedId(nextId);
            setClearSignal((value) => value + 1);
          }}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {alphabets.length === 0 && (
            <option value="">No characters available</option>
          )}

          {alphabets.map((item, index) => {
            const id = item.id ?? item.character ?? item.letter ?? index;

            return (
              <option key={id} value={id}>
                {item.character || item.letter || "?"}
                {" — "}
                {item.name || item.pronunciation || "Character"}
              </option>
            );
          })}
        </select>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="min-w-0">
          <DrawingToolbar
            color={color}
            onColorChange={setColor}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
            isEraser={isEraser}
            onEraserChange={setIsEraser}
            onClear={() => setClearSignal((value) => value + 1)}
            onDownload={downloadDrawing}
          />

          <DrawingCanvas
            ref={canvasRef}
            character={
              selectedAlphabet?.character || selectedAlphabet?.letter || ""
            }
            color={color}
            brushSize={brushSize}
            isEraser={isEraser}
            clearSignal={clearSignal}
          />
        </section>

        <CharacterGuide alphabet={selectedAlphabet} />
      </div>
    </div>
  );
}
