import { storage } from "./storage.js";

export const toggleTheme = () => {
  const isDark = document.body.classList.toggle("dark");
  storage.set("theme", isDark ? "dark" : "light");
  updateThemeButton();
};

export const updateThemeButton = () => {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

export const initTheme = () => {
  if (storage.get("theme") === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeButton();
};
