const fs = require('fs');

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

export function loadSettings() {
  const settings = JSON.parse(fs.readFileSync('settings.json'));
  return {
    type: LOAD_SETTINGS,
    payload: settings,
  };
}

export function saveSettings(newSettings) {
  fs.writeFileSync('settings.json', JSON.stringify(newSettings, null, 2));
  return {
    type: SAVE_SETTINGS,
    payload: newSettings,
  };
}
