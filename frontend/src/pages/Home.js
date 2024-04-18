import classes from "./Home.module.css";
import OriginalText from "../components/OriginalText";
import TranslatedText from "../components/TranslatedText";
import EmojifiedText from "../components/EmojifiedText";
import { useText } from "../textContext";

const Home = () => {
  const { sourceLang } = useText();
  return (
    <>
      {/* Modal for SignIn */}
      <div className={`modal fade`} id="LangQ" aria-hidden="true" tabIndex="-1">
        <div className={`modal-dialog modal-dialog-centered`}>
          <div className={`modal-content`}>
            <div className={`modal-header`}>
              <span className={`${classes.modalHeaderTitle}`}>
                Language Detection
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className={`modal-body text-start`}>
              DeepL or Google Translate will detect the original text's
              language. If there are any descrepancy, please contact our
              support.
            </div>
          </div>
        </div>
      </div>

      {/* actual div */}
      <div className={classes.homeRoot}>
        <div className={classes.mainWrapper}>
          <div className={classes.originalText}>
            <div className={classes.titleWrapper}>
              <div className={classes.titleLetter}>Original Text</div>
              <div className={classes.detectedLangWrapper}>
                <div className={`${classes.detectedLang}`}>
                  Detected Language {sourceLang && `: ${sourceLang}`}
                </div>
                <i
                  className={`bi bi-question-square ${classes.iconWrapper}`}
                  data-bs-toggle="modal"
                  data-bs-target="#LangQ"
                  type="button"
                />
              </div>
            </div>
            <OriginalText />
          </div>
          <i
            className={`bi bi-caret-right-fill ${classes.arrowIcon}  ${classes.toRightIcon}`}
          />
          <div className={classes.originalText}>
            <div className={classes.titleWrapper}>
              <div className={classes.titleLetter}>English Text</div>
            </div>
            <TranslatedText />
            <i
              className={`bi bi-caret-down-fill ${classes.arrowIcon} ${classes.toDownIcon}`}
            />
            <i
              className={`bi bi-caret-down-fill ${classes.arrowIcon} ${classes.toDownIcon}`}
            />
            <div className={`mt-4 ${classes.titleWrapper}`}>
              <div className={classes.titleLetter}>Emojified Text</div>
            </div>
            <EmojifiedText />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
