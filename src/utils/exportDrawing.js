export function exportDrawing(canvas, filename = "chakma-drawing.png") {
  if (!canvas || typeof canvas.toBlob !== "function") {
    console.error("A valid canvas element is required.");
    return false;
  }

  try {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Unable to export canvas.");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = filename.endsWith(".png") ? filename : `${filename}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    }, "image/png");

    return true;
  } catch (error) {
    console.error("Error exporting drawing:", error);
    return false;
  }
}
