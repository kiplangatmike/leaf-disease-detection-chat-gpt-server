require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use

const openai = new OpenAI({
  apiKey: apiKey,
});

app.post("/find", async (req, res) => {
  const userPrompt = req.body.message;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 150,
    });
    console.log(response.choices[0].message.content);
    res.send(response.choices[0].message.content);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "user",
  //       content: userPrompt,
  //     },
  //   ],
  //   max_tokens: 150,
  // });
  // console.log(response.choices[0].message.content);
  // res.send(response.choices[0].message.content);
  // res.json({ reply: response.data.choices[0].text.trim() });

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
