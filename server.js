const express = require("express");
const translateText = require("./translateText");
const generateEmojis = require("./generateEmojis"); // Import the function for generating emojis

const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  try {
    const translatedText = await translateText(text);
    res.json({ translation: translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/generate-emoji", async (req, res) => {
  const { text } = req.body;
  try {
    const emojis = await generateEmojis(text); // Call the function to generate emojis
    console.log("emojis", emojis);
    res.json(emojis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
