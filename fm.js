import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { fmMessagesList } from './lib/constants.js';
import { fmMessage, initSettings } from './lib/utils.js';
import { parseAndValidate } from './validators/parseAndValidate.js';
import { operList } from './lib/router.js';

const __dirname = fileURLToPath(dirname(import.meta.url));

export const fmSettings = {
  currentUser: 'NoNameUser',
  currentDir: __dirname,
};

initSettings(fmSettings);

fmMessage(fmMessagesList.greeting);

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.setPrompt('FM >');
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
    // console.log(operation, ...argsArray);
    console.log();
    await operList[operation].executeFunc(...argsArray);
    console.log();
  }

  fmMessage(fmMessagesList.homeFolder);
  readLine.prompt();
});
