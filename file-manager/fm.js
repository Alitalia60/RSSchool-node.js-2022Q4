import { createInterface } from 'node:readline/promises';
import { homedir } from 'os';

import { fmMessagesList } from './lib/constants.js';
import { setUserName } from './lib/setUserName.js';
import { fmMessage } from './lib/fmMessage.js';
import { parseAndValidate } from './validators/parseAndValidate.js';
import { operList } from './lib/router.js';

export const fmSettings = {
  currentUser: 'Guest',
  currentDir: homedir(),
};

setUserName();

fmMessage(fmMessagesList.greeting, '!');

export const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.setPrompt('FM>> ');
fmMessage(fmMessagesList.homeFolder);
readLine.prompt();

readLine.on('close', () => fmMessage(fmMessagesList.goodbye));

readLine.on('line', async (data) => {
  if (data.trim() === '.exit') {
    readLine.close();
    return;
  }
  const [operation, ...argsArray] = parseAndValidate(data);

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
