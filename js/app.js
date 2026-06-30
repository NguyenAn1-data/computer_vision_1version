/**
 * PetVision AI - Main Application
 * Orchestrates camera, model, classifier, and UI modules
 */

// Global instances
let camera, model, classifier, ui;
let detectionLoop = null;
let isPaused = false;

/**
 * Main initialization
 */
async function initApp() {
  // Initialize UI first
  ui = new UIManager();
  ui.showLoading(0, 'Khởi tạo ứng dụng...');

  // Initialize modules
  model = new ModelManager();
  classifier = new PetClassifier();

  try {
    // Step 1: Load AI Model
    ui.updateLoadingProgress(5, 'Đang tải TensorFlow.js...');

    await model.loadModel((progress) => {
      const mappedProgress = 5 + (progress * 0.7); // 5% to 75%
      const texts = {
        10: 'Đang tải mô hình MobileNet v2...',
        90: 'Đang khởi động AI engine...',
        100: 'Mô hình AI đã sẵn sàng! ✅',
      };
      ui.updateLoadingProgress(mappedProgress, texts[progress] || 'Đang xử lý...');
    });

    // Step 2: Initialize Camera
    ui.updateLoadingProgress(80, 'Đang khởi tạo camera...');

    const videoElement = document.getElementById('camera-view');
    camera = new CameraManager(videoElement);

    // Step 3: Start Camera
    ui.updateLoadingProgress(90, 'Đang bật camera...');

    await camera.startCamera();

    // Step 4: Ready!
    ui.updateLoadingProgress(100, '🚀 Sẵn sàng!');

    // Small delay for user to see "Ready!" message
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Hide loading and show main app
    ui.hideLoading();
    ui.updateCameraButton(true);

    // Start detection loop
    startDetectionLoop();

  } catch (error) {
    console.error('Initialization error:', error);
    ui.hideLoading();
    ui.showError(error.message);
  }

  // Setup control event listeners
  setupControls();
}

/**
 * Start the real-time detection loop
 */
function startDetectionLoop() {
  if (detectionLoop) return;

  async function detect() {
    if (!camera.isActive() || isPaused) {
      detectionLoop = requestAnimationFrame(detect);
      return;
    }

    try {
      // Run prediction on video element directly
      const predictions = await model.predict(camera.getVideoElement(), 5);

      // Classify results
      const result = classifier.classify(predictions);

      // Update UI
      ui.updatePrediction(result);

    } catch (error) {
      // Silently handle frame errors (common during camera transitions)
      console.warn('Frame detection error:', error);
    }

    detectionLoop = requestAnimationFrame(detect);
  }

  detectionLoop = requestAnimationFrame(detect);
}

/**
 * Stop the detection loop
 */
function stopDetectionLoop() {
  if (detectionLoop) {
    cancelAnimationFrame(detectionLoop);
    detectionLoop = null;
  }
}

/**
 * Setup control button event listeners
 */
function setupControls() {
  // Toggle Camera button
  const btnToggle = document.getElementById('btn-toggle-camera');
  if (btnToggle) {
    btnToggle.addEventListener('click', async () => {
      try {
        const isOn = await camera.toggle();
        ui.updateCameraButton(isOn);

        if (isOn) {
          classifier.reset();
          startDetectionLoop();
        }
      } catch (error) {
        ui.showError(error.message);
      }
    });
  }

  // Capture button
  const btnCapture = document.getElementById('btn-capture');
  if (btnCapture) {
    btnCapture.addEventListener('click', () => {
      if (!camera.isActive()) return;

      const canvas = document.createElement('canvas');
      camera.captureFrame(canvas);

      // Draw result overlay on captured image
      const dataUrl = canvas.toDataURL('image/png');
      ui.showCaptureModal(dataUrl);
    });
  }

  // Theme toggle button
  const btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      ui.toggleTheme();
    });
  }

  // Close modals on background click
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
}

// ===== Start the app when DOM is ready =====
document.addEventListener('DOMContentLoaded', initApp);
