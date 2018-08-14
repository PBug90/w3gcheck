
const cp = require('child_process');

const child = cp.fork(`${process.cwd()}/app/src/AsyncReplayParser/parserProcess`, [], { env: process.env, silent: true });
const currentWork = [];
let current = -1;

child.stdout.on('data', (data) => { console.log(data.toString()); }); // eslint-disable-line
child.stderr.on('data', (data) => { console.log(data.toString()); }); // eslint-disable-line

const doWork = filepath => new Promise((resolve, reject) => {
  current += 1;
  currentWork[current] = { resolve, reject };
  child.send({ current, filepath });
});

child.on('message', ({ current: current2, parsed, error }) => {
  if (currentWork[current2]) {
    if (error) {
      currentWork[current2].reject(new Error(error));
    } else {
      currentWork[current2].resolve(parsed);
    }
  }
});

module.exports = doWork;
