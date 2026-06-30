/**
 * PetVision AI - Camera Manager
 * Handles webcam access, stream management, and frame capture
 */

class CameraManager {
  constructor(videoElement) {
    this.video = videoElement;
    this.stream = null;
    this.isRunning = false;
  }

  /**
   * Start the webcam stream
   * @returns {Promise<boolean>} - true if camera started successfully
   */
  async startCamera() {
    try {
      // Request camera with preferred settings
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'environment', // Prefer back camera on mobile
        },
        audio: false,
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.video.srcObject = this.stream;

      // Wait for video to be ready
      await new Promise((resolve) => {
        this.video.onloadedmetadata = () => {
          this.video.play();
          resolve();
        };
      });

      this.isRunning = true;
      return true;
    } catch (error) {
      console.error('Camera access error:', error);

      if (error.name === 'NotAllowedError') {
        throw new Error('PERMISSION_DENIED');
      } else if (error.name === 'NotFoundError') {
        throw new Error('NO_CAMERA');
      } else if (error.name === 'NotReadableError') {
        throw new Error('CAMERA_IN_USE');
      } else {
        throw new Error('UNKNOWN_ERROR');
      }
    }
  }

  /**
   * Stop the webcam stream and release resources
   */
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.video.srcObject = null;
    this.isRunning = false;
  }

  /**
   * Capture current frame to a canvas
   * @param {HTMLCanvasElement} canvas - Target canvas
   * @returns {ImageData|null}
   */
  captureFrame(canvas) {
    if (!this.isRunning || !this.video.videoWidth) return null;

    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.video, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  /**
   * Get the video element for direct model inference
   * @returns {HTMLVideoElement}
   */
  getVideoElement() {
    return this.video;
  }

  /**
   * Check if camera is currently active
   * @returns {boolean}
   */
  isActive() {
    return this.isRunning && this.stream !== null;
  }

  /**
   * Toggle camera on/off
   * @returns {Promise<boolean>} - new state
   */
  async toggle() {
    if (this.isRunning) {
      this.stopCamera();
      return false;
    } else {
      await this.startCamera();
      return true;
    }
  }
}
