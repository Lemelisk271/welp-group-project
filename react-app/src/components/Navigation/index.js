import React, { useEffect, useState, useContext } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchContext } from '../../context/SearchContext'
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import logo from "../../images/welp_logo_white_plain.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation()
  const history = useHistory()
  const [homePage, setHomePage] = useState(true)
  const [search, setSearch] = useState('')
  const { setCurrentSearch } = useContext(SearchContext)

  useEffect(() => {
    if (location.pathname !== '/') {
      setHomePage(false)
    } else {
      setHomePage(true)
    }
  }, [location])

  const linkClass = (homePage ? "nav-links-home" : "nav-links")
  const navClass = (homePage ? "nav-container-home" : "nav-container")
  const logoClass = (homePage ? "nav-logo-home" : "nav-logo")
  const navRightClass = (homePage ? "nav-right-home" : "nav-right")

  let sessionLinks

  if(sessionUser) {
    sessionLinks = (
      <div className="nav-loggedIn">
        <ProfileButton user={sessionUser} homePage={homePage}/>
      </div>
    )
  } else {
    sessionLinks = (
      <>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </>
    )
  }

  const handelFormSubmit = (e) => {
    if (search.length <= 0) {
      return
    }
    e.preventDefault()
    setCurrentSearch(search)
    history.push('/search')
    setSearch('')
  }

  const handleClick = () => {
    history.push("/business/new")
  }

  return (
      <div className={navClass}>
        <div className="nav-left">
          <NavLink exact to="/">
            <img
              className={logoClass}
              src={logo}
              alt=""
            />
          </NavLink>
        </div>
        <form className="nav-center" onSubmit={handelFormSubmit}>
          <input
            className="nav-search-bar"
            placeholder="tacos, cheap dinner, Max's"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="input-red-button" type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className={navRightClass}>
          <a className={linkClass} href="/business/new">Add a Business</a>
          <a className={linkClass} href="/review/new">Write a review</a>
          {isLoaded && sessionLinks}
        </div>
      </div>
  );
}

export default Navigation;
