import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useText } from "./textContext";

const ReloadHome = ({ children }) => {
  const { translatedText, emojiText } = useText();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Redirect to the homepage
  useEffect(() => {
    if (
      (translatedText === "" || emojiText === "") &&
      pathname.startsWith("/translation")
    ) {
      navigate("/");
    }
  }, [translatedText, emojiText, navigate, pathname]);
  return children;
};

export default ReloadHome;
