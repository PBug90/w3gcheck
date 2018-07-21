export const convertTime = (time) => { //eslint-disable-line
  const seconds = time / 1000;
  const minutes = Math.round(seconds / 60);
  const secondsPart = Math.floor(((seconds / 60.0) % 1) * 60);
  return `${minutes}:${secondsPart < 10 ? `0${secondsPart}` : secondsPart}`;
};
