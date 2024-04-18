import { useState, useEffect, useRef } from "react";
import classes from "./EmojifiedText.module.css";
import { useText } from "../textContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojifiedText = () => {
  const { emojiText, modifiedEmojiText, setModifiedEmojiText } = useText();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEmojiRevertButton, setShowEmojiRevertButton] = useState(false);

  const emojiButtonRef = useRef();
  const emojiPickerRef = useRef();

  const handleRevertEmoji = () => {
    setShowEmojiRevertButton(false); // Hide the revert button again
    setModifiedEmojiText(""); // Clear modified translation
  };

  const handleCopyToClipboard = () => {
    const textToCopy = modifiedEmojiText || emojiText;
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close the emoji picker if the click is outside of it
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        event.target !== emojiButtonRef.current // Check if the clicked element is not the emoji button
      ) {
        setShowEmojiPicker(false);
      }
      // if (!emojiPickerRef.current) return;
      // console.log(emojiPickerRef.current);
    };

    // Add event listener to handle outside clicks
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleEmojiButtonClick = (event) => {
    event.stopPropagation(); // Prevent event propagation
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiChange = async (event) => {
    const emojiRegex =
      /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu;
    const emojiMatches = event.target.value.match(emojiRegex);
    const emojiOnlyText = emojiMatches ? emojiMatches.join("") : "";
    setModifiedEmojiText(emojiOnlyText);
    setShowEmojiRevertButton(emojiOnlyText !== emojiText);
  };

  const handleEmojiSelect = (emoji) => {
    const textarea = document.getElementById("emojiResult"); // Replace "your-textarea-id" with the actual ID of your textarea element
    const cursorPos = textarea.selectionStart; // Get the current cursor position

    // Insert the emoji at the cursor position
    const newText =
      textarea.value.substring(0, cursorPos) +
      emoji.native +
      textarea.value.substring(cursorPos);

    // Update the textarea value with the new text
    setModifiedEmojiText(newText);
  };

  return (
    <div>
      <div>
        <textarea
          id="emojiResult"
          className={`form-control`}
          type="text"
          contentEditable={emojiText ? "true" : "false"}
          value={modifiedEmojiText || emojiText}
          onChange={handleEmojiChange}
          placeholder="Emojified text will appear here (you can modify if needed)"
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
            {showEmojiRevertButton && (
              <button
                className={`btn ${classes.iconWrapper}`}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Revert to initial translation"
                onClick={handleRevertEmoji}
              >
                <i
                  className={`bi bi-arrow-counterclockwise ${classes.copyIcon}`}
                />
              </button>
            )}
          </div>
          <button
            ref={emojiButtonRef}
            className={`btn btn-outline-light ${classes.emojiButton}`}
            onClick={handleEmojiButtonClick}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Emoji Keyboard"
            type="button"
          >
            ☺😊
          </button>
        </div>
      </div>
      <div ref={emojiPickerRef} className={`${classes.emojiPicker}`}>
        {showEmojiPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
      </div>
    </div>
  );
};

export default EmojifiedText;
