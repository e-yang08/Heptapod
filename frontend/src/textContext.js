import { createContext, useState, useContext } from "react";

const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [emojiText, setEmojiText] = useState("");

  return (
    <TextContext.Provider
      value={{
        translatedText,
        setTranslatedText,
        emojiText,
        setEmojiText,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export const useText = () => useContext(TextContext);
