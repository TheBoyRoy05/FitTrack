import { create } from "zustand";
import { Angles, Data, Frame } from "@/Utils/types";
import { createSetter } from "@/Utils/functions";
import { EMPTY_DATA } from "@/Utils/consts";

const anglesRef = { current: {} as Angles };

interface StoreType {
  data: Data;
  frame: Frame;
  collect: boolean;
  anglesRef: typeof anglesRef;
  setData: (data: Data | ((prev: Data) => Data)) => void;
  setFrame: (frame: Frame | ((prev: Frame) => Frame)) => void;
  setCollect: (collect: boolean | ((prev: boolean) => boolean)) => void;
}

export const useStore = create<StoreType>((set, get) => ({
  data: EMPTY_DATA,
  anglesRef,
  collect: false,
  frame: {} as Frame,
  setData: createSetter<StoreType>(set)("data"),
  setCollect: createSetter<StoreType>(set)("collect"),
  setFrame: (update) => {
    const newValue = typeof update === "function" ? update(get().frame) : update;
    set({ frame: newValue });
  },
}));
