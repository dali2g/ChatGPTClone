const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/chat', async (req, res) => {
  const message = req.body.message;
  const response = await axios.post('https://api.openai.com/v1/engine/davinci-codex/completions', {
    prompt: message,
    max_tokens: 100,
    n: 1,
    stop: '###'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });
  res.send(response.data.choices[0].text);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
