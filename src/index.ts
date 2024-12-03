import { unlinkSync, existsSync, readdirSync, lstatSync, rmdirSync } from 'fs';
import { resolve, sep } from 'path';

function checkPath(path: string) {
  try {
    const stats = lstatSync(path);
    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'dir';
    }
  } catch (err) {
    console.error(err);
    return 'error';
  }
}

function rmfile(path: string) {
  try {
    unlinkSync(path);
  } catch (err) {
    console.error(`Unable to delete file: '${path}'`);
    console.error(err);
  }
}

function rmdir(path: string) {
  if (existsSync(path)) {
    readdirSync(path).forEach((file: string) => {
      const curPath = path + sep + file;
      if (lstatSync(curPath).isDirectory()) {
        rmdir(curPath);
      } else {
        rmfile(curPath);
      }
    });
    rmdirSync(path);
  }
}

function rmfileordir(path: string) {
  const resolvedPath = resolve(path);
  if (!existsSync(resolvedPath)) {
    return;
  }
  const type = checkPath(resolvedPath);
  if (type === 'dir') {
    rmdir(path);
  } else if (type === 'file') {
    rmfile(resolvedPath);
  }
}

function rm(paths: string[]) {
  for (const key in paths) {
    rmfileordir(paths[key]);
  }
}

const rmrf = async (...paths: [...string[]]) => rm(paths);

const rmrfSync = (...paths: [...string[]]) => rm(paths);

export { rmrf, rmrfSync };
