import { storage } from "./utils/storage.js";

// Manages favorites state, localStorage persistence and panel rendering

export let favoriteBooks = storage.get("favoriteBooks") || [];

const save = () => storage.set("favoriteBooks", favoriteBooks);

export const addToFavorites = (bookData, buttonElement) => {
  if (favoriteBooks.some((b) => b.key === bookData.key)) {
    alert("This book is already in your favorites!");
    return;
  }

  favoriteBooks.push(bookData);
  save();

  if (buttonElement) {
    buttonElement.classList.add("active");
    buttonElement.title = "Already in Favorites";
  }
};

export const removeFromFavorites = (key) => {
  favoriteBooks = favoriteBooks.filter((b) => b.key !== key);
  save();

  const heartBtn = document.querySelector(`.heart-btn[data-key="${key}"]`);
  if (heartBtn) {
    heartBtn.classList.remove("active");
    heartBtn.title = "Add to Favorites";
  }
};

export const renderFavorites = () => {
  const panel = document.querySelector(".favorites-panel");
  if (!panel) return;

  const countText =
    favoriteBooks.length === 1
      ? "1 book saved"
      : `${favoriteBooks.length} books saved`;

  let header = panel.querySelector(".fav-header");
  if (!header) {
    header = document.createElement("div");
    header.className = "fav-header";
    panel.prepend(header);
  }

  header.innerHTML = `
    <div class="fav-header-icon">
      <img src="./assets/heart.svg" alt="Favorites" />
    </div>
    <div class="fav-header-text">
      <h3>Favorites</h3>
      <span class="fav-count">${countText}</span>
    </div>
  `;

  let list = panel.querySelector(".favorites-list");
  if (!list) {
    list = document.createElement("div");
    list.className = "favorites-list";
    panel.appendChild(list);
  }
  list.innerHTML = "";

  if (favoriteBooks.length === 0) {
    list.innerHTML = '<p class="empty-message">No favorites added yet.</p>';
    return;
  }

  favoriteBooks.forEach((book) => {
    const item = document.createElement("div");
    item.className = "fav-item";

    item.innerHTML = `
      <img src="${book.coverUrl}" alt="${book.title}" class="fav-item-cover" />
      <div class="fav-item-info">
        <h4>${book.title}</h4>
        <p class="fav-item-author">${book.author || "Unknown Author"}</p>
        <span class="fav-item-year">${book.year || "N/A"}</span>
      </div>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "heart-btn active";
    removeBtn.title = "Remove from Favorites";

    const img = document.createElement("img");
    img.src = "./assets/heart.svg";
    img.alt = "Remove";
    img.className = "heart-icon-img";

    removeBtn.appendChild(img);

    removeBtn.addEventListener("click", () => {
      removeFromFavorites(book.key);
      renderFavorites();
    });

    item.appendChild(removeBtn);
    list.appendChild(item);
  });
};
