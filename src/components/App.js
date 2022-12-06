import React, { useState }from "react";
import NavBar from './NavBar';
import Home from './Home';
import Movies from "./Movies";
import Genres from "./Genres";
import AddMovie from "./AddMovie";
import AddGenre from "./AddGenre";
import { Switch, Route } from "react-router-dom";


function App() {
  const [genres, setGenres] =useState(null)
  const [movies, setMovies] = useState(null)
  
  return (
    <div className="app">
      <NavBar/>
      <Switch>
        <Route path="/movies">
          <Movies setMovies={setMovies} movies={movies} genres={genres}/>
        </Route>
        <Route path="/genres">
          <Genres setGenres={setGenres} genres={genres}/>
        </Route>
        <Route path="/addMovie">
          <AddMovie/>
        </Route>
        <Route path="/addGenre">
          <AddGenre/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
