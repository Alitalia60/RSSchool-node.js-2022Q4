import os from 'os';

import { fmMessage } from '../lib/fmMessage.js';

/********************************************************
 *Print some info about operating system
 * @function osInfo
 * @param {string} arg - one of args [--xpus, --homedir, --username, --EOL, --architecture]
 *  */
export const osInfo = async (arg) => {
  return await new Promise((res, rej) => {
    try {
      switch (arg) {
        case '--EOL':
          fmMessage('End of line is: ', JSON.stringify(os.EOL));
          break;

        case '--cpus':
          const tableOfCore = os.cpus().map((item) => {
            return { core: item.model, speed: `${item.speed / 1000} Ghz` };
          });
          console.table(tableOfCore);
          break;

        case '--homedir':
          fmMessage('Homedir is: ', os.homedir());
          break;

        case '--username':
          fmMessage('Username is: ', os.userInfo().username);
          break;

        case '--architecture':
          fmMessage('Architecture is: ', os.arch);
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
