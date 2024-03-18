const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;


const openai = new OpenAI({
    apiKey: apiKey,
  });
  
  router.post("/chat", async (req, res) => {
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
  
  module.exports = router;