import { useState } from "react";
import classes from "./OriginalText.module.css";
import axios from "axios";
import { useText } from "../textContext";
import deeplLanguageMapping from "../deeplLangMapping.json";
import googleLangMapping from "../googleLangMapping.json";

const OriginalText = () => {
  const { setTranslatedText, setSourceLang } = useText();

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

  const handleTranslate = async () => {
    // Check if input text is empty
    if (!inputText.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    const numSentences = countSentences(inputText);
    if (numSentences > 2) {
      alert(
        "⚠️ Users can translate up to 2 sentences.\n Please kindly modify your text ✒️"
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/translate", {
        text: inputText,
      });

      if (response.data.error) {
        // Handle translation error
        console.error("Translation error:", response.data.error);
      } else {
        // Update state
        setTranslatedText(response.data.translation.translation);

        const sourceLCode = response.data.translation.sourceLanguage;
        const isDeepL = response.data.translation.deepL;

        // map source language
        if (isDeepL) {
          setSourceLang(deeplLanguageMapping[sourceLCode]);
        } else {
          setSourceLang(googleLangMapping[sourceLCode]);
        }
      }
    } catch (error) {
      console.error("Error translating text:", error);
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
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default OriginalText;
