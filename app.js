const apiKey = '253d98d09a9fd63db97f19c8bd9e5aa9'; // Replace with your API key
let userMovies = [];

function addMovie() {
  const movieInput = document.getElementById('movie-input');
  const movieName = movieInput.value.trim();

  if (movieName && userMovies.length < 10) {
    userMovies.push(movieName);
    updateMovieList();
    movieInput.value = ''; // Clear input field
  } else if (userMovies.length >= 10) {
    alert('You can only add up to 10 movies.');
  } else {
    alert('Please enter a valid movie name.');
  }
}

function updateMovieList() {
  const movieListContainer = document.getElementById('movie-list');
  movieListContainer.innerHTML = '';

  userMovies.forEach((movie, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${movie}`;
    movieListContainer.appendChild(li);
  });
}

function getRecommendations() {
  if (userMovies.length === 0) {
    alert('Please add at least one movie.');
    return;
  }

  const recommendationsContainer = document.getElementById('recommendations');
  recommendationsContainer.innerHTML = ''; // Clear previous recommendations

  userMovies.forEach(movie => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const movie = data.results[0];
          fetchRecommendationsBasedOnMovie(movie.id);
        } else {
          console.error(`No results for movie: ${movie}`);
        }
      })
      .catch(error => console.error('Error fetching movie data:', error));
  });
}

function fetchRecommendationsBasedOnMovie(movieId) {
  const recommendationsContainer = document.getElementById('recommendations');
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.release_date}</p>
        `;
        recommendationsContainer.appendChild(movieElement);
      });
    })
    .catch(error => console.error('Error fetching recommendations:', error));
}
