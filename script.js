const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE0NTNlYjI2YTA3YmZlZGJhMjZjNDA4N2IxMjA5MyIsInN1YiI6IjY2MjczNjMxY2I2ZGI1MDE2M2FmNzQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.grSbQSUUFDU6eV7QP7294ZSEJ6UB1JyGCcREG3K7X_Y'
    }
};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

//가져오기
async function getMovies() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        movies = data.results;
        return movies;
    }
    catch (error) {
        console.error(error);
    }
}

function showMovies(movies) {
    const movieInfo = document.createElement('div');
    //새로만든 div에 class,id추가하는법
        movieInfo.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" alt="포스터" />
      <h3>${movies.title}</h3>
      <p">${movies.overview}</p>
      <p>평점 : ${movies.vote_average}점</p>`;
        document.querySelector("section").append(movieInfo);
        movieInfo.addEventListener('click', () => {
            alert(`영화 ID : ${movies.id}`);
        });
}

function sch(movies) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const section = document.querySelector('section');
        const searchVal = document.getElementById('searchBar').value;
        console.log(searchVal);
        let schrslt = movies.filter((movies) => {
            return movies.title.toLowerCase().includes(searchVal.toLowerCase());
        });
        console.log(schrslt);
        section.innerHTML="";
        schrslt.forEach((movie) => showMovies(movie));
    })
}

async function main() {
    const movies = await getMovies();
    movies.forEach((movie) => showMovies(movie));
    sch(movies);
    }


main();