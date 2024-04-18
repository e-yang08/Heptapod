import { createContext, useState, useContext } from "react";

const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [modifiedTranslation, setModifiedTranslation] = useState("");
  const [emojiText, setEmojiText] = useState("");
  const [modifiedEmojiText, setModifiedEmojiText] = useState("");

  // Function to reset context variables
  const resetContext = () => {
    setTranslatedText("");
    setEmojiText("");
    setModifiedTranslation("");
  };

  return (
    <TextContext.Provider
      value={{
        translatedText,
        setTranslatedText,
        sourceLang,
        setSourceLang,
        modifiedTranslation,
        setModifiedTranslation,
        emojiText,
        setEmojiText,
        modifiedEmojiText,
        setModifiedEmojiText,
        resetContext,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export const useText = () => useContext(TextContext);
