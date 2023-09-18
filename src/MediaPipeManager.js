import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default class MediaPipeManager {
  constructor(videoElement, onLandmarksDetected) {
    this.videoElement = videoElement;
    this.onLandmarksDetected = onLandmarksDetected;

    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.hands.onResults(this.onResults.bind(this));

    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement });
      },
      width: 1280,
      height: 720,
    });
    this.camera.start();
  }

  onResults(results) {
    if (results.multiHandLandmarks) {
      this.onLandmarksDetected(results.multiHandLandmarks);
    }
  }
}
