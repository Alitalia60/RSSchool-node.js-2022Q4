import fs from 'node:fs/promises';
import path from 'node:path';
import { fmSettings } from '../fm.js';
import { fmMessage } from '../lib/fmMessage.js';
import { fmMessagesList } from '../lib/constants.js';
import { isUrlTruth } from '../validators/isUrlTruth.js';

/********************************************************
 * Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
 * @function upDir
 */
export const upDir = async () => {
  try {
    return await new Promise((res) => {
      fmSettings.currentDir = path.resolve(fmSettings.currentDir, '..');
      res();
    });
  } catch (error) {
    fmMessage(fmMessagesList.failed);
  }
};

/********************************************************
 * Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
 * @function changeDir
 * @param {string} pathToDir - destination directory path
 */
export const changeDir = async (pathToDir) => {
  try {
    const desiredPath = path.resolve(fmSettings.currentDir, pathToDir);
    const stats = await fs.stat(desiredPath);
    if (stats.isDirectory()) fmSettings.currentDir = desiredPath;
  } catch (error) {
    fmMessage(fmMessagesList.failed);
    fmMessage(error.message);
  } finally {
    return;
  }
};

/********************************************************
 * Print in console list of all files and folders in current directory. List should contain:
 * @function ls
 * @param {string} [pathToDir] - destination directory path, if passed, else fmSettings.currentDir
 *
 */
export const ls = async (pathToDir) => {
  let dirURL = pathToDir;
  if (!dirURL) {
    dirURL = fmSettings.currentDir;
  } else {
    dirURL = path.resolve(fmSettings.currentDir, pathToDir);
  }
  if (!(await isUrlTruth(dirURL, 'dir'))) {
    fmMessage(fmMessagesList.failed);
    fmMessage('ENOENT. Path not exist');
    return;
  }

  try {
    let files = await fs.readdir(dirURL, { withFileTypes: true });
    files = files.map((item) => {
      return {
        Name: item.name,
        Type: item.isFile() ? 'file' : 'directory',
      };
    });
    files.sort((a, b) => {
      return a.Name < b.Name ? 1 : -1;
    });
    files.sort((a, b) => {
      return a.Type > b.Type ? 1 : -1;
    });
    console.table(files);
  } catch (error) {
    fmMessage(fmMessagesList.failed);
    fmMessage('try error', error.code);
  }
};
