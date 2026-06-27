import { storage } from "./utils/storage.js";
import { displayBooks } from "./books.js";

export const getAllAuthors = (books) => {
  const authorsSet = new Set();
  books.forEach((book) => {
    if (book.author_name) {
      book.author_name.forEach((author) => authorsSet.add(author));
    }
  });
  return Array.from(authorsSet).sort();
};

export const populateAuthorFilter = (books) => {
  const filterSelect = document.getElementById("author-filter");
  if (!filterSelect) return;

  const authors = getAllAuthors(books);
  filterSelect.innerHTML = '<option value="">All Authors</option>';
  authors.forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    filterSelect.appendChild(option);
  });
};

export const filterByAuthor = (author, books) => {
  if (!author) {
    displayBooks(books);
    return;
  }
  const filtered = books.filter(
    (book) => book.author_name && book.author_name.includes(author)
  );
  displayBooks(filtered);
};
