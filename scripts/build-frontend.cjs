const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_FRONTEND = path.join(ROOT, 'frontend');
const TARGET_ROOT = path.join(ROOT, 'backend', 'frontend');
const DIST_DIR = path.join(TARGET_ROOT, 'dist');
const IMAGES_SOURCE = path.join(SOURCE_FRONTEND, 'Images');
const IMAGES_TARGET = path.join(TARGET_ROOT, 'Images');

function copyTree(src, dest) {
    if (!fs.existsSync(src)) {
        return;
    }
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const entry of fs.readdirSync(src)) {
            copyTree(path.join(src, entry), path.join(dest, entry));
        }
    } else if (stats.isFile()) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
    }
}

function ensureClean(dir) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
}

function buildFrontend() {
    if (!fs.existsSync(SOURCE_FRONTEND)) {
        console.warn('[build-frontend] source directory missing at', SOURCE_FRONTEND);
        return;
    }

    fs.mkdirSync(TARGET_ROOT, { recursive: true });
    ensureClean(DIST_DIR);
    ensureClean(IMAGES_TARGET);

    const staticFiles = ['index.html', 'Logo.svg'];
    for (const fileName of staticFiles) {
        const src = path.join(SOURCE_FRONTEND, fileName);
        if (fs.existsSync(src)) {
            copyTree(src, path.join(DIST_DIR, fileName));
        }
    }

    const staticDirs = ['lib', 'data'];
    for (const dirName of staticDirs) {
        copyTree(path.join(SOURCE_FRONTEND, dirName), path.join(DIST_DIR, dirName));
    }

    copyTree(IMAGES_SOURCE, IMAGES_TARGET);

    console.log('[build-frontend] copied assets to', DIST_DIR);
}

buildFrontend();
