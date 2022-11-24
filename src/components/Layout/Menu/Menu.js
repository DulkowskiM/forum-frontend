import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className= "nav-item nav-link active"  href="/">Główna <span class="sr-only">(current)</span></a>
      <a className="nav-item nav-link" href="/src/pages/login/Login.js">Logowanie</a>
      <a className="nav-item nav-link" href="/src/pages/register/Register.js">Rejestracja</a>
      <a className="nav-item nav-link disabled" href="/src/pages/admin/Admin.js">Admin</a>
    </div>
  </div>
</nav>
  )
}
   