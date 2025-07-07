export type Frame = Record<string, number[]>;
export type Angles = Record<number, number[]>;

export type CVWorkout = "pushups" | "squats" | "situps" | "pullups";

export type Photos = {
  front?: string;
  back?: string;
};

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
  type?: CVWorkout | "run",
  actual?: number,
  sets?: Angles[],
  notes?: string,
  start_time?: string,
  end_time?: string,
}

export type Data = {
  measurements?: Measurements,
  photos?: Photos,
  run?: Workout,
  pushups?: Workout,
  squats?: Workout,
  situps?: Workout,
  pullups?: Workout,
}
