// 영화 데이터 가져오기
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE0NTNlYjI2YTA3YmZlZGJhMjZjNDA4N2IxMjA5MyIsInN1YiI6IjY2MjczNjMxY2I2ZGI1MDE2M2FmNzQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.grSbQSUUFDU6eV7QP7294ZSEJ6UB1JyGCcREG3K7X_Y'
    }
};
const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

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

// 가져온 데이터 카드로 보여주기 및 알림창
function showMovies(movies) {
    const movieInfo = document.createElement('div');
    //새로만든 div에 class, id추가하는법??
        movieInfo.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" alt="포스터" />
      <h3>${movies.title}</h3>
      <p">${movies.overview}</p>
      <footer><p>평점 : ${movies.vote_average}점</p></footer>`;
        document.querySelector("section").append(movieInfo);
        movieInfo.addEventListener('click', (e) => {
            alert(`영화 ID : ${movies.id}`);
            console.log('e.target : ', e.target);
            console.log('e.currentTarget : ', e.currentTarget);
        });
}

// 검색 (최승현 튜터님 죄송해요. 두 번째 피드백은 어떻게 해야할지 잘 모르겠어요 )
function searchMovieTitle(movies) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const cardSection = document.getElementById('cardSection');
        const searchVal = document.getElementById('searchBar').value;
        console.log(searchVal, "을 검색"); 
        let searchResult = movies.filter((movies) => {
            return movies.title.toLowerCase().includes(searchVal.toLowerCase());
        });
        console.log("검색 결과 : ",searchResult);
        if(searchResult.length > 0) {
            cardSection.innerHTML="";
            searchResult.forEach((movie) => showMovies(movie));
        } else {
            alert('검색 결과가 존재하지 않습니다.');
        }
    })
}

// 다 합쳐서 실행
async function main() {
    const movies = await getMovies();
    movies.forEach((movie) => showMovies(movie));
    searchMovieTitle(movies);
    }


main();