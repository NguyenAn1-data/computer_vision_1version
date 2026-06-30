/**
 * PetVision AI - Pet Classifier
 * Collects predictions over a 10-second window, then picks the
 * most frequent breed as the final result (majority vote).
 */

class PetClassifier {
  constructor() {
    // Voting window settings
    this.votingDuration = 10000; // 10 seconds
    this.votingStartTime = null;
    this.isVoting = false;
    this.votingComplete = false;

    // Vote accumulator: { breedName: { count, type, breed, icon, totalConfidence } }
    this.votes = {};
    this.finalResult = null;

    // Cooldown: after showing result, wait for pet to leave before next detection
    this.cooldownActive = false;
    this.noDetectionFrames = 0;
    this.cooldownThreshold = 30; // ~30 frames without pet = pet left
  }

  /**
   * Process a frame's predictions
   * @param {Array} predictions - Raw predictions from model.predict()
   * @returns {object} - { phase, result, progress, timeLeft }
   *   phase: 'idle' | 'voting' | 'result' | 'cooldown'
   */
  classify(predictions) {
    // If in cooldown, wait for pet to leave
    if (this.cooldownActive) {
      const hasPet = this._findPetInPredictions(predictions);
      if (!hasPet) {
        this.noDetectionFrames++;
        if (this.noDetectionFrames >= this.cooldownThreshold) {
          this._resetForNextDetection();
        }
      } else {
        this.noDetectionFrames = 0;
      }
      return {
        phase: 'result',
        result: this.finalResult,
        progress: 100,
        timeLeft: 0,
      };
    }

    // Find pet in current predictions
    const petMatch = this._findPetInPredictions(predictions);

    // IDLE: no pet detected and not voting
    if (!petMatch && !this.isVoting) {
      return {
        phase: 'idle',
        result: null,
        progress: 0,
        timeLeft: 0,
      };
    }

    // Pet detected - start voting if not already
    if (petMatch && !this.isVoting && !this.votingComplete) {
      this.isVoting = true;
      this.votingStartTime = Date.now();
      this.votes = {};
    }

    // VOTING: accumulate votes
    if (this.isVoting) {
      const elapsed = Date.now() - this.votingStartTime;
      const progress = Math.min((elapsed / this.votingDuration) * 100, 100);
      const timeLeft = Math.max(0, Math.ceil((this.votingDuration - elapsed) / 1000));

      // Add vote if pet detected in this frame
      if (petMatch) {
        const key = petMatch.breed;
        if (!this.votes[key]) {
          this.votes[key] = {
            count: 0,
            type: petMatch.type,
            breed: petMatch.breed,
            breedVi: petMatch.breedVi,
            icon: petMatch.icon,
            totalConfidence: 0,
          };
        }
        this.votes[key].count++;
        this.votes[key].totalConfidence += petMatch.confidence;
      }

      // Check if voting period is over
      if (elapsed >= this.votingDuration) {
        this._finalizeVote();
        return {
          phase: 'result',
          result: this.finalResult,
          progress: 100,
          timeLeft: 0,
        };
      }

      // Still voting - show current leading breed
      const currentLeader = this._getCurrentLeader();
      return {
        phase: 'voting',
        result: currentLeader,
        progress: progress,
        timeLeft: timeLeft,
      };
    }

    return { phase: 'idle', result: null, progress: 0, timeLeft: 0 };
  }

  /**
   * Find a pet match in predictions
   * @param {Array} predictions
   * @returns {object|null}
   */
  _findPetInPredictions(predictions) {
    if (!predictions || predictions.length === 0) return null;

    for (const pred of predictions) {
      if (typeof getPetInfoByName === 'function') {
        const info = getPetInfoByName(pred.className);
        if (info && pred.probability > 0.08) {
          return {
            ...info,
            confidence: pred.probability,
          };
        }
      }
    }
    return null;
  }

  /**
   * Get the currently leading breed during voting
   * @returns {object|null}
   */
  _getCurrentLeader() {
    let leader = null;
    let maxCount = 0;

    for (const key in this.votes) {
      if (this.votes[key].count > maxCount) {
        maxCount = this.votes[key].count;
        leader = this.votes[key];
      }
    }

    if (!leader) return null;

    return {
      detected: true,
      type: leader.type,
      breed: leader.breed,
      breedVi: leader.breedVi,
      confidence: leader.totalConfidence / leader.count,
      icon: leader.icon,
      voteCount: leader.count,
    };
  }

  /**
   * Finalize voting - pick the breed with most votes
   */
  _finalizeVote() {
    this.isVoting = false;
    this.votingComplete = true;
    this.cooldownActive = true;
    this.noDetectionFrames = 0;

    this.finalResult = this._getCurrentLeader();

    if (!this.finalResult) {
      this.finalResult = {
        detected: false,
        type: null,
        breed: 'Không xác định được',
        confidence: 0,
        icon: '❓',
      };
    }
  }

  /**
   * Reset for next detection (after pet leaves)
   */
  _resetForNextDetection() {
    this.isVoting = false;
    this.votingComplete = false;
    this.cooldownActive = false;
    this.votes = {};
    this.finalResult = null;
    this.noDetectionFrames = 0;
    this.votingStartTime = null;
  }

  /**
   * Full reset
   */
  reset() {
    this._resetForNextDetection();
  }
}
