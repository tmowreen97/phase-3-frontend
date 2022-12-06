import React, { useEffect, useState }from "react";

function AddMovie({genres, movies}){
  const [movieTitles, setMovieTitles]= useState('')
  const [genreNames, setGenreNames]= useState('')
  const [editMovieTitle, setEditMovieTitle] = useState('')
  const [editMovieGenre, setEditMovieGenre]= useState('')
  const [newMovieGenre, setNewMovieGenre] = useState('')
  const [newMovieHash, setNewMovieHash] = useState({
    image: '',
    title: '',
    director: '',
    rating: 0,
    runtime: 0,
    genre_id: ''
  })
  const [editMovieHash, setEditMovieHash] = useState({
    genre_id:'',
    image: '',
    title: '',
    director: '',
    rating: 0,
    runtime: 0
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

//Finding functions
  function isThisTheMovie(movie){
    return movie.title === editMovieTitle
  }

  function isThisTheGenre(genre){
    return genre.name === editMovieGenre
  }

  function findGenreId (genre){
    return genre.name === newMovieGenre
  }

//Form Submit for Add Movie
  function handleAddMovieSubmit(e){
    e.preventDefault()
    console.log(newMovieGenre)
    let newGenreId = genres.find(findGenreId).id
    fetch("http://localhost:9292/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: newMovieHash.image,
        title: newMovieHash.title,
        director: newMovieHash.director,
        rating: newMovieHash.rating,
        runtime: newMovieHash.runtime,
        genre_id: newGenreId
      }),
    })
    alert('You added a movie!')
  }


  //Form Submit for Edit Movie
  function handleEditMovieSubmit(e){
    e.preventDefault()
    let foundMovieId = (movies.find(isThisTheMovie)).id
    let foundGenreId = (genres.find(isThisTheGenre)).id
    // console.log('found Movie ID', foundMovieId)
    // console.log('found Genre ID', foundGenreId)
    fetch(`http://localhost:9292/movie/${foundMovieId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: editMovieHash.image,
        title: editMovieHash.title,
        director: editMovieHash.director,
        rating: editMovieHash.rating,
        runtime: editMovieHash.runtime,
        genre_id: foundGenreId
      }),
    })
    alert('You edited a movie!')
  }

  // function findID(e){
  //   e.preventDefault()
  //   // setEditMovieHash(prevState => {
  //   //   return{...prevState, genre_id: (movies.find(movie => movie.title=e.target.value)).genre_id}
  //   // })
  //   console.log(editMovieHash)
  //   // let findMovie = (movies.find(movie => movie.title=e.target.value))
  //   // let genre_id = findMovie.genre_id
  //   // console.log('findMovie', findMovie)
  //   // console.log('genre_id', genre_id)
  //   console.log('movies', movies)
  //   console.log('genres', genres)
  // }

  return(
    <div className="addMovie">
      <h2>Add Movie</h2>
      <form onSubmit={(e)=> handleAddMovieSubmit(e)}>
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
          <input type='number'step="0.1" min="0" max="10" placeholder="Rating" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, rating: parseFloat(e.target.value)}
            })
          }}
          /> /10
        </ul>
        <ul>
          <input type='number' min="0" placeholder="Runtime" onChange={(e) => {
            setNewMovieHash(prevState => {
              return{...prevState, runtime: parseInt(e.target.value) }
            })
          }}
          /> mins
        </ul>
        <ul>
          <select type='text' onChange={(e) => {
            e.preventDefault()
            setNewMovieGenre(e.target.value)
            // setNewMovieHash(prevState => {
            //   return{...prevState, genre: e.target.value}
            // })
            }}>
              <option disabled selected>Select Genre</option>
            {genreNames && genreNames.map((name)=>{
              return(
                <option key={name.name} value={name.name}>{name.name}</option>
              )
            })}
          </select>
        </ul> 
        <button type="submit">Add New Movie</button>
      </form>
      <h2>Edit Movie</h2>
      <form onSubmit={(e)=> handleEditMovieSubmit(e)}>
        <ul>
          <select type='text' onChange={(e)=> {
            setEditMovieTitle(e.target.value)
            console.log(editMovieTitle)
          }}>
              <option disabled selected>Select Movie</option>
            {movieTitles && movieTitles.map((title)=>{
              return(
                <option key={title.title} value={title.title}>{title.title}</option>
              )
            })}
          </select>
        </ul>
        <ul>
          <input type='text'placeholder="Image URL" onChange={(e) => {
            setEditMovieHash(prevState => {
              return{...prevState, image: e.target.value }
            })
          }}/>
        </ul>
        <ul>
          <input type='text'placeholder="Title" onChange={(e) => {
            setEditMovieHash(prevState => {
              return{...prevState, title: e.target.value }
            })
          }}/>
        </ul>
        <ul>
          <input type='text' placeholder="Director" onChange={(e) => {
            setEditMovieHash(prevState => {
              return{...prevState, director: e.target.value }
            })
          }}/>
        </ul>
        <ul>
          <input type='number'step="0.1" min="0" max="10" placeholder="Rating" onChange={(e) => {
            setEditMovieHash(prevState => {
              return{...prevState, rating: parseFloat(e.target.value) }
            })
          }}/> /10
        </ul>
        <ul>
          <input type='number' min="0" placeholder="Runtime" onChange={(e) => {
            setEditMovieHash(prevState => {
              return{...prevState, runtime: parseInt(e.target.value) }
            })
          }}/> mins
        </ul>
        <ul>
        <select type='text' onChange={(e) => {
            e.preventDefault()
            setEditMovieGenre(e.target.value)
            console.log(editMovieGenre)
            }}>
              <option disabled selected>Select Genre</option>
            {genreNames && genreNames.map((name)=>{
              return(
                <option key={name.name} value={name.name}>{name.name}</option>
              )
            })}
          </select>
        </ul> 
        <button type="submit">Edit Movie</button>
      </form>
    </div>
  )
}

export default AddMovie;