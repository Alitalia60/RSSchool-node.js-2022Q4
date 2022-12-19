import { stat } from 'node:fs/promises';

/********************************************************
 * Boolean: check if passed path is File
 * @function isFileUrlTruth
 * @param {string} pathUrl
 *  */
export async function isFileUrlTruth(pathUrl) {
  if (!pathUrl) {
    return false;
  }
  try {
    const stats = await stat(pathUrl);
    return !stats.isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
  }
}

/********************************************************
 * Boolean: check if passed path is Directory
 * @function isDirUrlTruth
 * @param {string} pathUrl
 *  */
export async function isDirUrlTruth(pathUrl) {
  if (!pathUrl) {
    return false;
  }
  try {
    const stats = await stat(pathUrl);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
  }
}
