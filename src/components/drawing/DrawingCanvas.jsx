import { useEffect, useRef, useState } from "react";

export default function DrawingCanvas({
  character = "",
  color = "#ea580c",
  brushSize = 5,
  isEraser = false,
  clearSignal = 0,
  onDrawingChange,
}) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const previousPointRef = useRef(null);
  const [hasDrawing, setHasDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    context.scale(dpr, dpr);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.clearRect(0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    context.clearRect(0, 0, rect.width, rect.height);

    // Reset drawing state when the user clears the canvas.
    setHasDrawing(false);
    onDrawingChange?.(false);
  }, [clearSignal, onDrawingChange]);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    event.preventDefault();

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    canvas.setPointerCapture?.(event.pointerId);

    const point = getPoint(event);

    drawingRef.current = true;
    previousPointRef.current = point;

    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = brushSize;
    context.strokeStyle = color;

    if (isEraser) {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }

    // Draw a dot when the user taps without moving.
    context.lineTo(point.x + 0.01, point.y + 0.01);
    context.stroke();

    setHasDrawing(true);
    onDrawingChange?.(true);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;

    event.preventDefault();

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const previousPoint = previousPointRef.current;

    if (!canvas || !context || !previousPoint) return;

    const point = getPoint(event);

    context.beginPath();
    context.moveTo(previousPoint.x, previousPoint.y);
    context.lineTo(point.x, point.y);
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.globalCompositeOperation = isEraser
      ? "destination-out"
      : "source-over";
    context.stroke();

    previousPointRef.current = point;
    setHasDrawing(true);
    onDrawingChange?.(true);
  };

  const stopDrawing = (event) => {
    if (!drawingRef.current) return;

    drawingRef.current = false;
    previousPointRef.current = null;

    const canvas = canvasRef.current;

    if (canvas?.hasPointerCapture?.(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-white">
        {!hasDrawing && character && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="select-none text-8xl font-bold text-slate-200 sm:text-9xl">
              {character}
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onLostPointerCapture={() => {
            drawingRef.current = false;
            previousPointRef.current = null;
          }}
          className="relative z-10 block h-80 w-full touch-none cursor-crosshair sm:h-96"
          aria-label="Alphabet drawing canvas"
        />
      </div>

      <p className="mt-3 text-center text-sm text-slate-500">
        {hasDrawing
          ? "Keep practising your character!"
          : "Trace the faint character or draw freely."}
      </p>
    </div>
  );
}
