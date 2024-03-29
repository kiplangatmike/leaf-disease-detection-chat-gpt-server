require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;
const chatRoutes = require("./api/chatRoutes");

app.use(express.json());

app.use("/", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
