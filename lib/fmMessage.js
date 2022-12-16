import { fmMessagesList, fmColors } from './constants.js';
import { fmSettings } from '../fm.js';

/********************************************************
 *Read file and print it's content in console (should be done using Readable stream):
 * @function fmMessage
 * @param {string} msg - main message to show
 * @param {string} opt - optional additional text
 *  */
export const fmMessage = async (msg, opt = '') => {
  switch (msg) {
    case fmMessagesList.greeting:
      console.clear();
      console.log('--------------------------------------------------------');
      console.log(
        `${fmMessagesList.greeting} ${fmColors.FgGreen}${fmSettings.currentUser}${fmColors.Reset}${opt}`
      );
      console.log();
      break;

    case fmMessagesList.goodbye:
      console.log(
        `${fmMessagesList.goodbye} ${fmColors.FgGreen}${fmSettings.currentUser}${fmColors.Reset}${opt}, goodbye!`
      );
      break;

    case fmMessagesList.invalid:
      console.log(
        `${fmColors.FgRed}${fmMessagesList.invalid}${fmColors.Reset}${opt}`
      );
      break;

    case fmMessagesList.failed:
      console.log(
        `${fmColors.FgRed}${fmMessagesList.failed}${fmColors.Reset}${opt}`
      );
      break;

    case fmMessagesList.homeFolder:
      console.log(
        `${fmColors.FgBlue}${fmMessagesList.homeFolder}${fmColors.FgGreen} ${fmSettings.currentDir}${fmColors.Reset}${opt}`
      );
      break;

    default:
      console.log(`  ${fmColors.FgBlue}${msg}${fmColors.Reset}${opt}`);
      break;
  }
};
