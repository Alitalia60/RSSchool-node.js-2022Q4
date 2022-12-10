import fs from 'node:fs/promises';
import path from 'node:path';
import { fmSettings } from '../fm.js';
import { fmMessage } from '../lib/utils.js';
import { fmMessagesList } from '../lib/constants.js';
import { isUrlTruth } from '../validators/isUrlTruth.js';

/**************************************
 */

export const upDir = () => {
  try {
    fmSettings.currentDir = path.resolve(fmSettings.currentDir, '..');
  } catch (error) {
    fmMessage(fmMessagesList.failed);
  }
};

/**************************************
func changeDir
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

/**************************************
 */
export const ls = async (pathToDir) => {
  let dirURL = pathToDir;
  if (!dirURL) {
    dirURL = fmSettings.currentDir;
  } else {
    dirURL = path.resolve(fmSettings.currentDir, pathToDir);
  }
  if (!(await isUrlTruth(dirURL))) {
    fmMessage(fmMessagesList.failed);
    fmMessage('ENOENT. Path not exist');
    return;
  }

  try {
    const files = await fs.readdir(dirURL);
    const filesDetailed = await getDetailedFiles(dirURL, files);
    console.table(filesDetailed);
  } catch (error) {
    fmMessage(fmMessagesList.failed);
    fmMessage('try error', error.code);
  }
};

/**************************************
 */
async function getDetailedFiles(dirURL, arrayOfNames) {
  let arr = [];
  for (const file of arrayOfNames) {
    let stats = await fs.stat(path.join(dirURL, file));
    arr.push({
      Name: file,
      Type: stats.isDirectory() ? 'directory' : 'file',
    });
  }
  return arr;
}
