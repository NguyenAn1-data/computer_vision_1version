/**
 * PetVision AI - Model Manager
 * Handles TensorFlow.js MobileNet model loading and inference
 */

class ModelManager {
  constructor() {
    this.model = null;
    this.isLoaded = false;
    this.isLoading = false;
  }

  /**
   * Load MobileNet model from TF.js CDN
   * @param {function} onProgress - Progress callback (0-100)
   * @returns {Promise<boolean>}
   */
  async loadModel(onProgress) {
    if (this.isLoaded) return true;
    if (this.isLoading) return false;

    this.isLoading = true;

    try {
      if (onProgress) onProgress(10);

      // Load MobileNet v2 with version 2 and alpha 1.0
      this.model = await mobilenet.load({
        version: 2,
        alpha: 1.0,
      });

      if (onProgress) onProgress(90);

      // Warmup run - first inference is always slow
      const warmupCanvas = document.createElement('canvas');
      warmupCanvas.width = 224;
      warmupCanvas.height = 224;
      const ctx = warmupCanvas.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 224, 224);
      await this.model.classify(warmupCanvas);

      if (onProgress) onProgress(100);

      this.isLoaded = true;
      this.isLoading = false;
      return true;
    } catch (error) {
      console.error('Model loading error:', error);
      this.isLoading = false;
      throw new Error('MODEL_LOAD_FAILED');
    }
  }

  /**
   * Run inference on an image/video element
   * @param {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} input
   * @param {number} topK - Number of top predictions to return
   * @returns {Promise<Array>} - Array of { className, probability, classIndex }
   */
  async predict(input, topK = 5) {
    if (!this.isLoaded || !this.model) {
      throw new Error('Model not loaded');
    }

    try {
      const predictions = await this.model.classify(input, topK);
      return predictions;
    } catch (error) {
      console.error('Prediction error:', error);
      return [];
    }
  }

  /**
   * Check if model is ready for inference
   * @returns {boolean}
   */
  isReady() {
    return this.isLoaded;
  }
}
