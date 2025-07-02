export type Frame = Record<string, number[]>;
export type Motion = Record<number, Frame>;

export type Measurements = {
  left_forearm?: number,
  right_forearm?: number,
  left_bicep?: number,
  right_bicep?: number,
  left_calf?: number,
  right_calf?: number,
  left_thigh?: number,
  right_thigh?: number,
  chest?: number,
  waist?: number,
  hips?: number,
  weight?: number,
  notes?: string,
}

export type Workout = {
  type?: "pushups" | "squats" | "situps" | "pullups" | "run",
  actual?: number,
  sets?: Motion[],
  notes?: string,
  start_time?: string,
  end_time?: string,
}

export type Data = {
  measurements?: Measurements,
  run?: Workout,
  pushups?: Workout,
  squats?: Workout,
  situps?: Workout,
  pullups?: Workout,
}
