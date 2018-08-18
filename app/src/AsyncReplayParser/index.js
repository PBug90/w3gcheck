const {
  ipcRenderer,
} = require('electron');

const currentWork = [];
let current = -1;


const doWork = filepath => new Promise((resolve, reject) => {
  current += 1;
  currentWork[current] = { resolve, reject };
  console.log({ current, filepath }); // eslint-disable-line
  ipcRenderer.send('parseReplay', current, filepath);
});

ipcRenderer.on('parsed', (event, replay, current2, error) => {
  console.log('Replay parsed done: ', replay, current2, error); // eslint-disable-line
  if (currentWork[current2]) {
    if (error) {
      currentWork[current2].reject(new Error(error));
    } else {
      currentWork[current2].resolve(replay);
    }
  }
});

module.exports = doWork;
