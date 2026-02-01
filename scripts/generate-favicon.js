const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG template for the favicon with "em" initials
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0068ff"/>
  <text
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-weight="700"
    font-size="${size * 0.45}"
    fill="#ffffff"
    letter-spacing="${size * -0.02}">em</text>
</svg>
`;

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');

  console.log('Generating favicons...');

  // Generate 192x192 icon
  await sharp(Buffer.from(createSVG(192)))
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));
  console.log('✓ Generated icon-192x192.png');

  // Generate 512x512 icon
  await sharp(Buffer.from(createSVG(512)))
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
  console.log('✓ Generated icon-512x512.png');

  // Generate Apple touch icon (180x180)
  await sharp(Buffer.from(createSVG(180)))
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // Generate favicon.ico (32x32)
  await sharp(Buffer.from(createSVG(32)))
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated favicon-32x32.png');

  // Generate 16x16 favicon
  await sharp(Buffer.from(createSVG(16)))
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ Generated favicon-16x16.png');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
