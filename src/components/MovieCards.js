import { render } from '@testing-library/react';
import { useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../box.css'


function MovieCards({ movieList }) {

  
  // function findGenre(movieID){
  //   fetch(`http://localhost:9292/genre/${movieID}`)
  //   .then(resp => resp.json())
  //   .then(data => {
  //     return(
  //       <ul>{data.name}</ul>
  //     )
      
  //   })
  // }


  const renderCard = (movie)=> {
    return(
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
        <button>Edit</button>
        <button>Delete</button>
      </Card>
    )      
    }
  
  
  
  return (

    <div className="grid">
      {movieList.map(renderCard)}
    </div>
  )
}

export default MovieCards;