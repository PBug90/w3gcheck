const cp = require('child_process');

const child = cp.fork(`${process.cwd()}/app/src/AsyncReplayParser/parserProcess`, [], { env: process.env, silent: true });
const currentWork = [];
let current = -1;

child.stdout.on('data', (data) => { console.log(data.toString()); });
child.stderr.on('data', (data) => { console.log(data.toString()); });

const doWork = filepath => new Promise((resolve, reject) => {
  // currentWork[filepath] =
  current += 1;
  currentWork[current] = { resolve, reject };
  child.send({ current, filepath });
  console.log(current, currentWork);
});

child.on('message', ({ current: current2, parsed }) => {
  console.log(current2, parsed);
  if (currentWork[current2]) {
    console.log('resolving');
    currentWork[current2].resolve(parsed);
  }
});

module.exports = doWork;
