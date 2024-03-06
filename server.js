// // server.js
// const express = require('express');
// const { default: axios } = require('axios');
// const bodyParser = require('body-parser');
// console.log("1234")

// const app = express();
// app.use(bodyParser.json());

// const OPENAI_API_KEY = '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';

// app.post('/', async (req, res) => {
//   try {
//     const message = req.body.message;

//     const response = await axios.post(
//       'https://api.openai.com/v1/completions',
//       {
//         model: 'text-davinci-002',
//         prompt: message,
//         max_tokens: 150,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`,
//         },
//       }
//     );

//     res.send(response.data.choices[0].text.trim());
//   } catch (error) {
//     console.log("1234")
//     console.error(error);
//     res.status(500).send('An error occurred');
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// console.log("1234")

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = "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";

app.use(express.json());

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

app.post("/getresponse", async (req, res) => {
  const userPrompt = req.body.message;

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
  // res.json({ reply: response.data.choices[0].text.trim() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Route to handle incoming messages
// app.post('/chat', async (req, res) => {
//   try {
//     const message = req.body.message;

//     // Call OpenAI API to get a response
//     const response = await axios.post(
//       'https://api.openai.com/v1/completions',
//       {
//         model: 'text-davinci-002',
//         prompt: message,
//         max_tokens: 150,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`, // Replace with your actual OpenAI API key
//         },
//       }
//     );

//     res.json({ reply: response.data.choices[0].text.trim() });
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
