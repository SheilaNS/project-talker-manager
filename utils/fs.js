const fs = require('fs/promises');

const readContent = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeContent = async (talker) => {
  const talkers = await readContent();

  talkers.push(talker);

  const talkersStr = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersStr);
};

module.exports = {
  writeContent,
  readContent,
};
