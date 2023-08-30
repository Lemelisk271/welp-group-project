import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import logo from "../../images/welp_logo_white_plain.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef()

  console.log(ulRef)

  let sessionLinks

  if(sessionUser) {
    sessionLinks = (
      <div className="nav-loggedIn">
        <ProfileButton user={sessionUser} />
      </div>
    )
  } else {
    sessionLinks = (
      <>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
			  <div className="nav-signup">
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
			  </div>
      </>
    )
  }

  return (
      <div className="nav-container">
        <div className="nav-left">
          <NavLink exact to="/">
            <img
              className="nav-logo"
              src={logo}
              alt=""
            />
          </NavLink>
        </div>
        <div className="nav-center">
          <input className="nav-search-bar" placeholder="tacos, cheap dinner, Max's" />
          <button className="input-red-button"><i className="fa-light fa-magnifying-glass" /></button>
        </div>
        <div className="nav-right">
          <span className="nav-links">Welp for Business</span>
          <span className="nav-links">Write a Review</span>
          {isLoaded && sessionLinks}
        </div>
      </div>
  );
}

export default Navigation;
