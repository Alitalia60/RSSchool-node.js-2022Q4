import { fmSettings } from '../fm.js';
import { fmMessagesList } from './constants.js';

const color = {
  Reset: '\x1b[0m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgRed: '\x1b[41m',
};

export function initSettings() {
  if (process.argv[2]) {
    if (process.argv[2].includes('--username=')) {
      // fmOptions.currentUser = process.argv[2].replace('--username=', '');
      fmSettings.currentUser = process.argv[2].replace('--username=', '');
    } else {
      fmMessage(`Argument "--username=" required`);
      process.exit(1);
    }
  } else {
    fmMessage(`Argument "--username=" required`);
    process.exit(1);
  }
  fmSettings.currentDir = process.env.HOME || __dirname;
}

export const fmMessage = async (msg) => {
  switch (msg) {
    case fmMessagesList.greeting:
      console.clear();
      console.log('--------------------------------------------------------');
      console.log(
        `${fmMessagesList.greeting} ${color.FgGreen}${fmSettings.currentUser}${color.Reset}`
      );
      console.log();
      break;

    case fmMessagesList.goodbye:
      console.log(
        `${fmMessagesList.goodbye} ${color.FgGreen}${fmSettings.currentUser}${color.Reset}, goodbye!`
      );
      break;

    case fmMessagesList.invalid:
      console.log(`${color.FgRed}${fmMessagesList.invalid}${color.Reset}`);
      break;

    case fmMessagesList.failed:
      console.log(`${color.FgRed}${fmMessagesList.failed}${color.Reset}`);
      break;

    case fmMessagesList.homeFolder:
      console.log(
        `${color.FgBlue}${fmMessagesList.homeFolder}${color.FgGreen} ${fmSettings.currentDir}${color.Reset}`
      );
      break;

    default:
      console.log(`${color.FgBlue}${msg}${color.Reset}`);
      break;
  }
  // resolve();
  // .exit});
};
