import { fmSettings } from '../fm.js';
import { fmMessagesList } from './constants.js';
import { fmMessage } from './fmMessage.js';

/********************************************************
 *set Username
 * @function setUserName
 *  */
export function setUserName() {
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
}
