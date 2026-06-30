/**
 * PetVision AI - UI Manager
 * Handles all UI updates, animations, and user interactions
 */

class UIManager {
  constructor() {
    // Cache DOM elements
    this.elements = {
      loadingScreen: document.getElementById('loading-screen'),
      loadingProgress: document.getElementById('loading-progress'),
      loadingText: document.getElementById('loading-text'),
      mainApp: document.getElementById('main-app'),
      cameraView: document.getElementById('camera-view'),
      cameraContainer: document.getElementById('camera-container'),
      resultOverlay: document.getElementById('result-overlay'),
      resultIcon: document.getElementById('result-icon'),
      resultType: document.getElementById('result-type'),
      resultBreed: document.getElementById('result-breed'),
      confidenceBar: document.getElementById('confidence-bar'),
      confidenceText: document.getElementById('confidence-text'),
      topPredictions: document.getElementById('top-predictions'),
      btnToggleCamera: document.getElementById('btn-toggle-camera'),
      btnCapture: document.getElementById('btn-capture'),
      btnTheme: document.getElementById('btn-theme'),
      dogCount: document.getElementById('dog-count'),
      catCount: document.getElementById('cat-count'),
      fpsCounter: document.getElementById('fps-counter'),
      statusDot: document.getElementById('status-dot'),
      statusText: document.getElementById('status-text'),
      errorModal: document.getElementById('error-modal'),
      errorMessage: document.getElementById('error-message'),
      errorClose: document.getElementById('error-close'),
      capturedImage: document.getElementById('captured-image'),
      captureModal: document.getElementById('capture-modal'),
      captureClose: document.getElementById('capture-close'),
      historyList: document.getElementById('history-list'),
      btnClearHistory: document.getElementById('btn-clear-history'),
    };

    // Stats
    this.stats = { dog: 0, cat: 0 };
    this.isDarkMode = true;
    this.lastDetectedType = null;
    this.lastHistoryBreed = null;
    this.history = [];
    this.maxHistory = 20;

    // FPS calculation
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    this.currentFps = 0;

    this._initEventListeners();
  }

  /**
   * Initialize event listeners for modal close buttons
   */
  _initEventListeners() {
    if (this.elements.errorClose) {
      this.elements.errorClose.addEventListener('click', () => {
        this.hideError();
      });
    }
    if (this.elements.captureClose) {
      this.elements.captureClose.addEventListener('click', () => {
        this.hideCaptureModal();
      });
    }
    if (this.elements.btnClearHistory) {
      this.elements.btnClearHistory.addEventListener('click', () => {
        this.clearHistory();
      });
    }
  }

  // ===== LOADING SCREEN =====

  /**
   * Show loading screen with progress
   * @param {number} progress - 0-100
   * @param {string} text - Status text
   */
  showLoading(progress, text) {
    if (this.elements.loadingScreen) {
      this.elements.loadingScreen.classList.remove('hidden');
    }
    if (this.elements.mainApp) {
      this.elements.mainApp.classList.add('hidden');
    }
    this.updateLoadingProgress(progress, text);
  }

  /**
   * Update loading progress
   */
  updateLoadingProgress(progress, text) {
    if (this.elements.loadingProgress) {
      this.elements.loadingProgress.style.width = `${progress}%`;
    }
    if (this.elements.loadingText) {
      this.elements.loadingText.textContent = text || 'Đang tải...';
    }
  }

