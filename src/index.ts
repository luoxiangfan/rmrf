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
    return false;
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
  const _path = resolve(path);
  if (existsSync(_path)) {
    if (checkPath(_path) === 'dir') {
      rmdir(path);
    } else {
      rmfile(_path);
    }
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
