const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const generateEmojis = async (text) => {
  const apiKey = process.env.EDENAI_API_KEY;
  // Translate using deepl-node
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    data: {
      providers: "openai",
      text: `write a sentence of emoji that means ${text}.`,
      temperature: 0.2,
      max_tokens: 250,
      fallback_providers: "",
    },
  };

  // Write items to a JSON file
  const dirPath = path.join(
    __dirname,
    ".",
    "frontend",
    "public",
    "visualTranslation"
  );

  // if there is no existing directory, create one
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  // how to check if there is any other event listeners? and

  try {
    const response = await axios.request(options);
    const { openai } = response.data;

    fs.writeFileSync(
      path.join(dirPath, "hi.json"),
      JSON.stringify(openai, null, 2)
    );
    return openai;
  } catch (error) {
    console.error("Error generating emojis:", error.message);
    return "Translation error. Please try again.";
  }

  // axios.request(options).then(function (response) {
  //   const { openai } = response.data;
  //   // const items = replicate.generatedText;

  //   // Write items to a JSON file
  //   const dirPath = path.join(
  //     __dirname,
  //     ".",
  //     "frontend",
  //     "src",
  //     "generatedImages"
  //   );

  //   // if there is no existing directory, create one
  //   if (!fs.existsSync(dirPath)) {
  //     fs.mkdirSync(dirPath);
  //   }

  //   fs.writeFileSync(
  //     path.join(dirPath, "text.json"),
  //     JSON.stringify(openai, null, 2)
  //   );
  // });
};

module.exports = generateEmojis;

// for image generation
// const options = {
//   method: "POST",
//   url: "https://api.edenai.run/v2/image/generation",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     authorization: `Bearer ${apiKey}`,
//   },
//   data: {
//     fallback_providers: "",
//     response_as_dict: true,
//     attributes_as_list: false,
//     show_original_response: false,
//     num_images: 2,
//     providers: "replicate",
//     text: "A huge red ballon flying outside the city.",
//     resolution: "512x512",
//   },
// };
