export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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
    "Pushups": day == 1 ? 100 : 50,
    "Squats": day == 2 ? 100 : 50,
    "Situps": day == 3 ? 100 : 50,
    "Pullups": day == 4 ? 50 : 25,
    "Run": day == 5 ? 4 : 2,
  }
}
