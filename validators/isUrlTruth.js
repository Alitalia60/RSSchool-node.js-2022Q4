import { stat } from 'node:fs/promises';
export async function isUrlTruth(pathUrl, type = 'file') {
  if (!pathUrl) {
    return false;
  }
  try {
    const stats = await stat(pathUrl);
    return (
      (stats.isDirectory() && type === 'dir') ||
      (!stats.isDirectory() && type === 'file')
    );
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
  }
}
