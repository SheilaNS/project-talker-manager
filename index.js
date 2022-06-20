const express = require('express');
const bodyParser = require('body-parser');
const { readContent } = require('./utils/fs');
const { getToken } = require('./utils/token');
const { validEmail } = require('./middlewares/emailValidation');
const { validPass } = require('./middlewares/passwordValidation');

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

// middlewares de validação feitos com a ajuda do Danillo Gonçalves
app.post('/login', validEmail, validPass, (_req, res) => {
  const token = getToken(16);
  return res.status(200).json({ token: `${token}` });
});
