const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.get('/', async (req, res) => {
  res.send('welcome to color mood guess.');
});
app.get('/color', async (req, res) => {
  console.log('color', req.query.like);
  console.log('runnig at /color');
  const data = req.query.like;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `The CSS code for a color like ${data}:\n\nbackground-color: #`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.2,
    presence_penalty: 0.0,
    stop: [';'],
  });
  console.log(response.data);
  res.send(response.data);
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
