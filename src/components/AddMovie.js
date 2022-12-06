import React, { useEffect, useState }from "react";

function AddMovie({genres}){
  const [movieTitles, setMovieTitles]= useState('')
  // const [newImageUrl, setNewImageUrl] = useState('')
  // const [newTitle, setNewTitle] = useState('')
  // const [neDirector, setNewImageUrl] = useState('')
  // const [newImageUrl, setNewImageUrl] = useState('')
  // const [newImageUrl, setNewImageUrl] = useState('')
  const [newMovieHash, setNewMovieHash] = useState({
    image: '',
    title: '',
    director: '',
    rating: '',
    runtime: '',
    genre_id: ''
  })

  useEffect(()=> {
    fetch("http://localhost:9292/movies/titles")
    .then(resp=> resp.json())
    .then(data=> setMovieTitles(data))
  },[])
  function correctId(genreName){
    const genreId = genres.find(genre => genre.name = genreName)
    console.log(genreId)
  }
  function handleSubmit(e){
    e.preventDefault()
    correctId(newMovieHash.genre_id)
  }

  return(
    <div className="addMovie">
      <h2>Add Movie</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          <input type='text' placeholder="Image URL" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, image: e.target.value }
            })
          }}
          />
        </ul>
        <ul>
          <input type='text'placeholder="Title" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, title: e.target.value }
            })
          }}
          />
        </ul>
        <ul>
          <input type='text' placeholder="Director" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, director: e.target.value }
            })
          }}
          />
        </ul>
        <ul>
          <input type='text'placeholder="Rating" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, rating: e.target.value }
            })
          }}
          /> /10
        </ul>
        <ul>
          <input type='text'placeholder="Runtime" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, runtime: e.target.value }
            })
          }}
          /> mins
        </ul>
        <ul>
          <input type='text'placeholder="Genre" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, genre: e.target.value }
            })
          }}
          />
        </ul> 
        <button type="submit">Add New Movie</button>
      </form>
      <h2>Edit Movie</h2>
      <form>
        <ul>
          <select type='text' placeholder="Image URL">
            {movieTitles && movieTitles.map((title)=>{
              return(
                <option key={title.title}>{title.title}</option>
              )
            })}
          </select>
        </ul>
        <ul>
          <input type='text'placeholder="Title"/>
        </ul>
        <ul>
          <input type='text' placeholder="Director"/>
        </ul>
        <ul>
          <input type='text'placeholder="Rating"/>
        </ul>
        <ul>
          <input type='text'placeholder="Runtime"/>

        </ul>
        <ul>
          <input type='text'placeholder="Genre"/>
        </ul> 
        <button type="submit">Edit Movie</button>
      </form>
    </div>
  )
}

export default AddMovie;