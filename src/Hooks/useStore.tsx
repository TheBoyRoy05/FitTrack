import { create } from "zustand";
import { Data, Frame, Motion } from "@/Utils/types";
import { createSetter } from "@/Utils/functions";
import { EMPTY_DATA } from "@/Utils/consts";

const userMotionRef = { current: {} as Motion };

interface StoreType {
  data: Data;
  frame: Frame;
  collect: boolean;
  userMotionRef: typeof userMotionRef;
  setData: (data: Data | ((prev: Data) => Data)) => void;
  setFrame: (frame: Frame | ((prev: Frame) => Frame)) => void;
  setCollect: (collect: boolean | ((prev: boolean) => boolean)) => void;
}

export const useStore = create<StoreType>((set, get) => ({
  data: EMPTY_DATA,
  userMotionRef,
  collect: false,
  frame: {} as Frame,
  setData: createSetter<StoreType>(set)("data"),
  setCollect: createSetter<StoreType>(set)("collect"),
  setFrame: (update) => {
    const newValue = typeof update === "function" ? update(get().frame) : update;
    set({ frame: newValue });
  },
}));
