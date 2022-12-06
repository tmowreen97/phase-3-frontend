import React, { useEffect, useState } from "react";

function Genres ({setGenres, genres}){

  const renderGenres = (genre)=> {
    return(
      <div key={genre.name}>
        <h2>{genre.name}</h2>
        <li>{genre.description}</li>
      </div>
    )
  }

  return(
    <div className="genreList">
      {genres && genres.map(renderGenres)}
    </div>
  )
}

export default Genres;