import { homedir } from 'node:os';
import { fmSettings } from '../fm.js';
import { fmMessagesList } from './constants.js';
import { fmMessage } from './fmMessage.js';

/********************************************************
 *set initial properties, such as username and current dir of operations
 * @function initSettings
 *  */
export function initSettings() {
  if (process.argv[2]) {
    if (process.argv[2].startsWith('--username=')) {
      fmSettings.currentUser = process.argv[2].replace('--username=', '');
    } else {
      fmMessage(fmMessagesList.failed);
      fmMessage(`Argument "--username=" required`);
      process.exit(1);
    }
  } else {
    fmMessage(fmMessagesList.failed);
    fmMessage(`Argument "--username=" required`);
    process.exit(1);
  }
  if (!fmSettings.currentUser) {
    fmSettings.currentUser = 'Guest';
  }
  fmSettings.currentDir = homedir() || process.env.HOME;
}
