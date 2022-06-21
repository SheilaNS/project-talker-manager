const fs = require('fs/promises');

const readContent = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeContent = async (talker) => {
  const talkers = await readContent();

  talkers.push(talker);

  const talkersStr = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersStr);
};

const updateData = async (talker) => {
  const talkers = await readContent();

  const noTalker = talkers.filter((t) => Number(t.id) !== Number(talker.id));
  noTalker.push(talker);
  
  const newTalkersStr = JSON.stringify(noTalker);
  await fs.writeFile('./talker.json', newTalkersStr);
  await readContent();
};

module.exports = {
  writeContent,
  readContent,
  updateData,
};
