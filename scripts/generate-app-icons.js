const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Utility script to generate PWA Home Screen icons and favicons
 * from a single high-resolution source image.
 * 
 * Usage:
 * Place your custom logo at `public/kgroup-logo.jpg` (or `public/kgroup-logo.png`)
 * and run: `node scripts/generate-app-icons.js`
 */

async function generateAppIcons() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Find source image in public/ or src/assets/images/
  let sourceImagePath = path.join(publicDir, 'kgroup-logo.jpg');
  if (!fs.existsSync(sourceImagePath)) {
    sourceImagePath = path.join(publicDir, 'kgroup-logo.png');
  }
  if (!fs.existsSync(sourceImagePath)) {
    sourceImagePath = path.join(rootDir, 'src', 'assets', 'images', 'kanchan_group_logo.jpg');
  }

  if (!fs.existsSync(sourceImagePath)) {
    console.error('Error: Source logo image not found!');
    process.exit(1);
  }

  console.log(`Generating PWA icons from: ${sourceImagePath}`);

  // 192x192 PNG (Android & Chrome PWA)
  await sharp(sourceImagePath)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✔ Created /public/pwa-192x192.png');

  // 512x512 PNG (Android High-Res & Splash Screen)
  await sharp(sourceImagePath)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✔ Created /public/pwa-512x512.png');

  // 180x180 PNG (Apple iOS Touch Icon)
  await sharp(sourceImagePath)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✔ Created /public/apple-touch-icon.png');

  // 32x32 Favicon PNG
  await sharp(sourceImagePath)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✔ Created /public/favicon-32x32.png');

  // 16x16 Favicon PNG
  await sharp(sourceImagePath)
    .resize(16, 16, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✔ Created /public/favicon-16x16.png');

  // Favicon ICO
  await sharp(sourceImagePath)
    .resize(32, 32, { fit: 'cover' })
    .toFormat('png')
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✔ Created /public/favicon.ico');

  console.log('All PWA Home Screen icons successfully generated!');
}

generateAppIcons().catch(err => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
