// src/utils/customImageService.js
import sharp from 'sharp';
import { baseService } from 'astro/assets';

const sharpService = {
  ...baseService,
  async transform(inputBuffer, transformOptions) {
    // Check if it's a GIF
    const isGif = transformOptions.src?.endsWith('.gif') || 
                  transformOptions.format === 'gif';
    
    if (isGif) {
      // For GIFs, process as animated WebP
      return sharp(inputBuffer, { animated: true })
        .toFormat('webp', { 
          quality: 80,
          loop: 0,
          delay: 100 
        })
        .toBuffer();
    }
    
    // For other images, use normal Sharp processing
    return sharp(inputBuffer)
      .resize(transformOptions.width, transformOptions.height, {
        fit: transformOptions.fit || 'cover'
      })
      .toBuffer();
  }
};

export default sharpService;