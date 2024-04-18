const languageMapping = require("./frontend/src/deepLLangMapping.json");
const deepl = require("deepl-node");
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();
const apiKey = process.env.DEEPL_API_KEY;
const projectId = process.env.GOOGLE_PROJECT_ID;

const translateText = async (text) => {
  // Translate using deepl-node
  try {
    const googleTranslator = new Translate({ projectId });
    // const texTt = "Hello, world!";
    let [googleDetections] = await googleTranslator.detect(text);
    console.log(googleDetections.language);
    const isSupportedByDeepL = languageMapping.hasOwnProperty(
      googleDetections.language
    );

    if (isSupportedByDeepL) {
      console.log("Using DeepL for translation...");
      // Deep L
      const deeplTranslator = new deepl.Translator(apiKey);
      const deeplResult = await deeplTranslator.translateText(
        text,
        null,
        "EN-US"
      );

      return {
        deepL: true,
        translation: deeplResult.text,
        sourceLanguage: deeplResult.detectedSourceLang,
      };
    } else {
      console.log("Using Google Cloud Translate for translation...");
      const [googleTranslation] = await googleTranslator.translate(text, "en");
      return {
        deepL: false,
        translation: googleTranslation,
        sourceLanguage: googleDetections.language,
      };
    }
  } catch (error) {
    console.error("Error translating text:", error);
    return "Translation error. Please try again.";
  }

  // const apiUrl = `https://api-free.deepl.com/v2/translate`;

  // try {
  //   const response = await axios.post(
  //     apiUrl,
  //     {
  //       text: [text], // Wrap text in an array
  //       target_lang: "EN-US", // translate to english
  //     },
  //     {
  //       headers: {
  //         Authorization: `DeepL-Auth-Key ${apiKey}`, // Add authorization header
  //         "Content-Type": "application/json", // Set content type header
  //       },
  //     }
  //   );
  //   return response.data.translations[0].text;
  // } catch (error) {
  //   console.error("Error translating text:", error);
  //   return "Translation error. Please try again.";
  // }
};

module.exports = translateText;
