const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const projectId = process.env.GOOGLE_PROJECT_ID;

const translateText = async (text) => {
  try {
    const translate = new Translate({ projectId });

    // Detect the language of the text
    const [detections] = await translate.detect(text);
    const sourceLanguage = detections.language;

    console.log("source", sourceLanguage);

    // Translate the text
    const [translation] = await translate.translate(text, "en");

    return {
      translation: translation,
      sourceLanguage: sourceLanguage,
    };
  } catch (error) {
    console.error("Error translating texttt:", error);
    console.error("Stack trace:", error.stack);
    return "Translation error. Please try again.";
  }
};

module.exports = translateText;
