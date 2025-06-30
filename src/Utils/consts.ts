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
  pushups: undefined,
  squats: undefined,
  situps: undefined,
  pullups: undefined,
  run: undefined,
};

export const THRESHOLD = {
  pushups: [90, 170],
  squats: [90, 170],
  situps: [90, 170],
  pullups: [90, 170],
};
