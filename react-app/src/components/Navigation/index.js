import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
	<div className="navigation hero-bar">
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
		<input className="navigation nav-search-bar" />
		<button>Search</button>
      </div>
      <div className="navigation nav-right">
          {isLoaded && (
              <ProfileButton user={sessionUser} />
          )}
      </div>
    </div>
	</div>
  );
}

export default Navigation;
