import React, { useEffect } from "react";
import MovieCards from "./MovieCards";

function Movies ({setMovies, movies}){

  function handleDeleteMovie(current_movie){
    alert(`You just deleted ${current_movie.title}`)
    const updatedMovies = movies.filter((movie)=> movie.title !== current_movie.title )
    console.log(updatedMovies)
    fetch(`http://localhost:9292/movie/${current_movie.id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json)
    .then(data => setMovies(updatedMovies))
  }

  return(
    <div className="movieList">
      <h1>Movie List</h1>
      {movies && <MovieCards movieList={movies} handleDeleteMovie={handleDeleteMovie}/>}
    </div>

  )
}

export default Movies;