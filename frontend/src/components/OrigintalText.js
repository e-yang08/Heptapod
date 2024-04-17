import { useState } from "react";
import classes from "./OriginalText.module.css";
import axios from "axios";
import { useText } from "../textContext";

const OriginalText = () => {
  const { setTranslatedText } = useText();

  const [inputText, setInputText] = useState("");

  const countSentences = (text) => {
    // Split the text into sentences using period, exclamation mark, and question mark as delimiters
    const sentences = text.split(/[.!?？。！]+/);
    return sentences.length;
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(inputText)
      .then(() => {
        console.log("Text copied to clipboard:", inputText);
        // Optionally, you can show a success message or perform other actions
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
        // Optionally, you can show an error message or perform other actions
      });
  };

  const handleTranslate = async (event) => {
    const numSentences = countSentences(inputText);
    if (numSentences > 2) {
      alert(
        "⚠️ Users can translate up to 2 sentences.\n Please kindly modify your text ✒️"
      );
      return;
    }
    const response = await axios.post("http://localhost:3001/translate", {
      text: inputText,
    });
    setTranslatedText(response.data.translation);
  };

  return (
    <div>
      <textarea
        className={`form-control`} //${classes.searchBar}
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text to translate (Max 2 sentences)"
      />
      <div
        className={`btn-toolbar justify-content-between ${classes.toolBar}`}
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <button
          className={`btn ${classes.copyIconWrapper}`}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Copy"
          onClick={handleCopyToClipboard}
        >
          <i
            className={`bi bi-copy ${classes.copyIcon} `} // ${classes.signInButton}
          />
        </button>
        <button
          className={`btn btn-dark ${classes.translateButton}`} // ${classes.signInButton}
          onClick={handleTranslate}
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default OriginalText;
