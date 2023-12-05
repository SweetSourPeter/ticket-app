// movies.js

const BASE_URL = 'http://localhost:8080/api/movies/all';

async function getAllMovies(tokens) {
  const token = localStorage.getItem("token") || ""; // Default to an empty string if token is null or undefined

  console.log("token: ", token);
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    console.log("response: ", response);
    if (response.ok) {
      console.log("response: ", response);
      const movies = await response.json();
      return movies;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch movies');
    }
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
}

export { getAllMovies }; // Named export
