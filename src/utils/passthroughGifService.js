// src/utils/passthroughGifService.js
import { passthroughImageService } from 'astro/assets';

// This service does NO processing. Files are copied as-is.
export default passthroughImageService();