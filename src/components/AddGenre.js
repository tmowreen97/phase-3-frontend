import React, { useState } from "react";

function AddGenre ({ handleNewGenre }){
  const [newGenre, setNewGenre]= useState({
    name: '',
    description: ''
  })


  function handleSubmit(e){
    e.preventDefault()
    fetch("http://localhost:9292/genres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGenre),
    })
    .then(resp => resp.json())
    .then(data => {
      alert(`You just created a new genre, ${data.name}!`)
      handleNewGenre(data)
    })
  }

  
  return(
    <div className="add_genre_div">
      <h1 className="add_genre_title">Add Genre</h1>
      <div className="genre_form">
        <form className="add_genre_form" onSubmit={(e)=>handleSubmit(e)}>
        <ul>
          <label className="label">New Genre Name: </label>
          <input className="genre_form_input" value={newGenre.name} type='text' placeholder="Name" onChange={(e) => {
            setNewGenre(prevState =>{
              return {...prevState, name: e.target.value}
            })
          }}/>
        </ul>
        <ul>
        <label className="label">New Genre Description: </label>
          <input className="genre_form_input" value={newGenre.description} type='text' placeholder="Description"onChange={(e) => {
            setNewGenre(prevState =>{
              return {...prevState, description: e.target.value}
            })
          }}/>
        </ul>
        <button className="add_genre_button" type='submit'>Add New Genre</button>
      </form>
      </div>
      
    </div>
  )
}

export default AddGenre;