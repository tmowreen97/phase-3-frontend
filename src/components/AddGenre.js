import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

function AddGenre (){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  // const history = useHistory();

  // const handleHistory = () => {
  //   history.push("/genres")
  // }

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
    setName('')
    setDescription('')
    alert("You just created a new genre!")
    // handleHistory()
  }

  
  return(
    <div className="addGenre">
      <h2>Add Genre</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <ul>
          <input value={name} type='text' placeholder="Name" onChange={(e) => {
            setName(e.target.value)
            console.log(name)
          }}/>
        </ul>
        <ul>
          <input value={description} type='text' placeholder="Description"onChange={(e) => {
            setDescription(e.target.value)
            console.log(description)
          }}/>
        </ul>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddGenre;