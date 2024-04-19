import { Link } from "react-router-dom";
import Our_story from "../assets/ourStory.svg";
import classes from "./OurStory.module.css";

const OurStory = () => {
  return (
    <div className={classes.pageRoot}>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <i className={`bi bi-box2-heart fs-4 ${classes.iconImg}`}></i>
          <div className={classes.titleLetter}>Sending Warm Welcome</div>
        </div>
        <div className={classes.secondLine}>
          <div>
            We integrate{" "}
            <span className={classes.highlightLetter}>emoji 😊</span> as our
            universal language to prevent undesirable consequences due to
            machine-based translation.
          </div>
          For the detail of our story, please access{" "}
          <Link to="https://docs.google.com/document/d/1Vtw_J2Fp7qCrEbZU0KtAPXNWVHrxGeGLjEaj2c7oQ8M/edit?usp=sharing">
            <span className={`${classes.highlightLetter} ${classes.webLink}`}>
              here
            </span>
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
