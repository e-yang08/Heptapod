import { Link } from "react-router-dom";
import PleaseWait from "../assets/pleaseWait.svg";
import classes from "./Help.module.css";

const Help = () => {
  return (
    <div className={classes.helpPageRoot}>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <i className={`bi bi-cone-striped fs-4 ${classes.iconImg}`} />
          <div className={classes.titleLetter}>
            Help Page is under construction
          </div>
        </div>
        <div className={classes.secondLine}>
          <span className={classes.highlightLetter}>but</span> feel free to
          contact us at{" "}
          <Link to="mailto:contact.me.eduni@gmail.com">
            "contact.me.eduni@gmail.com"
          </Link>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={PleaseWait} alt="Please Wait" className={classes.image} />
      </div>
    </div>
  );
};

export default Help;
