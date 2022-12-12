import React, { useEffect, useState } from "react";

function Genres ({setGenres, genres}){

  const renderGenres = (genre)=> {
    return(
      <div className="genre_list" key={genre.name}>
        <h2 className="genre_title">{genre.name}</h2>
        <li className="genre_desc">{genre.description}</li>
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