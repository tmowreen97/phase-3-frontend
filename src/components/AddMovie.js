import React from "react";

function AddMovie(){

  return(
    <div className="addMovie">
      <h2>Add Movie</h2>
      <form>
        <ul>
          <input type='text' placeholder="Image URL"/>
        </ul>
        <ul>
          <input type='text'placeholder="Title"/>
        </ul>
        <ul>
          <input type='text' placeholder="Director"/>
        </ul>
        <ul>
          <input type='text'placeholder="Rating"/>
        </ul>
        <ul>
          <input type='text'placeholder="Runtime"/>

        </ul>
        <ul>
          <input type='text'placeholder="Genre"/>
        </ul> 
        <button type="submit">Add New Movie</button>
      </form>
      <h2>Edit Movie</h2>
      <form>
        <ul>
          <input type='text' placeholder="Image URL"/>
        </ul>
        <ul>
          <input type='text'placeholder="Title"/>
        </ul>
        <ul>
          <input type='text' placeholder="Director"/>
        </ul>
        <ul>
          <input type='text'placeholder="Rating"/>
        </ul>
        <ul>
          <input type='text'placeholder="Runtime"/>

        </ul>
        <ul>
          <input type='text'placeholder="Genre"/>
        </ul> 
        <button type="submit">Edit Movie</button>
      </form>
    </div>
  )
}

export default AddMovie;