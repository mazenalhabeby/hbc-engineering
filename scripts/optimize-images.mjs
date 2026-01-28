import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const IMAGES_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 85;

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  const files = await readdir(IMAGES_DIR);
  const imageFiles = files.filter(f =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
  );

  let totalSaved = 0;

  for (const file of imageFiles) {
    const filePath = join(IMAGES_DIR, file);
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Skip small files (under 500KB)
    if (originalSize < 500 * 1024) {
      console.log(`⏭️  Skipping ${file} (already small: ${(originalSize / 1024).toFixed(0)}KB)`);
      continue;
    }

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Resize if wider than MAX_WIDTH
      let pipeline = image;
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      // Optimize based on format
      const ext = extname(file).toLowerCase();
      let buffer;

      if (ext === '.png') {
        buffer = await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
      } else {
        buffer = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
      }

      // Only save if smaller
      if (buffer.length < originalSize) {
        await sharp(buffer).toFile(filePath);
        const saved = originalSize - buffer.length;
        totalSaved += saved;
        console.log(`✅ ${file}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(buffer.length / 1024 / 1024).toFixed(1)}MB (saved ${(saved / 1024 / 1024).toFixed(1)}MB)`);
      } else {
        console.log(`⏭️  ${file}: Already optimized`);
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`);
}

optimizeImages().catch(console.error);
