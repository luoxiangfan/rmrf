import { unlinkSync, existsSync, readdirSync, lstatSync, rmdirSync } from 'fs';
import { resolve } from 'path';

function checkPath(path: string) {
  try {
    const stats = lstatSync(path);
    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'dir';
    }
  } catch {
    return 'error';
  }
}

function rmfile(path: string) {
  try {
    unlinkSync(path);
  } catch {
    console.error(`Unable to delete file: '${path}'`);
  }
}

function rmdir(path: string) {
  if (existsSync(path)) {
    readdirSync(path).forEach((file: string) => {
      const curPath = resolve(path, file);
      if (checkPath(curPath) === 'dir') {
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
  if (checkPath(resolvedPath) === 'dir') {
    rmdir(path);
  } else {
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
