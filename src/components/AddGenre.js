import React from "react";

function AddGenre (){
  return(
    <div className="addGenre">
      <form>
        <ul>
          <input type='text' placeholder="Name"/>
        </ul>
        <ul>
          <input type='text' placeholder="Description"/>
        </ul>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddGenre;