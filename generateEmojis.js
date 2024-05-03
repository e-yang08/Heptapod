const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const { exampleText } = require("./prompt.json");

const generateEmojis = async (text) => {
  const sentences = text.split(/[.!?？。！]+/);
  // Remove the last element if it's an empty string
  if (sentences[sentences.length - 1] === "") {
    sentences.pop();
  }

  const sentenceLen = sentences.length;

  let inputText = "";

  // Iterate through each sentence in the text
  sentences.forEach((sentence, index) => {
    inputText += `${index + 1}. `;
    inputText += `"${sentence}"`;
    inputText += "\n";
  });

  const prompt = `Generate${
    sentenceLen === 1 ? " a list" : ` ${sentenceLen} lists`
  }of emojis that correspond to the following sentences:\n\n${inputText}\n
  ${exampleText}`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);

  try {
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
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
