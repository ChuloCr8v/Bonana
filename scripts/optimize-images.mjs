import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 82;

const DIRECTORIES = [
  'public/qikbot',
  'public/ossyard',
  'public/qikcv',
  'public/qikenv',
  'public/qikagenda',
  'src/assets/images',
];

const INDIVIDUAL_FILES = [
  'public/cover.png',
  'public/logo-dark.png',
  'public/logo-light.png',
  'public/logo.png',
];

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const originalSize = fs.statSync(filePath).size;
  const image = sharp(filePath);
  const metadata = await image.metadata();

  const resizeOptions = {
    width: metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined,
    withoutEnlargement: true,
  };

  // 1. Generate WebP version alongside
  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  await sharp(filePath)
    .resize(resizeOptions.width, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toFile(webpPath + '.tmp');
  
  fs.renameSync(webpPath + '.tmp', webpPath);
  const webpSize = fs.statSync(webpPath).size;

  // 2. Also optimize the original format in-place for lightweight fallback
  if (ext === '.png') {
    // For large screenshots, re-compress PNG at max width 1920
    const tmpPng = filePath + '.tmp.png';
    await sharp(filePath)
      .resize(resizeOptions.width, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 7 })
      .toFile(tmpPng);
    
    const newPngSize = fs.statSync(tmpPng).size;
    if (newPngSize < originalSize) {
      fs.renameSync(tmpPng, filePath);
    } else {
      fs.unlinkSync(tmpPng);
    }
  } else if (ext === '.jpg' || ext === '.jpeg') {
    const tmpJpg = filePath + '.tmp.jpg';
    await sharp(filePath)
      .resize(resizeOptions.width, null, { withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(tmpJpg);
    
    const newJpgSize = fs.statSync(tmpJpg).size;
    if (newJpgSize < originalSize) {
      fs.renameSync(tmpJpg, filePath);
    } else {
      fs.unlinkSync(tmpJpg);
    }
  }

  const finalOrigSize = fs.statSync(filePath).size;
  console.log(
    `✓ ${filePath.padEnd(52)} Orig: ${formatSize(originalSize).padStart(9)} -> WebP: ${formatSize(webpSize).padStart(8)} | Fallback: ${formatSize(finalOrigSize).padStart(8)}`
  );

  return {
    path: filePath,
    originalSize,
    webpSize,
    finalOrigSize,
  };
}

async function main() {
  console.log('🚀 Optimizing project images to lightweight KB sizes (WebP & optimized fallbacks)...\n');

  const filesToProcess = [];

  for (const dir of DIRECTORIES) {
    if (fs.existsSync(dir)) {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isFile() && /\.(png|jpg|jpeg)$/i.test(entry)) {
          filesToProcess.push(fullPath);
        }
      }
    }
  }

  for (const file of INDIVIDUAL_FILES) {
    if (fs.existsSync(file)) {
      filesToProcess.push(file);
    }
  }

  let totalOriginal = 0;
  let totalWebp = 0;
  let totalOptimizedOrig = 0;

  for (const file of filesToProcess) {
    const res = await processImage(file);
    if (res) {
      totalOriginal += res.originalSize;
      totalWebp += res.webpSize;
      totalOptimizedOrig += res.finalOrigSize;
    }
  }

  console.log('\n------------------------------------------------------------');
  console.log(`Total Initial Size:      ${formatSize(totalOriginal)}`);
  console.log(`Total WebP Size:         ${formatSize(totalWebp)} (${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}% reduction)`);
  console.log(`Total Optimized Fallback: ${formatSize(totalOptimizedOrig)} (${((1 - totalOptimizedOrig / totalOriginal) * 100).toFixed(1)}% reduction)`);
  console.log('------------------------------------------------------------\n');
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
