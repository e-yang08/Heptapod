import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logoNoname.svg";
import logoletter from "../assets/logoLetter.svg";
import classes from "./Header.module.css";

const Header = () => {
  // context variable
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // state variables
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header>
      <div className={classes.HRoot}>
        <div className={classes.Header}>
          <div className={classes.HeaderLeft}>
            <Link to="/" className={classes.HeaderLeftButton}>
              <div className={classes.AppLogo}>
                <img src={logo} className={classes.AppLogoImg} alt="logo" />
              </div>
              <div className={classes.AppName}>
                <img
                  src={logoletter}
                  className={classes.AppNameImg}
                  alt="heptapod"
                />
              </div>
            </Link>
          </div>

          <div className={classes.HeaderRightButton}>
            <Link
              to="/help"
              className={`btn ${classes.draftWrapper}`}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Help Page"
              type="button"
            >
              <div className={classes.draftLetterWrapper}>
                <i className={`bi bi-info-square ${classes.draftIcon}`} />
              </div>
              {/* <div className={classes.draftLetterWrapper}>
                <div className={classes.draftLetter}>Help</div>
              </div> */}
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.SpaceHolder} /> {/* for sticky header */}
    </header>
  );
};

export default Header;
