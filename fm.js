import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import { fmMessagesList } from './lib/constants.js';
import { initSettings } from './lib/initSettings.js';
import { fmMessage } from './lib/fmMessage.js';
import { parseAndValidate } from './validators/parseAndValidate.js';
import { operList } from './lib/router.js';

const __dirname = fileURLToPath(dirname(import.meta.url));

export const fmSettings = {
  currentUser: 'NoNameUser',
  currentDir: __dirname,
};

initSettings(fmSettings);

fmMessage(fmMessagesList.greeting, '!');

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.setPrompt('FM > ');
fmMessage(fmMessagesList.homeFolder);
readLine.prompt();

readLine.on('close', () => fmMessage(fmMessagesList.goodbye));

readLine.on('line', async (data) => {
  if (data.trim() === '.exit') {
    readLine.close();
    return;
  }
  const [operation, argsArray] = parseAndValidate(data);

  if (operation) {
    console.log();
    await operList[operation]
      .executeFunc(...argsArray)
      .catch((err) => {
        fmMessage(fmMessagesList.invalid);
        fmMessage(`  ${err}`);
      })
      .finally(() => {
        console.log();
        fmMessage(fmMessagesList.homeFolder);
        readLine.prompt();
      });
  } else {
    console.log();
    fmMessage(fmMessagesList.homeFolder);
    readLine.prompt();
  }
});
