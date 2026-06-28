import "../css/base.css";
import "../css/header.css";
import "../css/search.css";
import "../css/books.css";
import "../css/favorites.css";
import "../css/responsive.css";

import { fetchBooks } from "./api.js";
import { displayBooks } from "./books.js";
import { renderFavorites } from "./favorites.js";
import { populateAuthorFilter, filterByAuthor } from "./filter.js";
import { debounce } from "./utils/debounce.js";
import { initTheme, toggleTheme } from "./utils/theme.js";
import { storage } from "./utils/storage.js";

let lastSearchResults = storage.get("lastSearch") || [];

const search = async () => {
  const searchInput = document.getElementById("search-input");
  const container = document.getElementById("books-container");
  const rawQuery = searchInput.value.trim();

  if (rawQuery === "") {
    container.innerHTML = "<p>Start typing to search for books...</p>";
    return;
  }

  container.innerHTML = "<p>Loading...</p>";

  try {
    lastSearchResults = await fetchBooks(rawQuery);
    storage.set("lastSearch", lastSearchResults);
    displayBooks(lastSearchResults);
    populateAuthorFilter(lastSearchResults);
  } catch (error) {
    console.error("Error fetching book data:", error);
    container.innerHTML = "<p>Error fetching book data.</p>";
  }
};

const debouncedSearch = debounce(search, 500);

window.addEventListener("DOMContentLoaded", () => {
  initTheme();

  if (lastSearchResults.length > 0) {
    displayBooks(lastSearchResults);
    populateAuthorFilter(lastSearchResults);
  }

  renderFavorites();

  document
    .getElementById("search-input")
    ?.addEventListener("input", debouncedSearch);

  document.getElementById("search-btn")?.addEventListener("click", search);

  document
    .getElementById("theme-toggle")
    ?.addEventListener("click", toggleTheme);

  document
    .getElementById("author-filter")
    ?.addEventListener("change", (e) =>
      filterByAuthor(e.target.value, lastSearchResults),
    );
});
