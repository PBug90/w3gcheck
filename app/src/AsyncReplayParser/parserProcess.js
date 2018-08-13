const W3GReplay = require('w3gjs');

const parser = new W3GReplay();

process.on('message', ({ current, filepath }) => {
  console.log('parsing...');
  const parsed = parser.parse(filepath);
  delete parsed.meta.blocks;
  console.log(current, filepath, parsed);
  process.send({ current, filepath, parsed });
});
