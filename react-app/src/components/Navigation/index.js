import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
      <div className="navigation nav-container">
        <div className="navigation nav-left">
          <NavLink exact to="/">
            <img
              className="navigation nav-logo"
              src="https://placehold.co/80x40/000000/FFFFFF.png"
            />
          </NavLink>
        </div>
        <div className="navigation nav-center">
          <input className="navigation nav-search-bar" placeholder="tacos, cheap dinner, Max's" />
          <button className="big-red-button search-icon"><i className="fa-light fa-magnifying-glass"></i></button>
        </div>
        <div className="navigation nav-right">
			<span className="navigation nav-links">Welp for Business</span>
			<span className="navigation nav-links">Write a Review</span>
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
