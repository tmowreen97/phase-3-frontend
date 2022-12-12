import { render } from '@testing-library/react';
import { useEffect } from 'react';

// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../box.css'


function MovieCards({ movieList, handleDeleteMovie }) {

  const renderCard = (movie)=> {
    return(
      <div className='movie_list_cards'>
         <Card style={{ width: '18rem' }} key={movie.title} className="box">
        <Card.Img variant="top" src={movie.image} className="cardImg"/>
        <Card.Body className="cardBody">
          <h2 className="cardTitle">{movie.title}</h2>
          <div className='cardText'>
            <ul>Director | {movie.director}</ul>
            <ul>{movie.rating} | {movie.runtime} mins</ul>
            <ul>{movie.genre.name}</ul>
          </div>
        </Card.Body>
        <button onClick={() => handleDeleteMovie(movie)} >Delete</button>
      </Card>
      </div>
    )      
    }
  return (
    <div className="grid">
      {movieList.map(renderCard)}
    </div>
  )
}

export default MovieCards;