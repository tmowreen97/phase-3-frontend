import React from "react";

export default function NavBar(){
  return (
    <nav className="nav">
      <ul className="nav_selection">
        <CustomLink href="/">Home</CustomLink>
      </ul>
      <ul>
        <CustomLink href="/movies">Movies</CustomLink>
      </ul>
      <ul>
        <CustomLink href="/genres">Genres</CustomLink>
      </ul>
      <ul>
        <CustomLink href="/addMovie">Add Movie</CustomLink>
      </ul>
      <ul>
        <CustomLink href="/addGenre">Add Genre</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ href, children}){
  const path= window.location.pathname
  return (
    <li className={path === href ? "active" : ""}>
      <a href={href}>
        {children}
      </a>
    </li>
  )

}

