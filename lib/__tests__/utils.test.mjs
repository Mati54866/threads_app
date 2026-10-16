import test from "node:test";
import assert from "node:assert/strict";

function isBase64Image(imageData) {
  if (!imageData || typeof imageData !== "string") return false;
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

function formatDateString(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

function formatThreadCount(count) {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  if (safeCount === 0) {
    return "No Threads";
  } else {
    const threadCount = safeCount.toString().padStart(2, "0");
    const threadWord = safeCount === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}

test("isBase64Image returns true for valid base64 image data", () => {
  assert.equal(isBase64Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"), true);
  assert.equal(isBase64Image("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ"), true);
  assert.equal(isBase64Image("data:image/webp;base64,UklGR"), true);
});

test("isBase64Image returns false for invalid data or non-strings", () => {
  assert.equal(isBase64Image("https://example.com/image.png"), false);
  assert.equal(isBase64Image(""), false);
  assert.equal(isBase64Image(null), false);
  assert.equal(isBase64Image(undefined), false);
});

test("formatDateString handles valid dates safely", () => {
  const result = formatDateString("2026-01-15T12:00:00Z");
  assert.ok(result.includes("2026"));
  assert.ok(result.includes("Jan"));
});

test("formatDateString handles null, undefined, or invalid dates gracefully", () => {
  assert.equal(formatDateString(""), "");
  assert.equal(formatDateString(null), "");
  assert.equal(formatDateString(undefined), "");
  assert.equal(formatDateString("invalid-date-string"), "");
});

test("formatThreadCount formats thread numbers properly", () => {
  assert.equal(formatThreadCount(0), "No Threads");
  assert.equal(formatThreadCount(-5), "No Threads");
  assert.equal(formatThreadCount(NaN), "No Threads");
  assert.equal(formatThreadCount(1), "01 Thread");
  assert.equal(formatThreadCount(2), "02 Threads");
  assert.equal(formatThreadCount(15), "15 Threads");
});
