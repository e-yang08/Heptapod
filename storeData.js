const fs = require("fs");
const path = require("path");

const storeData = async (sourceLang, inputText, translatedText) => {
  try {
    // Write items to a JSON file
    const dirPath = path.join(__dirname, ".", "frontend", "public", "LangData");
    // if there is no existing directory, create one
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.join(dirPath, `${sourceLang}.json`);

    let data = [];

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Read the existing JSON data
      const jsonData = fs.readFileSync(filePath, "utf-8");
      // Parse the JSON data
      data = JSON.parse(jsonData);
    }

    // Add the new entry to the data array
    data.push({
      InputText: inputText,
      EngText: translatedText,
    });

    // Convert the data array back to JSON string
    const updatedJsonData = JSON.stringify(data);

    fs.writeFileSync(filePath, updatedJsonData);

    return "Store success";
  } catch (error) {
    console.error("Error storing textpairs:", error);
    return "Store error. Please try again.";
  }
};

module.exports = storeData;
