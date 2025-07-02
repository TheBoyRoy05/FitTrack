import { useRef, useEffect } from "react";
import { Pose, POSE_CONNECTIONS, POSE_LANDMARKS } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { useStore } from "./useStore";
import { JOINTS, THRESHOLD } from "@/Utils/consts";
import { workoutAngle } from "@/Utils/functions";
import { Frame } from "@/Utils/types";

// Singleton for Pose instance to prevent multiple script loads
let poseInstance: Pose | null = null;
let posePromise: Promise<Pose> | null = null;

const getPoseInstance = async (): Promise<Pose> => {
  if (poseInstance) return poseInstance;
  if (posePromise) return posePromise;

  posePromise = new Promise((resolve) => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    poseInstance = pose;
    resolve(pose);
  });

  return posePromise;
};

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (poseInstance) {
      poseInstance.close();
      poseInstance = null;
      posePromise = null;
    }
  });
}

export function useCameraCapture(workout: keyof typeof THRESHOLD) {
  const { collect, setFrame, setData, anglesRef } = useStore();
  const collectRef = useRef(collect);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<cam.Camera | null>(null);
  const upRef = useRef(false);
  const downRef = useRef(false);

  useEffect(() => {
    collectRef.current = collect; // keep ref in sync with prop
  }, [collect]);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    let pose: Pose;
    let isActive = true;

    const initializePose = async () => {
      try {
        pose = await getPoseInstance();

        if (!isActive) return;

        pose.onResults((results) => {
          if (!isActive) return;

          const canvas = canvasRef.current;
          const video = videoRef.current;
          const ctx = canvas?.getContext("2d");
          const landmarks = results.poseLandmarks;
          const worldLandmarks = results.poseWorldLandmarks;

          if (!canvas || !ctx || !video || !landmarks) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          ctx.strokeStyle = "lime";
          ctx.lineWidth = 2;
          for (const [startIdx, endIdx] of POSE_CONNECTIONS) {
            const start = landmarks[startIdx];
            const end = landmarks[endIdx];
            ctx.beginPath();
            ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
            ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
            ctx.stroke();
          }

          for (const landmark of landmarks) {
            ctx.beginPath();
            ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          }

          if (worldLandmarks) {
            const frame: Frame = {};
            for (const key of JOINTS) {
              const index = POSE_LANDMARKS[key as keyof typeof POSE_LANDMARKS];
              const lm = worldLandmarks[index];
              frame[key] = [lm.x, -lm.y, -lm.z];
            }

            setFrame(frame);
            if (collectRef.current) {
              
              const angles = workoutAngle(workout, frame);
              const avgAngle = (angles[0] + angles[1]) / 2;
              if (avgAngle < THRESHOLD[workout][0]) downRef.current = true;
              if (downRef.current && avgAngle > THRESHOLD[workout][1]) upRef.current = true;
              anglesRef.current = { ...anglesRef.current, [Date.now()]: angles };

              if (upRef.current && downRef.current) {
                setData((prev) => ({
                  ...prev,
                  [workout]: { ...prev[workout], actual: (prev[workout]?.actual || 0) + 1 },
                }));
                downRef.current = false;
                upRef.current = false;
              }
            } else {
              downRef.current = false;
              upRef.current = false;
            }
          }
        });

        if (videoRef.current && isActive) {
          cameraRef.current = new cam.Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && isActive) {
                await pose.send({ image: videoRef.current });
              }
            },
            width: 600,
            height: 450,
          });
          cameraRef.current.start();
        }
      } catch (error) {
        console.error("Failed to initialize MediaPipe pose:", error);
      }
    };

    initializePose();

    return () => {
      isActive = false;
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
    };
  }, [workout]);

  return { videoRef, canvasRef };
}
