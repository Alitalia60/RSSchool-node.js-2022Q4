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
          fmMessage('Architecture is: ', os.arch());
          break;

        case '--full':
          fmMessage('OS type: ', os.type());
          fmMessage('OS version: ', os.version());
          fmMessage('Platform: ', os.platform());
          fmMessage('Release: ', os.release());
          fmMessage('Architecture: ', os.arch());
          fmMessage('Core: :');
          console.table(os.cpus());
          fmMessage(
            'Total mem: ',
            (os.totalmem() / 1024 / 1024).toFixed(2) + ' Mb'
          );
          fmMessage(
            'Freemem is: ',
            (os.freemem() / 1024 / 1024).toFixed(2) + ' Mb'
          );
          fmMessage('homedir is: ', os.homedir());
          fmMessage('End of line is: ', JSON.stringify(os.EOL));
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
