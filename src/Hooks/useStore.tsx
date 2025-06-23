import { create } from "zustand";
import { Data, Motion } from "@/Utils/types";
import { createSetter } from "@/Utils/functions";
import { EMPTY_DATA } from "@/Utils/consts";

const userMotionRef = { current: {} as Motion };

interface StoreType {
  data: Data;
  collect: boolean;
  currentPose: Record<string, number[]>;
  userMotionRef: typeof userMotionRef;
  setData: (data: Data | ((prev: Data) => Data)) => void;
  setCollect: (collect: boolean | ((prev: boolean) => boolean)) => void;
  setCurrentPose: (
    pose: Record<string, number[]> | ((prev: Record<string, number[]>) => Record<string, number[]>)
  ) => void;
}

export const useStore = create<StoreType>((set, get) => ({
  data: EMPTY_DATA,
  userMotionRef,
  collect: false,
  currentPose: {} as Record<string, number[]>,
  setData: createSetter<StoreType>(set)("data"),
  setCollect: createSetter<StoreType>(set)("collect"),
  setCurrentPose: (update) => {
    const newValue = typeof update === "function" ? update(get().currentPose) : update;
    set({ currentPose: newValue });
  },
}));
