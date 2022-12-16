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
  const history= useHistory();

  function handleNewMovie(data){
    const newMoviesArray= [...movies, data]
    setMovies(newMoviesArray)
    history.push("/movies")
  }

  function handleEditMovie(){
    history.push("/movies")
  }

  function handleNewGenre(){
    history.push("/genres")
  }



  useEffect(()=>{
    fetch("http://localhost:9292/genres")
    .then(resp => resp.json())
    .then(data => setGenres(data))
  },[])

  useEffect(()=>{
    fetch("http://localhost:9292/movies")
    .then(resp=> resp.json())
    .then((data)=> {
      setMovies(data)
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
            <AddMovie genres={genres} movies={movies} handleNewMovie={handleNewMovie} handleEditMovie={handleEditMovie}/>
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
