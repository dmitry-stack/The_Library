export const fetchBooks = async (query) => {
  const encodedQuery = query.trim().split(" ").join("+");
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodedQuery}`
  );
  const data = await response.json();
  return data.docs.slice(0, 36);
};
