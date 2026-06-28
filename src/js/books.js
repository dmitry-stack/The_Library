import { favoriteBooks, addToFavorites, renderFavorites } from "./favorites.js";

const NO_COVER = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="220" viewBox="0 0 150 220">
    <rect width="150" height="220" fill="#eeebe4" rx="4"/>
   
    <text x="75" y="135" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#7c736a">No Cover</text>
  </svg>
`)}`;

export const displayBooks = (books) => {
  const container = document.getElementById("books-container");
  container.innerHTML = "";

  if (!books || books.length === 0) {
    container.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach((book) => {
    const coverId = book.cover_i;
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : NO_COVER;

    const author = book.author_name
      ? book.author_name.join(", ")
      : "Unknown Author";
    const year = book.first_publish_year || "N/A";
    const isFavorite = favoriteBooks.some((fav) => fav.key === book.key);

    const card = document.createElement("div");
    card.className = "book-card";

    const coverWrapper = document.createElement("div");
    coverWrapper.className = "cover-wrapper";

    const img = document.createElement("img");
    img.src = coverUrl;
    img.alt = book.title;
    img.className = "book-cover";

    const heartBtn = document.createElement("button");
    heartBtn.className = "heart-btn" + (isFavorite ? " active" : "");
    heartBtn.title = isFavorite ? "Already in Favorites" : "Add to Favorites";
    heartBtn.dataset.key = book.key;

    const heartImg = document.createElement("img");
    heartImg.src = "./assets/heart.svg";
    heartImg.alt = "Add to Favorites";
    heartImg.className = "heart-icon-img";

    heartBtn.appendChild(heartImg);
    heartBtn.addEventListener("click", () => {
      addToFavorites(
        { key: book.key, title: book.title, coverUrl, author, year },
        heartBtn,
      );
      renderFavorites();
    });

    coverWrapper.appendChild(img);
    coverWrapper.appendChild(heartBtn);

    const bookInfo = document.createElement("div");
    bookInfo.className = "book-info";
    bookInfo.innerHTML = `
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">by ${author}</p>
      <span class="book-year">${year}</span>
    `;

    card.appendChild(coverWrapper);
    card.appendChild(bookInfo);
    container.appendChild(card);
  });
};
