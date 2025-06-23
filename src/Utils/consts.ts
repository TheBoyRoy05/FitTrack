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
  "Measurements": null,
  "Pushups": null,
  "Squats": null,
  "Situps": null,
  "Pullups": null,
  "Run": null,
  "Notes": null,
};
