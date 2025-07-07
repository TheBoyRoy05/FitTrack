import { useRef, useState } from "react";
import { sleep, getTime, saveData, saveWorkout } from "@/Utils/functions";
import { Angles, CVWorkout } from "@/Utils/types";
import { useStore } from "./useStore";

export const useWorkout = (workout: CVWorkout) => {
  const { setCollect, anglesRef, data, setData } = useStore();
  const running = useRef(false);
  const sets = useRef<Angles[]>([]);
  const [text, setText] = useState("");

  const startSet = async () => {
    setText("Ready");
    await sleep(1000);
    setText("Set");
    await sleep(1000);
    setText("Go!");
    await sleep(1000);
    setText("");

    setCollect(true);
    if (!running.current) startWorkout();
  };

  const stopSet = () => {
    setCollect(false);
    const newSet = { ...anglesRef.current };
    sets.current = [...sets.current, newSet];
  };

  const startWorkout = () => {
    setData((prev) => ({
      ...prev,
      [workout]: { type: workout, start_time: getTime() },
    }));
    running.current = true;
    anglesRef.current = {};
    sets.current = [];
  };

  const finishWorkout = () => {
    running.current = false;
    const updatedData = {
      ...data,
      [workout]: { ...data[workout], end_time: getTime(), sets: sets.current },
    };

    setData(updatedData);
    saveData(updatedData);
    saveWorkout(updatedData[workout]);
  };

  return {
    startSet,
    stopSet,
    startWorkout,
    finishWorkout,
    running: running.current,
    text,
  };
};