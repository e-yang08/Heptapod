import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useText } from "./textContext";

const ReloadHome = ({ children }) => {
  const { translatedText, emojiText } = useText();
  const navigate = useNavigate();

  // Redirect to the homepage
  useEffect(() => {
    if (translatedText === "" || emojiText === "") {
      navigate("/");
    }
  }, [translatedText, emojiText, navigate]);
  return children;
};

export default ReloadHome;
