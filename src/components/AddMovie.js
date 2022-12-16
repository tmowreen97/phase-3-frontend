import React, { useEffect, useState }from "react";

function AddMovie({genres, movies, handleNewMovie, handleEditMovie}){
  const [movieTitles, setMovieTitles]= useState('')
  const [genreNames, setGenreNames]= useState('')
  const [editMovie, setEditMovie] = useState({
    title: '',
    id: 0
  })
  const [newMovieHash, setNewMovieHash] = useState({
    image: '',
    title: '',
    director: '',
    rating: '',
    runtime: '',
    genre_id: 0
  })
  const [editMovieHash, setEditMovieHash] = useState({
    genre_id: 0,
    image: '',
    title: '',
    director: '',
    rating: '',
    runtime: ''
  })

//Select options of Movie Titles to edit
  useEffect(()=> {
    fetch("http://localhost:9292/movies/titles")
    .then(resp=> resp.json())
    .then(data=> setMovieTitles(data))
  },[])

//Select options of Genre Names to add to a new movie
  useEffect(()=> {
    fetch("http://localhost:9292/genres/names")
    .then(resp=> resp.json())
    .then(data=> setGenreNames(data))
  },[])

//Handle functions

//new movie genre
  function handleGenreChange(e){
    e.preventDefault()
    genres.map((genre)=> {
      if (genre.name === e.target.value) {
        setNewMovieHash(prevState => {
          return{...prevState, genre_id: genre.id}
        })
      }
    })
  }
//movie selected to edit
function handleSelectMovieToEdit(e){
    e.preventDefault()
    movies.map((movie)=> {
      if (movie.title === e.target.value){
        setEditMovie({
          title: movie.title,
          id: movie.id
        })
      }
    })
  }
//changing selected movie genre
  function handleEditMovieGenre(e){
    genres.map((genre)=> {
      if (genre.name===e.target.value){
        setEditMovieHash(prevState=> {
          return{...prevState, genre_id: genre.id}
        })
      }
    })
  }


//Form Submit for Add Movie
  function handleAddMovieSubmit(e){
    e.preventDefault();
    const path = "/movies"
    fetch("http://localhost:9292/movies", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(newMovieHash),
    })
      .then((resp)=> resp.json())
      .then((data) => {
        alert(`You just added a new movie, ${data.title}!`)
        setNewMovieHash({
          image: '',
          title: '',
          director: '',
          rating: '',
          runtime: '',
          genre_id: 0
        })
        handleNewMovie(data)
      });
  }  

//Form Submit for Edit Movie
  function handleEditMovieSubmit(e){
    e.preventDefault()
    fetch(`http://localhost:9292/movie/${editMovie.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editMovieHash),
    })
    .then(resp => resp.json())
    .then(data=> {
      handleEditMovie()
      alert(`You just edited ${editMovie.title}!`)
      setEditMovieHash({
        genre_id: 0,
        image: '',
        title: '',
        director: '',
        rating: 0,
        runtime: 0
    })
    })
    
  }

  return(
    <div className="add_edit_movie">
      <div className="add_movie_div">
        <h1 className="add_movie_title">Add Movie</h1>
        <form onSubmit={(e)=> handleAddMovieSubmit(e)} className="add_movie_form">
          <ul>
            <label className="label">Image URL: </label>
            <input value={newMovieHash.image} type='text' placeholder="Image URL" onChange={(e) => {
              setNewMovieHash(prevState => {
                return{...prevState, image: e.target.value }
              })
            }}
            />
          </ul>
          <ul>
            <label className="label">Title: </label>
            <input value={newMovieHash.title} type='text'placeholder="Title" onChange={(e) => {
              setNewMovieHash(prevState => {
                return{...prevState, title: e.target.value }
              })
            }}
            />
          </ul>
          <ul>
            <label className="label">Director: </label>
            <input value={newMovieHash.director} type='text' placeholder="Director" onChange={(e) => {
              setNewMovieHash(prevState => {
                return{...prevState, director: e.target.value }
              })
            }}
            />
          </ul>
          <ul>
          <label className="label">Rating: </label>
            <input value={newMovieHash.rating} className="movie_form_input" type='number'step="0.1" min="0" max="10" placeholder="Rating" onChange={(e) => {
              setNewMovieHash(prevState => {
                return{...prevState, rating: parseFloat(e.target.value)}
              })
            }}
            /> /10
          </ul>
          <ul>
          <label className="label">Runtime: </label>
            <input value={newMovieHash.runtime} className="movie_form_input" type='number' min="0" placeholder="Runtime" onChange={(e) => {
              setNewMovieHash(prevState => {
                return{...prevState, runtime: parseInt(e.target.value) }
              })
            }}
            /> mins
          </ul>
          <ul>
          <label className="label">Genre: </label>
            <select type='text' onChange={(e)=> {handleGenreChange(e)}}>
                <option disabled selected>Select Genre</option>
              {genreNames && genreNames.map((name)=>{
                return(
                  <option key={name.name} value={name.name}>{name.name}</option>
                )
              })}
            </select>
          </ul> 
          <button className="add_new_movie_button" type="submit">Add New Movie</button>
        </form>
      </div>
      <div className="edit_movie_div">
        <h1 className="edit_movie_title">Edit Movie</h1>
        <form onSubmit={(e)=> handleEditMovieSubmit(e)} className="edit_movie_form">
          <ul>
          <label className="label">Edit Movie: </label>
            <select type='text' onChange={(e)=> {handleSelectMovieToEdit(e)}}>
                <option disabled selected>Select Movie</option>
              {movieTitles && movieTitles.map((title)=>{
                return(
                  <option key={title.title} value={title.title}>{title.title}</option>
                )
              })}
            </select>
          </ul>
          <ul>
          <label className="label">Image URL: </label>
            <input value={editMovieHash.image} type='text'placeholder="Image URL" onChange={(e) => {
              setEditMovieHash(prevState => {
                return{...prevState, image: e.target.value }
              })
            }}/>
          </ul>
          <ul>
          <label className="label">Title: </label>
            <input value={editMovieHash.title} type='text'placeholder="Title" onChange={(e) => {
              setEditMovieHash(prevState => {
                return{...prevState, title: e.target.value }
              })
            }}/>
          </ul>
          <ul>
          <label className="label">Director: </label>
            <input value={editMovieHash.director} type='text' placeholder="Director" onChange={(e) => {
              setEditMovieHash(prevState => {
                return{...prevState, director: e.target.value }
              })
            }}/>
          </ul>
          <ul>
          <label className="label">Rating: </label>
            <input value={editMovieHash.rating} className="movie_form_input" type='number'step="0.1" min="0" max="10" placeholder="Rating" onChange={(e) => {
              setEditMovieHash(prevState => {
                return{...prevState, rating: parseFloat(e.target.value) }
              })
            }}/> /10
          </ul>
          <ul>
          <label className="label">Runtime: </label>
            <input value={editMovieHash.runtime} className="movie_form_input" type='number' min="0" placeholder="Runtime" onChange={(e) => {
              setEditMovieHash(prevState => {
                return{...prevState, runtime: parseInt(e.target.value) }
              })
            }}/> mins
          </ul>
          <ul>
          <label className="label">Genre: </label>
          <select type='text' onChange={(e) => {handleEditMovieGenre(e)}}>
                <option disabled selected>Select Genre</option>
              {genreNames && genreNames.map((name)=>{
                return(
                  <option key={name.name} value={name.name}>{name.name}</option>
                )
              })}
            </select>
          </ul> 
          <button className="button" type="submit">Edit Movie</button>
        </form>
      </div>
      
    </div>
  )
}

export default AddMovie;