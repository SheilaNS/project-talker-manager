const express = require('express');
const bodyParser = require('body-parser');
const { readContent } = require('./utils/fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readContent();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContent();
  
  const talkerId = talkers.find((elem) => elem.id === Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  const talker = talkers.filter((elem) => elem.id === Number(id));

  return res.status(200).json(talker[0]);
});
