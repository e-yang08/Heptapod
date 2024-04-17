// GenerateEmoji.js
// import { useState, useEffect } from "react";
// import axios from "axios";

const ShowEmoji = ({ emojiText }) => {
  // const [emojis, setEmojis] = useState([]);

  return (
    <div>
      {/* {emojis.map((emoji, index) => (
        <span key={index}>{emoji}</span>
      ))} */}
      {emojiText}
    </div>
  );
};

export default ShowEmoji;
