import { Link } from "react-router-dom";
import Our_story from "../assets/our_story.svg";
import classes from "./OurStory.module.css";

const OurStory = () => {
  return (
    <div className={classes.pageRoot}>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <i className={`bi bi-box2-heart fs-4 ${classes.iconImg}`}></i>
          <div className={classes.titleLetter}>
            Welcome to <span className={classes.logoLetter}>forward</span>
          </div>
        </div>
        <div className={classes.secondLine}>
          You can access the detail of our story{" "}
          <Link to="https://docs.google.com/document/d/1RXqwjN8U2TGEDKp39PnFIfsxBHOqCLA58zWlA5m4bnI/edit?usp=sharing">
            <span className={classes.highlightLetter}>here</span>
          </Link>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={Our_story} alt="Our Story" className={classes.image} />
      </div>
    </div>
  );
};

export default OurStory;
