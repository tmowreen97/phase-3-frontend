import React from "react";

export default function NavBar(){
  return (
    <nav className="nav">
      <ul>
        <CustomLink href="/">Home</CustomLink>
        <CustomLink href="/movies">Movies</CustomLink>
        <CustomLink href="/genres">Genres</CustomLink>
        <CustomLink href="/addMovie">Add Movie</CustomLink>
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

