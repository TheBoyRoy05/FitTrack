/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, Frame, Measurements, Workout } from "./types";
import { supabase } from "./supabase";
import { angle, sub } from "./linalg";
import toast from "react-hot-toast";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDate = () => new Date().toISOString().split("T")[0];
export const getTime = () => new Date().toISOString().split("T")[1];

export function convertTimeToISO(timeString: string): string {
  const today = new Date();
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  today.setHours(hours, minutes, seconds, 0);
  return today.toISOString().split("T")[1];
}

export function saveData(data: Data) {
  try {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("date", getDate());
  } catch (error) {
    console.error(error);
    toast.error("Failed to save data");
  }
}

export async function saveMeasurements(measurements?: Measurements) {
  if (!measurements) return;
  const date = getDate();
  const time = getTime();

  const { error } = await supabase
    .from("measurements")
    .upsert({ ...measurements, date, time })
    .eq("date", date);

  if (error) {
    console.error(error);
    toast.error("Failed to save measurements");
  } else toast.success("Successfully saved measurements");
}

export async function saveWorkout(workout?: Workout) {
  if (!workout) return;
  const date = getDate();
  if (workout.type === "run") {
    workout.start_time = convertTimeToISO(workout.start_time!);
    workout.end_time = convertTimeToISO(workout.end_time!);
  }

  const { error } = await supabase
    .from("workouts")
    .upsert({ ...workout, date, goal: getGoal(workout.type!) })
    .eq("type", workout.type)
    .eq("date", date);

  if (error) {
    console.error(error);
    toast.error(`Failed to save ${workout.type}`);
  } else toast.success(`Successfully saved ${workout.type}`);
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

export function getGoal(workout: keyof Data) {
  const day = new Date().getDay();
  return {
    measurements: undefined,
    pushups: day == 1 ? 100 : 50,
    squats: day == 2 ? 100 : 50,
    situps: day == 3 ? 100 : 50,
    pullups: day == 4 ? 50 : 25,
    run: day == 5 ? 4 : 2,
  }[workout];
}

const bodyAngle = (frame: Frame, joint1: string, joint2: string, joint3: string) => [
  angle(
    sub(frame[`LEFT_${joint1}`], frame[`LEFT_${joint2}`]),
    sub(frame[`LEFT_${joint3}`], frame[`LEFT_${joint2}`])
  ),
  angle(
    sub(frame[`RIGHT_${joint1}`], frame[`RIGHT_${joint2}`]),
    sub(frame[`RIGHT_${joint3}`], frame[`RIGHT_${joint2}`])
  ),
];

export const toDegs = (radians: number[]) => radians.map((radian) => (radian * 180) / Math.PI);
export const armAngles = (frame: Frame) => toDegs(bodyAngle(frame, "WRIST", "ELBOW", "SHOULDER"));
export const legAngles = (frame: Frame) => toDegs(bodyAngle(frame, "HIP", "KNEE", "ANKLE"));
export const coreAngles = (frame: Frame) => toDegs(bodyAngle(frame, "KNEE", "HIP", "SHOULDER"));

export const workoutAngle = (workout: keyof Data, frame: Frame) => {
  if (workout === "pushups") return armAngles(frame);
  if (workout === "squats") return legAngles(frame);
  if (workout === "situps") return coreAngles(frame);
  if (workout === "pullups") return armAngles(frame);
  return [];
};
