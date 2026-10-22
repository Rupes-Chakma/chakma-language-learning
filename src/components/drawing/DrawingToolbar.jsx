import { Download, Eraser, Paintbrush, RotateCcw, Trash2 } from "lucide-react";

const COLORS = [
  "#ea580c",
  "#2563eb",
  "#16a34a",
  "#9333ea",
  "#0f172a",
  "#dc2626",
];

export default function DrawingToolbar({
  color = "#ea580c",
  onColorChange,
  brushSize = 5,
  onBrushSizeChange,
  isEraser = false,
  onEraserChange,
  onClear,
  onDownload,
}) {
  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-5">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">Pen Color</p>

          <div className="flex flex-wrap items-center gap-3">
            {COLORS.map((itemColor) => (
              <button
                key={itemColor}
                type="button"
                onClick={() => {
                  onColorChange?.(itemColor);
                  onEraserChange?.(false);
                }}
                aria-label={`Select ${itemColor} pen color`}
                aria-pressed={color === itemColor && !isEraser}
                className={`h-9 w-9 rounded-full border-2 transition hover:scale-110 ${
                  color === itemColor && !isEraser
                    ? "border-slate-900 ring-2 ring-orange-200 ring-offset-2"
                    : "border-white shadow-sm"
                }`}
                style={{ backgroundColor: itemColor }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="brush-size"
              className="text-sm font-semibold text-slate-700"
            >
              Brush Size
            </label>

            <span className="text-sm font-medium text-orange-600">
              {brushSize}px
            </span>
          </div>

          <input
            id="brush-size"
            type="range"
            min="2"
            max="20"
            step="1"
            value={brushSize}
            onChange={(event) =>
              onBrushSizeChange?.(Number(event.target.value))
            }
            className="w-full cursor-pointer accent-orange-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onEraserChange?.(!isEraser)}
            aria-pressed={isEraser}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              isEraser
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isEraser ? <Paintbrush size={17} /> : <Eraser size={17} />}
            {isEraser ? "Use Pen" : "Eraser"}
          </button>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={17} />
            Clear
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
          >
            <Download size={17} />
            Download
          </button>
        </div>
      </div>
    </section>
  );
}
