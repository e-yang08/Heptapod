import classes from "./Home.module.css";
import OriginalText from "../components/OrigintalText";
import TranslatedText from "../components/TranslatedText";
import { useText } from "../textContext";

const HomeEmoji = () => {
  const { emojiText } = useText();

  return (
    <div className={classes.homeRoot}>
      <div className={classes.trendsWrapper}>
        <div className={classes.originalText}>
          <div className={classes.titleWrapper}>Original Text</div>
          <OriginalText />
        </div>
        <div className={classes.originalText}>
          <div className={classes.titleWrapper}>
            <div className={classes.titleLetter}>Translated Text</div>
          </div>
          <TranslatedText />
          {/* <ShowEmoji emojiText={emojiText} /> */}

          {/* <div>{emojiText}</div> */}
          <textarea contenteditable="true" value={emojiText} />
        </div>
      </div>
    </div>
  );
};

export default HomeEmoji;
