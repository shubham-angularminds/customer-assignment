import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    homeLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    menuClass: "",
  });

  const toggleMenu = () => {
    setState({
      ...state,
      menu: !state.menu,
    });
  };

  const toggleOpen = () => setState({ ...state, isOpen: !state.isOpen });

  const show = state.menu ? "show" : "";
  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon" />
      </button>
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
          <Link
            className={state.aboutLinkClass}
            to="/"
            onClick={() =>
              state.aboutLinkClass === "nav-item nav-link"
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
          >
            {" "}
            View Customers
          </Link>
          <Link
            className={state.homeLinkClass}
            to="/customer/add"
            onClick={() =>
              state.homeLinkClass === "nav-item nav-link"
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
          >
            Add Customer
            <span className="sr-only">(current)</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
