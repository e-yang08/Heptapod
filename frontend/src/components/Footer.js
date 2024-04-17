import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import linkedinIcon from "../assets/linkedIn.svg";
import facebookIcon from "../assets/facebook.svg";

export const Footer = () => {
  return (
    <div className={classes.FRoot}>
      <div className={classes.Footer}>
        <div className={classes.subContainer}>
          <div className={classes.textButton}>Support</div>
          <div>
            <div className={classes.listItem}>
              <Link to="/help">Help Page</Link>
            </div>
          </div>
        </div>
        <div className={classes.subContainer}>
          <div className={classes.textButton}>
            About <span className={classes.TitleLetter}>HEPTAP<span className={classes.OLetter}>O</span>D</span>
          </div>
          <div>
            <div className={classes.listItem}>
              <Link to="/our-story">Our Story</Link>
            </div>
            <div className={classes.listItem}>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.LastLine}>
        <div className={classes.Credentials}>
          <div>© 2024 EDUNI</div>
          <div>·</div>
          <Link to="/help">Privacy Policy</Link>
          <div>·</div>
          <Link to="/help">Terms of Service</Link>
        </div>
        <div className={classes.SnsLogos}>
          <Link className={classes.IconWrapper} to="/nofacebookpage">
            <img src={facebookIcon} alt="Facebook" />
          </Link>
          <Link
            className={classes.IconWrapper}
            to="https://www.linkedin.com/in/erela-yang-snow/"
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
