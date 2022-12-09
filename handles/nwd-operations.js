import fs from 'node:fs/promises';
import path from 'node:path';
import { fmSettings } from '../fm.js';
import { fmMessage } from '../lib/utils.js';
import { fmMessagesList } from '../lib/constants.js';

export const upDir = () => {
  try {
    fmSettings.currentDir = path.resolve(fmSettings.currentDir, '..');
  } catch (error) {
    fmMessage(fmMessagesList.invalid);
  }
};
export const changeDir = async (pathToDir) => {
  try {
    const desiredPath = path.resolve(fmSettings.currentDir, pathToDir);
    const stats = await fs.stat(desiredPath);
    if (stats.isDirectory()) fmSettings.currentDir = desiredPath;
  } catch (error) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(error.message);
  }
};
export const ls = async (pathToDir) => {
  try {
    if (!pathToDir) {
      pathToDir = fmSettings.currentDir;
    }
    const files = await fs.readdir(pathToDir);
    //TODO  - not completed
    console.table(files);
  } catch (error) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(error.code);
  }
};
