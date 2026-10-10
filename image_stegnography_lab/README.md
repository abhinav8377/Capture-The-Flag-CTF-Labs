# 🖼️ Image Steganography Lab

## Overview

This CTF lab introduces the concept of steganography through image metadata analysis. Learn how digital images store more than just pixels and discover hidden information in file metadata.

## Vulnerability Type

**Information Disclosure through Metadata**

Many files contain metadata (data about data) that can reveal sensitive information about the file's origin, author, location, and more.

## Learning Objectives

- Understand image file structure and metadata
- Learn to use forensic tools like exiftool
- Explore EXIF data extraction techniques
- Understand information disclosure risks

## Challenge Details

- **Port:** 7000
- **Difficulty:** Easy
- **Objective:** Extract the hidden author name from image metadata

## Setup

```bash
npm install
npm run generate  # Generate the challenge image first!
npm start
```

Access the lab at: http://localhost:7000

## Getting Started

1. View the challenge image on the homepage
2. Download the image for analysis
3. Examine the image metadata
4. Find the hidden author name
5. Submit the author name to get the flag

## Required Tools

### Installing exiftool

**Windows:**

1. Download from [exiftool.org](https://exiftool.org/)
2. Extract and rename `exiftool(-k).exe` to `exiftool.exe`
3. Add to PATH or use from the directory

**macOS:**

```bash
brew install exiftool
```

**Linux:**

```bash
sudo apt-get install exiftool
# or
sudo yum install perl-Image-ExifTool
```

## Hints

<details>
<summary>Hint 1 (Click to reveal)</summary>

Download the challenge image and examine it with a metadata tool. Don't just look at it in a browser!

</details>

<details>
<summary>Hint 2 (Click to reveal)</summary>

Use exiftool to extract metadata:

```bash
exiftool challenge.jpg
```

</details>

<details>
<summary>Hint 3 (Click to reveal)</summary>

Look for the "Author" or "Artist" field in the metadata. That's the flag!

</details>

<details>
<summary>Solution (Click to reveal)</summary>

1. Download the image from http://localhost:7000/download
2. Run: `exiftool challenge.jpg`
3. Find the "Author" field in the output
4. Submit the author name on the website to verify

The flag is the author name found in the metadata.

</details>

## Exploitation Techniques

### Method 1: Using exiftool (Recommended)

```bash
# View all metadata
exiftool challenge.jpg

# View specific field
exiftool -Author challenge.jpg

# Output to text file
exiftool challenge.jpg > metadata.txt
```

### Method 2: Using online tools

- [Exif.tools](https://exif.tools/)
- [Jeffrey's Image Metadata Viewer](http://exif.regex.info/exif.cgi)
- [Metadata2Go](https://www.metadata2go.com/)

### Method 3: Using Python

```python
from PIL import Image
from PIL.ExifTags import TAGS

def extract_metadata(image_path):
    image = Image.open(image_path)
    exifdata = image.getexif()

    for tag_id in exifdata:
        tag = TAGS.get(tag_id, tag_id)
        data = exifdata.get(tag_id)
        print(f"{tag}: {data}")

extract_metadata('challenge.jpg')
```

### Method 4: Using Windows File Properties

1. Right-click the image file
2. Select "Properties"
3. Go to the "Details" tab
4. Look for "Author" under "Description" section

## Metadata Fields

Common EXIF fields that may contain sensitive information:

| Field         | Description                             | Risk                  |
| ------------- | --------------------------------------- | --------------------- |
| Author/Artist | Creator of the image                    | Identity disclosure   |
| Copyright     | Copyright information                   | Owner information     |
| GPS Location  | Exact coordinates where photo was taken | Location tracking     |
| Camera Model  | Device used to capture                  | Device fingerprinting |
| Software      | Editing software used                   | Tool identification   |
| Create Date   | When file was created                   | Timeline information  |
| Modify Date   | When file was modified                  | Activity tracking     |

## Real-World Impact

Metadata disclosure has led to:

- Location tracking of individuals
- Identity exposure of anonymous users
- Operational security failures
- Privacy violations
- Criminal investigations

**Famous Examples:**

- John McAfee location exposed through photo metadata (2012)
- ISIS fighters locations revealed through social media photos
- Journalists and activists tracked through image GPS data
- Corporate espionage through document metadata

## Prevention & Mitigation

### For Users

1. **Remove metadata before sharing**

   ```bash
   exiftool -all= image.jpg
   ```

2. **Use privacy-focused tools**
   - Use camera apps that strip metadata
   - Enable privacy mode in image editors

3. **Check before posting**
   - Always verify metadata before sharing online
   - Use metadata removal services

### For Developers

1. **Strip metadata from uploads**

   ```javascript
   // Example using Sharp (Node.js)
   const sharp = require("sharp");

   await sharp(inputPath)
     .rotate() // Removes EXIF orientation
     .withMetadata({
       exif: {}, // Remove EXIF
       icc: {}, // Remove color profile
       xmp: {}, // Remove XMP
     })
     .toFile(outputPath);
   ```

2. **Inform users about metadata**
   - Display warnings before upload
   - Offer metadata removal options

3. **Privacy by default**
   - Strip all metadata unless specifically needed
   - Document what metadata is retained

## Additional Tools

- **exiftool** - Command-line tool (most comprehensive)
- **Metadata Extractor** - Java library for metadata extraction
- **ExifPilot** - Windows GUI for EXIF editing
- **ImageMagick** - Image manipulation with metadata support
- **Photoshop** - File Info panel shows metadata
- **GIMP** - View metadata via Image → Metadata

## Code Walkthrough

The challenge generation code (`generate-image.js`):

```javascript
const { execSync } = require("child_process");

// Add metadata to image
execSync(`exiftool -Author="${FLAG}" -overwrite_original base_image.jpg`);
```

This embeds the flag as the "Author" field in the image metadata.

## Security Best Practices

1. **Always sanitize user uploads**
   - Remove all metadata from uploaded images
   - Re-encode images to strip hidden data

2. **Educate users**
   - Warn about metadata in shared files
   - Provide tools to check/remove metadata

3. **Regular audits**
   - Check what metadata your systems expose
   - Test with various forensic tools

4. **Privacy policies**
   - Clearly state what metadata is retained
   - Provide opt-out mechanisms

## References

- [EXIF Specification](https://www.exif.org/)
- [ExifTool Documentation](https://exiftool.org/)
- [OWASP - Information Leakage](https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url)
- [Metadata Working Group](http://www.metadataworkinggroup.org/)

## Fun Facts

- The first EXIF standard was published in 1995 by JEIDA (Japan Electronic Industries Development Association)
- EXIF can store up to 65,536 different tags
- GPS coordinates in images can be accurate to within 10 meters
- Many social media platforms (Facebook, Twitter) strip metadata, but not all do

---

**Happy Hacking! 🖼️**
