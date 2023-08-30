import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import logo from "../../images/welp_logo_white_plain.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation()
  const [homePage, setHomePage] = useState(true)

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
        <div className="nav-center">
          <input className="nav-search-bar" placeholder="tacos, cheap dinner, Max's" />
          <button className="input-red-button"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className={navRightClass}>
          <span className={linkClass}>Welp for Business</span>
          <span className={linkClass}>Write a Review</span>
          {isLoaded && sessionLinks}
        </div>
      </div>
  );
}

export default Navigation;
