import { resolve } from 'path';
import { promisify } from 'util';
import { readFile, writeFile } from 'fs';

const sourcePackageJsonPath = resolve(__dirname, '../package.json');
const distPackageJsonPath = resolve(__dirname, '../dist/package.json');
const readAttributes = [
  'name',
  'version',
  'description',
  'keywords',
  'homepage',
  'repository',
  'bugs',
  'license',
  'author',
  'contributors',
  'dependencies',
  'peerDependencies',
];
const moduleSources = {
  main: './index.js',
  module: './index.module.js',
  typings: './index.d.ts',
};

const bundlePackageJson = async () => {
  const packageJson = JSON.parse(
    await promisify(readFile)(sourcePackageJsonPath, 'utf-8'),
  );

  const filtered = readAttributes.reduce((acc, attribute) => {
    const value = packageJson[attribute];

    if (value) acc[attribute] = value;

    return acc;
  }, {} as { [key: string]: unknown });

  return promisify(writeFile)(
    distPackageJsonPath,
    JSON.stringify({ ...filtered, ...moduleSources }, null, 2),
    'utf-8',
  );
};

bundlePackageJson();
