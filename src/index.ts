import {
  statSync,
  rmSync,
  existsSync,
  readdirSync,
  lstatSync,
  rmdirSync
} from 'fs';
import { resolve } from 'path';

function checkPath(path: string) {
  try {
    const stats = statSync(path);
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
    rmSync(path);
  } catch (err) {
    console.error(`Unable to delete file: '${path}'`);
    console.error(err);
  }
}

function rmdir(path: string) {
  if (existsSync(path)) {
    readdirSync(path).forEach((file: string) => {
      const curPath = path + '/' + file;
      if (lstatSync(curPath).isDirectory()) {
        rmdir(curPath);
      } else {
        rmfile(curPath);
      }
    });
    rmdirSync(path);
  }
}

function rmfileordir(filePath: string) {
  const resolvedPath = resolve(filePath);
  if (!existsSync(resolvedPath)) {
    console.error('not exist');
    return;
  }
  const type = checkPath(resolvedPath);
  if (type === 'dir') {
    rmdir(filePath);
  } else if (type === 'file') {
    rmfile(resolvedPath);
  }
}

function rm(...args: [...string[]]) {
  if (args.length) {
    args.forEach((path) => {
      rmfileordir(path);
    });
  }
}

const rmrf = async (...args: [...string[]]) => rm(...args);

const rmrfSync = (...args: [...string[]]) => rm(...args);

export { rmrf, rmrfSync };
