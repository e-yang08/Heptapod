import { useRouteError } from "react-router-dom";
import Page_404 from "../assets/NoPage404.svg";
import classes from "./NoPageCom.module.css";

const NoPageCom = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={classes.noPageRoot}>
      <div className={classes.header}>
        <div className={classes.titleLetter}>Mmm not the right page..</div>
      </div>
      <div className={classes.imageContainer}>
        <img src={Page_404} alt="404 Error" className={classes.image} />
      </div>
    </div>
  );
};

export default NoPageCom;
