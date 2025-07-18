import { Data } from "./types";

export const JOINTS = [
  "LEFT_SHOULDER",
  "RIGHT_SHOULDER",
  "LEFT_ELBOW",
  "RIGHT_ELBOW",
  "LEFT_WRIST",
  "RIGHT_WRIST",
  "LEFT_HIP",
  "RIGHT_HIP",
  "LEFT_KNEE",
  "RIGHT_KNEE",
  "LEFT_ANKLE",
  "RIGHT_ANKLE",
];

export const EMPTY_DATA: Data = {
  measurements: undefined,
  photos: undefined,
  run: undefined,
  pushups: undefined,
  squats: undefined,
  situps: undefined,
  pullups: undefined,
};

export const THRESHOLD = {
  pushups: [110, 160],
  squats: [80, 155],
  situps: [90, 125],
  pullups: [105, 160],
};
