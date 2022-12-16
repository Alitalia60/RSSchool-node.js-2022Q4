import { stat } from 'node:fs/promises';
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
