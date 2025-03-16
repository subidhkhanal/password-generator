import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const ICON_SIZES = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];

async function generateSvgIcon(size) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1f2937" />
          <stop offset="100%" style="stop-color:#374151" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="${size * 0.05}" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="${size}" height="${size}" rx="${
    size * 0.2
  }" fill="url(#gradient)" />
      
      <!-- Lock body shadow -->
      <rect 
        x="${size * 0.25}" 
        y="${size * 0.4}" 
        width="${size * 0.5}" 
        height="${size * 0.4}" 
        rx="${size * 0.05}"
        fill="rgba(0,0,0,0.3)"
        filter="url(#shadow)"
      />
      
      <!-- Lock shackle shadow -->
      <path 
        d="M ${size * 0.35} ${size * 0.4} C ${size * 0.35} ${size * 0.25} ${
    size * 0.35
  } ${size * 0.2} ${size * 0.5} ${size * 0.2} C ${size * 0.65} ${size * 0.2} ${
    size * 0.65
  } ${size * 0.25} ${size * 0.65} ${size * 0.4}"
        stroke="rgba(0,0,0,0.3)"
        stroke-width="${size * 0.1}"
        fill="none"
        filter="url(#shadow)"
      />
      
      <!-- Lock body -->
      <rect 
        x="${size * 0.25}" 
        y="${size * 0.4}" 
        width="${size * 0.5}" 
        height="${size * 0.4}" 
        rx="${size * 0.05}"
        fill="#FFD700"
      />
      
      <!-- Lock shackle -->
      <path 
        d="M ${size * 0.35} ${size * 0.4} C ${size * 0.35} ${size * 0.25} ${
    size * 0.35
  } ${size * 0.2} ${size * 0.5} ${size * 0.2} C ${size * 0.65} ${size * 0.2} ${
    size * 0.65
  } ${size * 0.25} ${size * 0.65} ${size * 0.4}"
        stroke="#FFD700"
        stroke-width="${size * 0.1}"
        fill="none"
        stroke-linecap="round"
      />
      
      <!-- Keyhole -->
      <circle 
        cx="${size * 0.5}" 
        cy="${size * 0.55}" 
        r="${size * 0.06}" 
        fill="#1f2937"
      />
      <rect 
        x="${size * 0.47}" 
        y="${size * 0.61}" 
        width="${size * 0.06}" 
        height="${size * 0.12}" 
        fill="#1f2937"
      />
    </svg>
  `);
}

async function generateOgSvg() {
  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1f2937" />
          <stop offset="100%" style="stop-color:#374151" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#gradient)" />
      
      <!-- Lock Icon -->
      <g transform="translate(460, 180) scale(0.8)">
        <!-- Lock body shadow -->
        <rect x="100" y="160" width="200" height="160" rx="20" fill="rgba(0,0,0,0.3)" filter="url(#shadow)" />
        
        <!-- Lock shackle shadow -->
        <path d="M 140 160 C 140 100 140 80 200 80 C 260 80 260 100 260 160" 
              stroke="rgba(0,0,0,0.3)" stroke-width="40" fill="none" filter="url(#shadow)" />
        
        <!-- Lock body -->
        <rect x="100" y="160" width="200" height="160" rx="20" fill="#FFD700" />
        
        <!-- Lock shackle -->
        <path d="M 140 160 C 140 100 140 80 200 80 C 260 80 260 100 260 160" 
              stroke="#FFD700" stroke-width="40" fill="none" stroke-linecap="round" />
        
        <!-- Keyhole -->
        <circle cx="200" cy="220" r="24" fill="#1f2937" />
        <rect x="188" y="244" width="24" height="48" fill="#1f2937" />
      </g>
      
      <!-- Text -->
      <text x="600" y="450" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
        Modern Password Generator
      </text>
      <text x="600" y="520" font-family="Arial" font-size="36" fill="#9CA3AF" text-anchor="middle">
        Create Strong, Secure Passwords Instantly
      </text>
    </svg>
  `);
}

async function generateIcons() {
  try {
    // Ensure public directory exists
    await fs.mkdir(PUBLIC_DIR, { recursive: true });

    // Generate different sizes
    for (const size of ICON_SIZES) {
      const svg = await generateSvgIcon(size);
      await sharp(svg).toFile(
        path.join(PUBLIC_DIR, `icon-${size}x${size}.png`)
      );
      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate favicon.ico
    const faviconSvg = await generateSvgIcon(32);
    await sharp(faviconSvg).toFile(path.join(PUBLIC_DIR, "favicon.ico"));
    console.log("Generated favicon.ico");

    // Generate apple-touch-icon
    const appleTouchSvg = await generateSvgIcon(180);
    await sharp(appleTouchSvg).toFile(
      path.join(PUBLIC_DIR, "apple-touch-icon.png")
    );
    console.log("Generated apple-touch-icon.png");

    // Generate OG image
    const ogSvg = await generateOgSvg();
    await sharp(ogSvg).toFile(path.join(PUBLIC_DIR, "og-image.png"));
    console.log("Generated og-image.png");
    await sharp(ogSvg).toFile(path.join(PUBLIC_DIR, "twitter-image.png"));
    console.log("Generated twitter-image.png");

    console.log("All icons generated successfully!");
  } catch (error) {
    console.error("Error generating icons:", error);
    process.exit(1);
  }
}

generateIcons();
