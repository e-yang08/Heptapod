import { createContext, useState, useContext } from "react";

const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [modifiedTranslation, setModifiedTranslation] = useState("");
  const [emojiText, setEmojiText] = useState("");
  const [modifiedEmojiText, setModifiedEmojiText] = useState("");

  // Function to reset context variables
  const resetContext = () => {
    setInputText("");
    setTranslatedText("");
    setSourceLang("");
    setEmojiText("");
    setModifiedTranslation("");
    setModifiedEmojiText("");
  };

  return (
    <TextContext.Provider
      value={{
        inputText,
        setInputText,
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
