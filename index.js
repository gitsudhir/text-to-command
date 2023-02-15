const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index', { color: 'black' }); // index refers to index.ejs
});
app.all('/color', async (req, res) => {
  try {
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
    // res.send(response.data);
    const fullColor = `#${response.data.choices[0].text}`;
    console.log(fullColor);
    res.render('index', { color: fullColor }); // index refers to index.ejs
  } catch (error) {
    res.send(error);
  }
});
app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));
