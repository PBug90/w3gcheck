const W3GReplay = require('w3gjs');

const parser = new W3GReplay();

process.on('message', ({ current, filepath }) => {
  const parsed = parser.parse(filepath);
  delete parsed.meta.blocks;
  process.send({ current, filepath, parsed });
});
