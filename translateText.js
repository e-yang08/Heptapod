const axios = require("axios");
const deepl = require("deepl-node");
require("dotenv").config();
const apiKey = process.env.DEEPL_API_KEY;

const translateText = async (text) => {
  // Translate using deepl-node
  try {
    const translator = new deepl.Translator(apiKey);
    const result = await translator.translateText(text, null, "EN-US");
    return result.text;
  } catch (deeplError) {
    console.error("Error translating text using deepl-node:", deeplError);
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
