import React, { useState }from "react";

function AddMovie({genres, movies, handleNewMovie, handleEditMovie, genreNames, movieTitles}){
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


//Handle functions

//new movie genre
  function handleGenreChange(e){
    e.preventDefault()
    genres.forEach((genre)=> {
      if (genre.name === e.target.value) {
        setNewMovieHash(prevState => {
          return{...prevState, genre_id: genre.id}
        })
      }
    })
  }
  console.log(newMovieHash)
//movie selected to edit
function handleSelectMovieToEdit(e){
    e.preventDefault()
    movies.forEach((movie)=> {
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
    genres.forEach((genre)=> {
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
    let movieToEdit = editMovie.id
    fetch(`http://localhost:9292/movie/${editMovie.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editMovieHash),
    })
    .then(resp => resp.json())
    .then(data=> {
      handleEditMovie(movieToEdit, data)
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
                  <option key={name} value={name}>{name}</option>
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
                  <option key={title} value={title}>{title}</option>
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
                  <option key={name} value={name}>{name}</option>
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