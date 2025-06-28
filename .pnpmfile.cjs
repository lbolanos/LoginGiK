function readPackage(pkg) {
  if (pkg.name === 'sqlite3') {
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.install = 'node-pre-gyp install --fallback-to-build';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};