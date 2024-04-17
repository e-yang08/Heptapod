import classes from "./Home.module.css";
import OriginalText from "../components/OrigintalText";
import TranslatedText from "../components/TranslatedText";

const Home = () => {
  return (
    <div className={classes.homeRoot}>
      <div className={classes.trendsWrapper}>
        <div className={classes.originalText}>
          <div className={classes.titleWrapper}>Original Text</div>
          <OriginalText />
        </div>
        <div className={classes.originalText}>
          <div className={classes.titleWrapper}>
            {/* <img className={classes.iconImg} src={lightbulb} alt="light"></img> */}
            <div className={classes.titleLetter}>Translated Text</div>
          </div>
          <TranslatedText />
        </div>
      </div>
    </div>
  );
};

export default Home;
