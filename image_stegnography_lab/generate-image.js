// generate-image.js
// Injects an EXIF "Artist" (Author) tag into base_image.jpg,
// producing public/challenge.jpg with the flag hidden in metadata.
const fs = require('fs');
const path = require('path');

const FLAG = require('./flag'); // hidden in the Author metadata field

const BASE_IMAGE = path.join(__dirname, 'base_image.jpg');
const OUT_IMAGE = path.join(__dirname, 'public', 'challenge.jpg');

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
function u16le(n) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n, 0);
  return b;
}

// Build a complete TIFF header + IFD with a single Artist tag
// whose value lives just after the IFD.
function buildExifSegment(authorString) {
  const authorBytes = Buffer.from(authorString + '\0', 'ascii'); // null-terminated

  // TIFF header (8 bytes) - little-endian
  const tiffHeader = Buffer.from([
    0x49, 0x49,       // "II" = little-endian
    0x2A, 0x00,       // magic 42
    0x08, 0x00, 0x00, 0x00 // offset to first IFD = 8
  ]);

  // IFD: 2-byte count + N*12 entries + 4-byte next-IFD offset
  const numEntries = 1;
  const ifdSize = 2 + numEntries * 12 + 4;
  const ifdOffset = 8;                 // right after TIFF header
  const stringDataOffset = ifdOffset + ifdSize; // place string after IFD

  const countBuf = u16le(numEntries);

  // Artist tag = 0x013B, type 2 (ASCII), count = authorBytes.length
  const entry = Buffer.alloc(12);
  entry.writeUInt16LE(0x013B, 0);       // tag
  entry.writeUInt16LE(2, 2);            // ASCII
  entry.writeUInt32LE(authorBytes.length, 4);
  entry.writeUInt32LE(stringDataOffset, 8); // offset to value

  const nextIfd = Buffer.alloc(4); // zero → no more IFDs

  // APP1 payload = "Exif\0\0" + TIFF block
  const exifId = Buffer.from('Exif\0\0', 'ascii');
  const tiffBlock = Buffer.concat([tiffHeader, countBuf, entry, nextIfd, authorBytes]);
  const app1Payload = Buffer.concat([exifId, tiffBlock]);

  // APP1 marker (FFE1) + 2-byte length (includes length bytes, not marker)
  const length = app1Payload.length + 2;
  if (length > 0xFFFF) throw new Error('EXIF segment too large');

  const lenBuf = Buffer.alloc(2);
  lenBuf.writeUInt16BE(length, 0);

  return Buffer.concat([
    Buffer.from([0xFF, 0xE1]),
    lenBuf,
    app1Payload
  ]);
}

// ------------------------------------------------------------------
// Inject APP1 EXIF right after SOI (FFD8) of the real photo
// ------------------------------------------------------------------
if (!fs.existsSync(BASE_IMAGE)) {
  console.error(`❌ Base image not found: ${BASE_IMAGE}`);
  process.exit(1);
}

const base = fs.readFileSync(BASE_IMAGE);

// Sanity check: must be a JPEG
if (base[0] !== 0xFF || base[1] !== 0xD8) {
  console.error('❌ base_image.jpg is not a JPEG (missing SOI marker)');
  process.exit(1);
}

// Strip any pre-existing APP1/EXIF segment so we don't stack duplicates
let rest = base.slice(2);
if (rest[0] === 0xFF && rest[1] === 0xE1) {
  const segLen = (rest[2] << 8) | rest[3];
  rest = rest.slice(2 + segLen);
  console.log('ℹ️  Stripped existing APP1/EXIF segment');
}

const soi = base.slice(0, 2);
const app1 = buildExifSegment(FLAG);
const finalJpeg = Buffer.concat([soi, app1, rest]);

const outDir = path.dirname(OUT_IMAGE);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(OUT_IMAGE, finalJpeg);

console.log(`✅ Wrote ${OUT_IMAGE} (${finalJpeg.length} bytes)`);
console.log(`🔍 Hidden author metadata: ${FLAG}`);
console.log(`💡 Verify with: exiftool "${OUT_IMAGE}"`);