  /**
   * Hide loading screen and show main app
   */
  hideLoading() {
    if (this.elements.loadingScreen) {
      this.elements.loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.loadingScreen.classList.remove('fade-out');
      }, 500);
    }
    if (this.elements.mainApp) {
      this.elements.mainApp.classList.remove('hidden');
      this.elements.mainApp.classList.add('fade-in');
    }
  }

  // ===== PREDICTION RESULTS =====

  /**
   * Update the prediction result display
   * @param {object} data - { phase, result, progress, timeLeft } from PetClassifier
   */
  updatePrediction(data) {
    this._updateFps();

    const { phase, result, progress, timeLeft } = data;

    switch (phase) {
      case 'idle':
        this._showSearching();
        this._hideVotingBar();
        break;

      case 'voting':
        this._showVotingState(result, progress, timeLeft);
        break;

      case 'result':
        this._showFinalResult(result);
        this._hideVotingBar();
        break;
    }
  }

  /**
   * Show voting state - 10s countdown with current leader
   */
  _showVotingState(result, progress, timeLeft) {
    // Show and update voting bar
    const votingSection = document.getElementById('voting-section');
    const votingProgress = document.getElementById('voting-progress');
    const votingTimer = document.getElementById('voting-timer');
    const resultPhase = document.getElementById('result-phase');

    if (votingSection) votingSection.classList.remove('hidden');
    if (votingProgress) votingProgress.style.width = `${progress}%`;
    if (votingTimer) votingTimer.textContent = `${timeLeft}s`;

    if (resultPhase) {
      resultPhase.textContent = 'Đang phân tích...';
      resultPhase.className = 'result-phase phase-voting';
    }

    // Show current leading prediction
    if (result) {
      if (this.elements.resultIcon) {
        this.elements.resultIcon.textContent = result.icon;
      }
      if (this.elements.resultType) {
        const typeLabel = result.type === 'dog' ? '🐕 Chó' : '🐈 Mèo';
        this.elements.resultType.textContent = typeLabel;
        this.elements.resultType.className = `result-type ${result.type}`;
      }
      if (this.elements.resultBreed) {
        this.elements.resultBreed.textContent = result.breed || '...';
        this.elements.resultBreed.className = `result-breed ${result.type}`;
      }

      const confidencePct = Math.round(result.confidence * 100);
      if (this.elements.confidenceBar) {
        this.elements.confidenceBar.style.width = `${confidencePct}%`;
        this.elements.confidenceBar.className = `confidence-fill ${result.type}`;
      }
      if (this.elements.confidenceText) {
        this.elements.confidenceText.textContent = `${confidencePct}%`;
      }

      this._updateGlow(result.type);
    }

    this._setStatus('active', `Phân tích... ${timeLeft}s`);
  }

  /**
   * Show final locked-in result after 10s voting
   */
  _showFinalResult(result) {
    if (!result || !result.detected) {
      this._showSearching();
      return;
    }

    const resultPhase = document.getElementById('result-phase');
    if (resultPhase) {
      resultPhase.textContent = '✅ Kết quả cuối cùng';
      resultPhase.className = 'result-phase phase-result';
    }

    if (this.elements.resultIcon) {
      this.elements.resultIcon.textContent = result.icon;
      this.elements.resultIcon.classList.add('bounce');
      setTimeout(() => this.elements.resultIcon.classList.remove('bounce'), 300);
    }

    if (this.elements.resultType) {
      const typeLabel = result.type === 'dog' ? '🐕 Chó' : '🐈 Mèo';
      this.elements.resultType.textContent = typeLabel;
      this.elements.resultType.className = `result-type ${result.type}`;
    }

    if (this.elements.resultBreed) {
      this.elements.resultBreed.textContent = result.breed;
      this.elements.resultBreed.className = `result-breed ${result.type}`;
    }

    const confidencePct = Math.round(result.confidence * 100);
    if (this.elements.confidenceBar) {
      this.elements.confidenceBar.style.width = `${confidencePct}%`;
      this.elements.confidenceBar.className = `confidence-fill ${result.type}`;
    }
    if (this.elements.confidenceText) {
      this.elements.confidenceText.textContent = `${confidencePct}%`;
    }

    this._updateGlow(result.type);

    // Add to history (only once per final result)
    if (result.breed !== this.lastHistoryBreed) {
      this.stats[result.type]++;
      this._updateStats();
      this._addToHistory(result);
      this.lastHistoryBreed = result.breed;
    }

    this._setStatus('active', 'Hoàn tất nhận diện');
  }

  /**
   * Hide voting progress bar
   */
  _hideVotingBar() {
    const votingSection = document.getElementById('voting-section');
    if (votingSection) votingSection.classList.add('hidden');

    const resultPhase = document.getElementById('result-phase');
    if (resultPhase && resultPhase.classList.contains('phase-voting')) {
      resultPhase.textContent = '';
      resultPhase.className = 'result-phase';
    }
  }

  /**
   * Show "searching" state when no pet is detected
   */
  _showSearching() {
    if (this.elements.resultIcon) {
      this.elements.resultIcon.textContent = '🔍';
    }
    if (this.elements.resultType) {
      this.elements.resultType.textContent = 'Đang tìm kiếm...';
      this.elements.resultType.className = 'result-type searching';
    }
    if (this.elements.resultBreed) {
      this.elements.resultBreed.textContent = 'Hướng camera vào chó hoặc mèo';
    }
    if (this.elements.confidenceBar) {
      this.elements.confidenceBar.style.width = '0%';
    }
    if (this.elements.confidenceText) {
      this.elements.confidenceText.textContent = '0%';
    }

    this._updateGlow(null);
    this.lastDetectedType = null;
  }

  /**
   * Update glow effect around camera viewport
   * @param {string|null} type - 'dog', 'cat', or null
   */
  _updateGlow(type) {
    if (!this.elements.cameraContainer) return;

    this.elements.cameraContainer.classList.remove('glow-dog', 'glow-cat', 'glow-none');

    if (type === 'dog') {
      this.elements.cameraContainer.classList.add('glow-dog');
    } else if (type === 'cat') {
      this.elements.cameraContainer.classList.add('glow-cat');
    } else {
      this.elements.cameraContainer.classList.add('glow-none');
    }
  }

  /**
   * Update top predictions list
   */
  _updateTopPredictions(predictions) {
    if (!this.elements.topPredictions) return;

    if (!predictions || predictions.length === 0) {
      this.elements.topPredictions.innerHTML = '<li class="no-predictions">Chưa có dữ liệu</li>';
      return;
    }

    const html = predictions
      .slice(0, 3)
      .map((p) => {
        const pct = Math.round(p.confidence * 100);
        return `
          <li class="prediction-item">
            <span class="prediction-icon">${p.icon || '🔍'}</span>
            <span class="prediction-name">${p.breed}</span>
            <span class="prediction-confidence">${pct}%</span>
          </li>
        `;
      })
      .join('');

    this.elements.topPredictions.innerHTML = html;
  }

  /**
   * Update stats counters
   */
  _updateStats() {
    if (this.elements.dogCount) {
      this.elements.dogCount.textContent = this.stats.dog;
    }
    if (this.elements.catCount) {
      this.elements.catCount.textContent = this.stats.cat;
    }
  }

  // ===== STATUS & FPS =====

  /**
   * Set status indicator
   * @param {string} status - 'active', 'inactive', 'error'
   * @param {string} text
   */
  _setStatus(status, text) {
    if (this.elements.statusDot) {
      this.elements.statusDot.className = `status-dot ${status}`;
    }
    if (this.elements.statusText) {
      this.elements.statusText.textContent = text;
    }
  }

  /**
   * Update FPS counter
   */
  _updateFps() {
    this.frameCount++;
    const now = performance.now();
    const elapsed = now - this.lastFpsUpdate;

    if (elapsed >= 1000) {
      this.currentFps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastFpsUpdate = now;

      if (this.elements.fpsCounter) {
        this.elements.fpsCounter.textContent = `${this.currentFps} FPS`;
      }
    }
  }

  // ===== HISTORY =====

  /**
   * Add a detection result to the history
   * @param {object} result
   */
  _addToHistory(result) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const entry = {
      type: result.type,
      breed: result.breed,
      confidence: result.confidence,
      time: timeStr,
      icon: result.icon,
    };

    // Add to beginning (newest first)
    this.history.unshift(entry);

    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }

    this._renderHistory();
  }

  /**
   * Render the history list
   */
  _renderHistory() {
    if (!this.elements.historyList) return;

    if (this.history.length === 0) {
      this.elements.historyList.innerHTML = '<div class="history-empty">Chưa có lịch sử</div>';
      return;
    }

    const html = this.history
      .map((entry, index) => {
        const pct = Math.round(entry.confidence * 100);
        return `
          <div class="history-item" style="animation-delay: ${index === 0 ? '0s' : 'none'}">
            <span class="history-icon">${entry.icon}</span>
            <div class="history-info">
              <div class="history-breed ${entry.type}">${entry.breed}</div>
              <div class="history-time">${entry.time}</div>
            </div>
            <span class="history-conf">${pct}%</span>
          </div>
        `;
      })
      .join('');

    this.elements.historyList.innerHTML = html;
  }

  /**
   * Clear all history
   */
  clearHistory() {
    this.history = [];
    this.lastHistoryBreed = null;
    this._renderHistory();
  }

  // ===== THEME =====

  /**
   * Toggle dark/light mode
   */
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('light-mode', !this.isDarkMode);

    if (this.elements.btnTheme) {
      this.elements.btnTheme.textContent = this.isDarkMode ? '☀️' : '🌙';
    }
  }

  // ===== CAPTURE =====

  /**
   * Show captured screenshot in modal
   * @param {string} dataUrl - Base64 image data URL
   * @param {object} result - Current detection result
   */
  showCaptureModal(dataUrl, result) {
    if (this.elements.capturedImage) {
      this.elements.capturedImage.src = dataUrl;
    }
    if (this.elements.captureModal) {
      this.elements.captureModal.classList.remove('hidden');
      this.elements.captureModal.classList.add('fade-in');
    }
  }

  hideCaptureModal() {
    if (this.elements.captureModal) {
      this.elements.captureModal.classList.add('hidden');
      this.elements.captureModal.classList.remove('fade-in');
    }
  }

  // ===== ERRORS =====

  /**
   * Show error message
   * @param {string} errorCode - Error code from camera/model
   */
  showError(errorCode) {
    const messages = {
      PERMISSION_DENIED: '⚠️ Bạn đã từ chối quyền truy cập camera.\nVui lòng cho phép camera trong cài đặt trình duyệt và tải lại trang.',
      NO_CAMERA: '📷 Không tìm thấy camera.\nVui lòng kết nối webcam và thử lại.',
      CAMERA_IN_USE: '🔒 Camera đang được ứng dụng khác sử dụng.\nVui lòng đóng ứng dụng đó và thử lại.',
      MODEL_LOAD_FAILED: '❌ Không thể tải mô hình AI.\nVui lòng kiểm tra kết nối internet và tải lại trang.',
      UNKNOWN_ERROR: '❓ Đã xảy ra lỗi không xác định.\nVui lòng tải lại trang.',
    };

    const message = messages[errorCode] || messages.UNKNOWN_ERROR;

    if (this.elements.errorMessage) {
      this.elements.errorMessage.textContent = message;
    }
    if (this.elements.errorModal) {
      this.elements.errorModal.classList.remove('hidden');
      this.elements.errorModal.classList.add('fade-in');
    }

    this._setStatus('error', 'Lỗi');
  }

  hideError() {
    if (this.elements.errorModal) {
      this.elements.errorModal.classList.add('hidden');
      this.elements.errorModal.classList.remove('fade-in');
    }
  }

  // ===== CAMERA BUTTON =====

  /**
   * Update camera toggle button state
   * @param {boolean} isOn
   */
  updateCameraButton(isOn) {
    if (this.elements.btnToggleCamera) {
      this.elements.btnToggleCamera.innerHTML = isOn
        ? '<span class="btn-icon">📷</span><span>Tắt Camera</span>'
        : '<span class="btn-icon">📷</span><span>Bật Camera</span>';
      this.elements.btnToggleCamera.classList.toggle('active', isOn);
    }

    this._setStatus(isOn ? 'active' : 'inactive', isOn ? 'Camera đang bật' : 'Camera đã tắt');
  }
}
