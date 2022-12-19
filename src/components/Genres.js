import React from "react";

function Genres ({genres}){

  const renderGenres = (genre)=> {
    return(
      <div className="genre_list" key={genre.name}>
        <h2 className="genre_title">{genre.name}</h2>
        <li className="genre_desc">{genre.description}</li>
        {genre.movies.length>0 && <h5 className="genre_movies_title">Movies:</h5>}
        {genre.movies.length > 0 && 
          genre.movies.map((movie)=> {
            return <li key={movie.title} className="genre_movies">{movie.title}</li>
          })
        }
      </div>
    )
  }
  return(
    <div className="genres" >
      <h1 className="genre_list_title">Genre List</h1>
      {genres && genres.map(renderGenres)}
    </div>
  )
}


export default Genres;