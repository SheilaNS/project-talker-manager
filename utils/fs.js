const fs = require('fs/promises');

const readContent = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeContentFile = async (data) => {
  const teams = await readContent();

  teams.push(data);

  const teamsToStr = JSON.stringify(teams);
  await fs.writeFile('./teams.json', teamsToStr);
};

module.exports = {
  writeContentFile,
  readContent,
};
