import classes from "./OriginalText.module.css";
import axios from "axios";
import { useState } from "react";
import { useText } from "../textContext";
import googleLangMapping from "../googleLangMapping.json";

const OriginalText = () => {
  const {
    inputText,
    setInputText,
    setTranslatedText,
    setModifiedTranslation,
    setSourceLang,
  } = useText();

  const [loading, setLoading] = useState(false);

  const countSentences = (text) => {
    // Split the text into sentences using period, exclamation mark, and question mark as delimiters
    const sentences = text.split(/[.!?？。！]+/).filter(Boolean);
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

  const handleTranslate = async () => {
    setLoading(true);

    try {
      // Check if input text is empty
      if (!inputText.trim()) {
        throw new Error("Please enter text to translate.");
      }

      const numSentences = countSentences(inputText);
      if (numSentences > 2) {
        throw new Error(
          "⚠️ Users can translate up to 2 sentences.\n Please kindly modify your text ✒️"
        );
      }

      const response = await axios.post("http://localhost:3001/translate", {
        text: inputText,
      });

      if (response.data.error) {
        // Handle translation error
        throw new Error("Translation error:", response.data.error);
      } else {
        // Update state
        setTranslatedText(response.data.translation.translation);
        setModifiedTranslation(response.data.translation.translation);

        const sourceLCode = response.data.translation.sourceLanguage;
        setSourceLang(googleLangMapping[sourceLCode]);
      }
    } catch (error) {
      console.error("Error translating text:", error.message);
      alert(`${error.message} Please try again.`);
    } finally {
      setLoading(false);
    }
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
          className={`btn btn-light ${classes.translateButton}`} // ${classes.signInButton}
          onClick={handleTranslate}
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
            "Translate"
          )}
        </button>
      </div>
    </div>
  );
};

export default OriginalText;
