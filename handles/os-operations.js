import os from 'os';

import { fmMessage } from '../lib/fmMessage.js';

export const osInfo = async (arg) => {
  return await new Promise((res, rej) => {
    try {
      switch (arg) {
        case '--EOL':
          fmMessage(JSON.stringify(os.EOL));
          break;

        case '--cpus':
          const tableOfCore = os.cpus().map((item) => {
            return { core: item.model, speed: `${item.speed / 1000} Ghz` };
          });
          console.table(tableOfCore);
          break;

        case '--homedir':
          fmMessage(os.homedir());
          break;

        case '--username':
          fmMessage(os.userInfo().username);
          break;

        case '--arhitecture':
          fmMessage(os.arch);
          break;

        default:
          rej(`OS: invalid argument passed: ${arg}`);
          break;
      }
    } catch (err) {
      if (err) {
        rej(err);
        return;
      }
      rej(() => {
        fmMessage('OS: unknown error');
      });
    }
    res();
  });
};
