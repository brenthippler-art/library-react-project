import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

console.log("faBars value:", faBars);


const Nav = () => {
  return (
    <nav>
      <div className="nav__container">
        <a href="/">Library
          {/* commented out for testing until image is added <img src="" alt="" className="logo" /> */}
        </a>

        <ul className="nav__links">
          <li className="nav__list">
            <a href="/" className="nav__link">
              Home
            </a>
          </li>

          <li className="nav__list">
            <a href="/" className="nav__link">
              Books
            </a>
          </li>

          <button className="btn__menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;


