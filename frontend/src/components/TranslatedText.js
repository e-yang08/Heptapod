import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./TranslatedText.module.css";
import { useText } from "../textContext";

const TranslatedText = () => {
  const navigate = useNavigate();
  const { translatedText, emojiText, setEmojiText } = useText();

  const [modifiedTranslation, setModifiedTranslation] = useState("");
  const [showRevertButton, setShowRevertButton] = useState(false);

  const handleInputChange = (event) => {
    const modifiedText = event.target.value;
    setShowRevertButton(true);
    setModifiedTranslation(modifiedText);
  };

  const handleRevertTranslation = () => {
    setShowRevertButton(false); // Hide the revert button again
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
    const sentences = text.split(/[.!?？。！]+/);
    return sentences.length;
  };

  const handleEmojiGen = async () => {
    const numSentences = countSentences(modifiedTranslation || translatedText);
    if (numSentences > 2) {
      alert(
        "⚠️ Users can translate up to 2 sentences.\n Please kindly modify your text ✒️"
      );
      return;
    }
    const response = await axios.post("http://localhost:3001/generate-emoji", {
      text: modifiedTranslation || translatedText,
    });

    console.log("reponse created", response.data.generated_text);

    setEmojiText(response.data.generated_text);

    const translationId =
      Date.now() + (modifiedTranslation || translatedText).substring(0, 4);

    navigate(`/${translationId}`);
  };

  return (
    <div>
      <textarea
        className={`form-control`}
        type="text"
        value={modifiedTranslation || translatedText}
        onChange={handleInputChange}
        placeholder="Translated text will appear here (modify if needed)"
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
          {showRevertButton && (
            <button
              className={`btn ${classes.iconWrapper}`}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Revert to initial translation"
              onClick={handleRevertTranslation}
            >
              <i className={`bi bi-rewind-circle ${classes.copyIcon}`} />
            </button>
          )}
        </div>
      </div>
      <button
        className={`btn btn-dark ${classes.generateButton}`}
        onClick={handleEmojiGen}
        type="button"
      >
        Generate Emojis
      </button>
      <div>{emojiText}</div>
    </div>
  );
};

export default TranslatedText;
