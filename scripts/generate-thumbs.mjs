import { readdirSync, mkdirSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'public', 'images');
const thumbsDir = path.join(imagesDir, 'thumbs');

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const THUMB_SIZE = 480;

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function getImageFiles(dir) {
  return readdirSync(dir).filter((name) => IMAGE_EXT.test(name));
}

async function generateThumbs() {
  ensureDir(thumbsDir);
  const files = getImageFiles(imagesDir);

  if (files.length === 0) {
    console.log('No images found in public/images.');
    return;
  }

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(thumbsDir, file);

    await sharp(inputPath)
      .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover' })
      .toFile(outputPath);
  }

  console.log(`Generated ${files.length} thumbnails in public/images/thumbs`);
}

generateThumbs().catch((err) => {
  console.error('Failed to generate thumbnails:', err);
  process.exit(1);
});

