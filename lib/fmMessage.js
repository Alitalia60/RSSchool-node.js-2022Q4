import { fmMessagesList } from './constants.js';
import { fmSettings } from '../fm.js';

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

export const fmMessage = async (msg, opt = '') => {
  // return new Promise((resolve, reject) => {
  switch (msg) {
    case fmMessagesList.greeting:
      console.clear();
      console.log('--------------------------------------------------------');
      console.log(
        `${fmMessagesList.greeting} ${color.FgGreen}${fmSettings.currentUser}${color.Reset}${opt}`
      );
      console.log();
      break;

    case fmMessagesList.goodbye:
      console.log(
        `${fmMessagesList.goodbye} ${color.FgGreen}${fmSettings.currentUser}${color.Reset}${opt}, goodbye!`
      );
      break;

    case fmMessagesList.invalid:
      console.log(
        `${color.FgRed}${fmMessagesList.invalid}${color.Reset}${opt}`
      );
      break;

    case fmMessagesList.failed:
      console.log(`${color.FgRed}${fmMessagesList.failed}${color.Reset}${opt}`);
      break;

    case fmMessagesList.homeFolder:
      console.log(
        `${color.FgBlue}${fmMessagesList.homeFolder}${color.FgGreen} ${fmSettings.currentDir}${color.Reset}${opt}`
      );
      break;

    default:
      console.log(`  ${color.FgBlue}${msg}${color.Reset}${opt}`);
      break;
  }
};
