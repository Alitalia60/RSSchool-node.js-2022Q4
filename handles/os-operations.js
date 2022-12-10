import os from 'os';
import { fmMessage } from '../lib/utils.js';
export const osInfo = (arg) => {
  //   os --EOL
  // os --cpus
  // os --homedir
  // os --username
  // os --architecture
  switch (arg) {
    case '--EOL':
      fmMessage(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      console.table(os.cpus());
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
      break;
  }
};
