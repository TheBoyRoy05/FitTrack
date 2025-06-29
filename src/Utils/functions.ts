/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, Measurements, Workout } from "./types";
import { supabase } from "./supabase";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function saveData(data: Data) {
  localStorage.setItem("data", JSON.stringify(data));
}

export async function saveMeasurements(measurements?: Measurements) {
  if (!measurements) return;
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toISOString().split("T")[1];

  const { error } = await supabase
    .from("measurements")
    .upsert({ ...measurements, date, time })
    .eq("date", date);
  if (error) console.error(error);
}

export async function saveWorkout(workout?: Workout) {
  if (!workout) return;
  const date = new Date().toISOString().split("T")[0];

  const { error } = await supabase
    .from("workouts")
    .upsert({ ...workout, date })
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
