import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./TranslatedText.module.css";
import { useText } from "../textContext";

const TranslatedText = () => {
  const navigate = useNavigate();
  const {
    translatedText,
    setEmojiText,
    setModifiedEmojiText,
    modifiedTranslation,
    setModifiedTranslation,
  } = useText();

  const [loading, setLoading] = useState(false);
  const [showLangRevertButton, setShowLangRevertButton] = useState(false);

  const handleInputChange = (event) => {
    const modifiedText = event.target.value;
    setShowLangRevertButton(translatedText !== modifiedText);
    setModifiedTranslation(modifiedText);
  };

  const handleRevertTranslation = () => {
    setShowLangRevertButton(false); // Hide the revert button again
    setModifiedTranslation(""); // Clear modified translation
  };

  const handleCopyToClipboard = () => {
    const textToCopy = modifiedTranslation || translatedText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard:", textToCopy);
        // Optionally, you can show a success message or perform other actions
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
        // Optionally, you can show an error message or perform other actions
      });
  };

  const countSentences = (text) => {
    // Split the text into sentences using period, exclamation mark, and question mark as delimiters
    const sentences = text.split(/[.!?？。！]+/).filter(Boolean);
    return sentences.length;
  };

  const handleEmojiGen = async () => {
    setLoading(true);

    try {
      // Check if input text is empty
      if (!modifiedTranslation.trim() && !translatedText.trim()) {
        throw new Error("Please enter an English sentence to emojify.");
      }

      const numSentences = countSentences(
        modifiedTranslation || translatedText
      );
      if (numSentences > 2) {
        throw new Error(
          "⚠️ Users can translate up to 2 sentences. \nPlease kindly modify your text. ✒️"
        );
      }

      const response = await axios.post(
        "http://localhost:3001/generate-emoji",
        {
          text: modifiedTranslation || translatedText,
        }
      );

      console.log("response created", response.data.generated_text);

      const emojiRegex =
        /[\p{Extended_Pictographic}.?!, ](?:[\u{200D}\u{FE0F}][\p{Extended_Pictographic}])*/gu;
      const generatedText = response.data.generated_text.replace(/\n/g, "");
      const sentences = generatedText.split(/[.\d]+/).filter(Boolean); // Split based on periods and digits
      console.log("sentences", sentences);
      const emojiOnlyText = sentences
        .map((sentence) => {
          const emojiMatches = sentence.match(emojiRegex);
          // Join with space to retain original punctuation marks
          return emojiMatches ? emojiMatches.join("") : "";
        })
        .join(".\n"); // Join the sentences with a period and newline

      // Set both emojiText and modifiedEmojiText to the emojified text
      setEmojiText(emojiOnlyText + ".");
      setModifiedEmojiText(emojiOnlyText);

      const translationId =
        Date.now() + (modifiedTranslation || translatedText).substring(0, 4);

      navigate(`/translation/${translationId}`);
    } catch (error) {
      console.error("Error generating emojis:", error.message);
      alert(`${error.message} Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        className={`form-control ${classes.translationTextarea}`}
        type="text"
        value={modifiedTranslation || translatedText}
        onChange={handleInputChange}
        placeholder="Translated text will appear here (editable text)"
      />
      <div
        className={`btn-toolbar justify-content-between ${classes.toolBar}`}
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group me-2" role="group" aria-label="First group">
          <button
            className={`btn ${classes.iconWrapper}`}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Copy"
            onClick={handleCopyToClipboard}
          >
            <i className={`bi bi-copy ${classes.copyIcon}`} />
          </button>
          {showLangRevertButton && (
            <button
              className={`btn ${classes.iconWrapper}`}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Revert to initial translation"
              onClick={handleRevertTranslation}
            >
              <i
                className={`bi bi-arrow-counterclockwise ${classes.copyIcon}`}
              />
            </button>
          )}
        </div>
        <button
          className={`btn btn-dark ${classes.generateButton}`}
          onClick={handleEmojiGen}
          type="button"
        >
          {loading ? (
            <>
              <span
                className={`spinner-border spinner-border-sm `} // ${classes.arrowIcon} ${classes.toDownIcon}
                aria-hidden="true"
              ></span>
            </>
          ) : (
            "Emojify"
          )}
        </button>
      </div>
    </div>
  );
};

export default TranslatedText;
