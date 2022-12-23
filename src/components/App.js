import React, { useState, useEffect }from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Movies from "./Movies";
import Genres from "./Genres";
import AddMovie from "./AddMovie";
import AddGenre from "./AddGenre";



function App() {
  const [genres, setGenres] =useState([])
  const [movies, setMovies] = useState([])
  const [genreNames, setGenreNames] = useState([])
  const [movieTitles, setMovieTitles]= useState([])
  const history= useHistory();

  function handleNewMovie(data){
    const newMoviesArray= [...movies, data]
    setMovies(newMoviesArray)
    history.push("/movies")
  }

  function handleEditMovie(editMovieId, data){
    const updatedMovies = movies.filter((movie)=> {
      return movie.id !== editMovieId
    })
    updatedMovies.push(data)
    setMovies(updatedMovies)
    history.push("/movies")
  }

  function handleNewGenre(data){
    const updatedGenresArray = [...genres, data]
    setGenres(updatedGenresArray)
    history.push("/genres")
  }


  useEffect(()=>{
    fetch("http://localhost:9292/genres")
    .then(resp => resp.json())
    .then(data =>{
      setGenres(data)
      let moviesArray =[]
      let genreNamesArray = []
      let movieTitlesArray = []
      data.forEach(genre=> {
        genre.movies.forEach(movie => {
          movie.genre = genre
        })
        genreNamesArray.push(genre.name)
        genre.movies.forEach(movie=> {
          movieTitlesArray.push(movie.title)
        })
        moviesArray.push(genre.movies)
      })
      setMovies(moviesArray.flat())
      setGenreNames(genreNamesArray)
      setMovieTitles(movieTitlesArray)
    })
  },[])
  
  return (
    <div className="app">
        <NavBar/>
        <Switch>
          <Route path="/movies">
            <Movies  genres={genres} setMovies={setMovies} movies={movies}/>
          </Route>
          <Route path="/genres">
            <Genres setGenres={setGenres} genres={genres}/>
          </Route>
          <Route path="/add-edit-movie">
            <AddMovie genres={genres} movies={movies} handleNewMovie={handleNewMovie} handleEditMovie={handleEditMovie} genreNames={genreNames} movieTitles={movieTitles}/>
          </Route>
          <Route path="/add-genre">
            <AddGenre  setGenres={setGenres} handleNewGenre={handleNewGenre}/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      
    </div>
  );
}

export default App;
