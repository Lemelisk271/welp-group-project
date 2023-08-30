import React from "react";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import logo from "../../images/welp_logo_white_plain.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  // const sessionUser = useSelector((state) => state.session.user);

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
          {isLoaded && (
            <>
              <OpenModalButton
                buttonText="Log In"
                //   onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
			  <div className="nav-signup">
              <OpenModalButton
                buttonText="Sign Up"
                // onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
			  </div>
            </>
            //   <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>
  );
}

export default Navigation;
