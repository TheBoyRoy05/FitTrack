/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, Frame, Measurements, Workout } from "./types";
import { supabase } from "./supabase";
import { angle, sub } from "./linalg";
import { THRESHOLD } from "./consts";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getDateTime() {
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toISOString().split("T")[1];
  return { date, time };
}

export function saveData(data: Data) {
  localStorage.setItem("date", getDateTime().date);
  localStorage.setItem("data", JSON.stringify(data));
}

export async function saveMeasurements(measurements?: Measurements) {
  if (!measurements) return;
  const { date, time } = getDateTime();

  const { error } = await supabase
    .from("measurements")
    .upsert({ ...measurements, date, time })
    .eq("date", date);
  if (error) console.error(error);
}

export async function saveWorkout(workout?: Workout) {
  if (!workout) return;
  const { date } = getDateTime();

  const { error } = await supabase
    .from("workouts")
    .upsert({ ...workout, date, goal: getGoals()[workout.type!] })
    .eq("type", workout.type)
    .eq("date", date);
  if (error) console.error(error);
}

export const createSetter =
  <StoreType>(set: any) =>
  <T extends keyof StoreType>(key: T) =>
  (value: StoreType[T] | ((prev: StoreType[T]) => StoreType[T])) =>
    set((state: StoreType) => ({
      [key]:
        typeof value === "function"
          ? (value as (prev: StoreType[T]) => StoreType[T])(state[key])
          : value,
    }));

export function getGoals() {
  const day = new Date().getDay();
  return {
    pushups: day == 1 ? 100 : 50,
    squats: day == 2 ? 100 : 50,
    situps: day == 3 ? 100 : 50,
    pullups: day == 4 ? 50 : 25,
    run: day == 5 ? 4 : 2,
  };
}

const bodyAngle = (frame: Frame, joint1: string, joint2: string, joint3: string) =>
  (angle(
    sub(frame[`LEFT_${joint1}`], frame[`LEFT_${joint2}`]),
    sub(frame[`LEFT_${joint3}`], frame[`LEFT_${joint2}`])
  ) +
    angle(
      sub(frame[`RIGHT_${joint1}`], frame[`RIGHT_${joint2}`]),
      sub(frame[`RIGHT_${joint3}`], frame[`RIGHT_${joint2}`])
    )) /
  2;

export const toDegs = (radians: number) => (radians * 180) / Math.PI;
export const armAngles = (frame: Frame) => toDegs(bodyAngle(frame, "WRIST", "ELBOW", "SHOULDER"));
export const legAngles = (frame: Frame) => toDegs(bodyAngle(frame, "HIP", "KNEE", "ANKLE"));
export const coreAngles = (frame: Frame) => toDegs(bodyAngle(frame, "KNEE", "HIP", "SHOULDER"));

export const workoutAngle = (workout: keyof typeof THRESHOLD, frame: Frame) => {
  if (workout === "pushups") return armAngles(frame);
  if (workout === "squats") return legAngles(frame);
  if (workout === "situps") return coreAngles(frame);
  if (workout === "pullups") return armAngles(frame);
  return 0;
};
