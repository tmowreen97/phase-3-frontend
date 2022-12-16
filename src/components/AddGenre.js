import React, { useState } from "react";

function AddGenre ({ handleNewGenre }){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    fetch("http://localhost:9292/genres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${name}`,
        description: `${description}`
      }),
    })
    .then(resp => resp.json())
    .then(data => {
      setName('')
      setDescription('')
      alert(`You just created a new genre, ${data.name}!`)
      handleNewGenre()
    })

    // handleHistory()
  }

  
  return(
    <div className="add_genre_div">
      <h1 className="add_genre_title">Add Genre</h1>
      <div className="genre_form">
        <form className="add_genre_form" onSubmit={(e)=>handleSubmit(e)}>
        <ul>
          <label className="label">New Genre Name: </label>
          <input className="genre_form_input" value={name} type='text' placeholder="Name" onChange={(e) => {
            setName(e.target.value)
            console.log(name)
          }}/>
        </ul>
        <ul>
        <label className="label">New Genre Description: </label>
          <input className="genre_form_input" value={description} type='text' placeholder="Description"onChange={(e) => {
            setDescription(e.target.value)
            console.log(description)
          }}/>
        </ul>
        <button className="add_genre_button" type='submit'>Add New Genre</button>
      </form>
      </div>
      
    </div>
  )
}

export default AddGenre;