import React, { useState, useEffect }from "react";
import NavBar from './NavBar';
import Home from './Home';
import Movies from "./Movies";
import Genres from "./Genres";
import AddMovie from "./AddMovie";
import AddGenre from "./AddGenre";
import { Switch, Route, useHistory } from "react-router-dom";


function App() {
  const [genres, setGenres] =useState(null)
  const [movies, setMovies] = useState(null)
  // const history = useHistory();

  // function handleHistory(){
  //   history.push("/genres")
  // }
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
          <AddMovie genres={genres} movies={movies}/>
        </Route>
        <Route path="/add-genre">
          <AddGenre  setGenres={setGenres}/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
