import { Link } from "react-router-dom";
import logo from "../assets/logoNoname.svg";
import logoletter from "../assets/logoLetter.svg";
import classes from "./Header.module.css";
import { useText } from "../textContext";

const Header = () => {
  // context variable
  const { resetContext } = useText();

  return (
    <header>
      {/* Modal for how to use */}
      <div className={`modal fade`} id="HowTo" aria-hidden="true" tabIndex="-1">
        <div className={`modal-dialog modal-dialog-centered`}>
          <div className={`modal-content`}>
            <div className={`modal-header`}>
              <span className={`${classes.modalHeaderTitle}`}>
                How to use{" "}
                <span className={classes.TitleLetter}>
                  HEPTAP<span className={classes.OLetter}>O</span>D
                </span>
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className={`modal-body text-start`}>
              <span className={classes.TitleLetter}>
                HEPTAP<span className={classes.OLetter}>O</span>D
              </span>{" "}
              is a multimodal translation service. Here are two ways to use us!
              <div>1: Original Text → English Text → Emojify </div>
              <div>2: English Text → Emojify </div>
              🎉 Happy translation! 💫
            </div>
          </div>
        </div>
      </div>
      {/* main header*/}
      <div className={classes.HRoot}>
        <div className={classes.Header}>
          <div className={classes.HeaderLeft}>
            <Link
              to="/"
              className={classes.HeaderLeftButton}
              onClick={resetContext}
            >
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
            <button
              className={`btn ${classes.draftWrapper}`}
              data-bs-toggle="modal"
              data-bs-target="#HowTo"
              type="button"
            >
              <div className={classes.draftLetterWrapper}>
                <i className={`bi bi-info-square ${classes.draftIcon}`} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.SpaceHolder} /> {/* for sticky header */}
    </header>
  );
};

export default Header;
