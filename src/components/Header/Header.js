import { React, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, logout } from "../../features/Login/UserSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { clearCart } from "../../features/Cart/CartSlice";
import "./Header.css";

import { Link } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

 
  useEffect(() => {
    //this didn't work. Try another thing.
    const myNav = document.getElementById("mynav");
    // var search = document.getElementsByClassName("search-container")[0];

    window.onscroll = function () {
      if (window.scrollY < 200 && location.pathname === '/') {
        myNav.classList.add("nav-transparent");
        myNav.classList.remove("nav-colored");
      } else {

        myNav.classList.add("nav-colored");
        myNav.classList.remove("nav-transparent");
      }
    };
  });

  const handleLogout = (e) => {
    dispatch(logout());
    dispatch(clearCart());
    delete axios.defaults.headers.common["Authorization"];
  };
  return (
    <div className="header-container">
      <header id="mynav">
        <nav>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>Contact Us</li>
            <li>About</li>
          </ul>
        </nav>
        {/* <div className="search-container">
          <input type="text" placeholder="search" />
          <div className="search-button"></div>
        </div> */}
        <SearchBox />
        <div className="authetication-container">
        {isAuthenticated && (
            <Link to = "/add-product">
              <div className="authentication"> Add Product </div>  
            </Link>
          )} 
          {isAuthenticated && (
              <div className="authentication"> <FontAwesomeIcon icon = {faHeart} /> </div>
          )}         
          {isAuthenticated && (
            <Link to="/cart">
              <div className="authentication"> <FontAwesomeIcon icon = {faShoppingCart} /> </div>
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/login">
              <div className="authentication"> Login </div>
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/signup">
              <div className="authentication signup">Sign Up</div>
            </Link>
          )}

          {isAuthenticated && (
            <Link to="/">
              <div className="authentication" onClick={handleLogout}>
                {" "}
                Logout{" "}
              </div>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
