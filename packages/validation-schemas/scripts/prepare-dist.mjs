import { access, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const esmDir = path.join(distDir, 'esm');
const cjsDir = path.join(distDir, 'cjs');
const specifierPattern =
  /((?:import|export)\s[^'"]*?\sfrom\s*|import\s*\(\s*)['"](\.[^'"]+)['"]/g;

const pathExists = async (targetPath) => {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const resolveEsmSpecifier = async (filePath, specifier) => {
  const basePath = path.resolve(path.dirname(filePath), specifier);

  if (await pathExists(`${basePath}.js`)) {
    return `${specifier}.js`;
  }

  if (await pathExists(path.join(basePath, 'index.js'))) {
    return `${specifier}/index.js`;
  }

  return specifier;
};

const rewriteEsmSpecifiers = async (filePath) => {
  const original = await readFile(filePath, 'utf8');
  const matches = [...original.matchAll(specifierPattern)];

  if (matches.length === 0) {
    return;
  }

  let updated = original;

  for (const match of matches) {
    const [full, prefix, specifier] = match;

    if (!specifier.startsWith('.')) {
      continue;
    }

    const resolvedSpecifier = await resolveEsmSpecifier(filePath, specifier);

    if (resolvedSpecifier === specifier) {
      continue;
    }

    updated = updated.replace(full, `${prefix}"${resolvedSpecifier}"`);
  }

  if (updated !== original) {
    await writeFile(filePath, updated);
  }
};

const walkEsm = async (directory) => {
  const entries = await readdir(directory);

  for (const entry of entries) {
    const filePath = path.join(directory, entry);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await walkEsm(filePath);
      continue;
    }

    if (path.extname(filePath) === '.js') {
      await rewriteEsmSpecifiers(filePath);
    }
  }
};

await walkEsm(esmDir);

await writeFile(
  path.join(esmDir, 'package.json'),
  `${JSON.stringify({ type: 'module' }, null, 2)}\n`
);

await writeFile(
  path.join(cjsDir, 'package.json'),
  `${JSON.stringify({ type: 'commonjs' }, null, 2)}\n`
);
