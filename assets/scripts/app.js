const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.body.children[1];
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById('entry-text');

const movies = [];

const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
}

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

const renderNewMovieElement = (title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element_info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>    
    `;
    const movieListRootUl = document.getElementById('movie-list');
    movieListRootUl.append(newMovieElement);
}

const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearMovieInput();
};

const backdropClickHandler = () => {
  toggleMovieModal();
  clearMovieInput();
};

const addMovieHandler = () => {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Please enter valid values (rating should be between 1 and 5).");
    return;
  } 

  const newMovie = {
    title,
    image: imageUrl,
    rating
  }
  movies.push(newMovie);
  toggleMovieModal();
  clearMovieInput();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
backdrop.addEventListener("click", backdropClickHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
