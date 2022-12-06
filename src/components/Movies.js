import React, { useEffect } from "react";
import MovieCards from "./MovieCards";

function Movies ({setMovies, movies}){

  useEffect(()=>{
    fetch("http://localhost:9292/movies")
    .then(resp=> resp.json())
    .then((data)=> {
      setMovies(data)
    })
  },[])

  

  return(
    <div className="movieList">
      <h1>Movie List</h1>
      {movies && <MovieCards movieList={movies}/>}
    </div>

  )
}

export default Movies;