const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchAllBooks() {
  try {
    const res = await fetch(`${BASE_URL}/books`);
    const data = await res.json();
    return data.books;
  } catch (err) {
    console.error("Error fetching books", err);
    return [];
  }
}
