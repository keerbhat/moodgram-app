const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    const reply = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content
      ? response.choices[0].message.content
      : "Sorry, I couldn't get a reply.";
    res.json({ reply });
  } catch (err) {
    console.log('OpenAI error:', err); // <-- Add this line
    res.status(500).json({ reply: "Sorry, I couldn't get a reply." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
