export type Motion = Record<number, Record<string, number[]>>;

export type Workout = {
  "Goal": number | null,
  "Count": number | null,
  "Time": number | null,
  "Sets": Motion[] | null
}

export type Data = {
  "Measurements": {
    "Left Forearm": number | null,
    "Right Forearm": number | null,
    "Left Bicep": number | null,
    "Right Bicep": number | null,
    "Left Calf": number | null,
    "Right Calf": number | null,
    "Left Thigh": number | null,
    "Right Thigh": number | null,
    "Chest": number | null,
    "Waist": number | null,
    "Hips": number | null,
    "Weight": number | null,
  } | null,
  "Pushups": Workout | null,
  "Squats": Workout | null,
  "Situps": Workout | null,
  "Pullups": Workout | null,
  "Run": {
    "Goal": number | null,
    "Distance": number | null,
    "Time": number | null
  } | null,
  "Notes": string | null
}
