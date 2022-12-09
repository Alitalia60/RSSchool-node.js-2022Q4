import fs from 'node:fs/promises';
import { join } from 'node:path';

import { fmSettings } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/utils.js';

//*****************************************
export const cat = async (pathToDir) => {};

//*****************************************
export const add = (newFileName) => {
  console.log('not implemented');
};

//*****************************************
export const rn = (pathToFile, newFileName) => {
  console.log('not implemented');
};

//*****************************************
export const cp = async (arrArgs) => {
  const [pathToFile, pathToNewDir] = arrArgs;
  return await fs
    .copyFile(
      join(fmSettings.currentDir, pathToFile),
      join(fmSettings.currentDir, pathToNewDir)
    )
    .cath((err) => fmMessage(err));
};

//*****************************************
export const mv = (pathToFile, pathToNewDir) => {
  console.log('not implemented');
};

//*****************************************
export const remove = (pathToFile) => {
  console.log('not implemented');
};
