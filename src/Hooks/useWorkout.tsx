import { useRef, useState } from "react";
import { sleep, getTime, saveData, saveWorkout } from "@/Utils/functions";
import { CVWorkout } from "@/Utils/types";
import { useStore } from "./useStore";

export const useWorkout = (workout: CVWorkout) => {
  const { setCollect, anglesRef, data, setData } = useStore();
  const [text, setText] = useState("");
  const running = useRef(false);
  const setStartTime = useRef<number | null>(null);
  const workoutStartTime = useRef<number | null>(null);

  const startSet = async () => {
    setText("Ready");
    await sleep(1000);
    setText("Set");
    await sleep(1000);
    setText("Go!");
    await sleep(1000);
    setText("");

    setCollect(true);
    setStartTime.current = Date.now();
    anglesRef.current = {};
    if (!running.current) startWorkout();
  };

  const stopSet = () => {
    setCollect(false);
    setData({
      ...data,
      [workout]: {
        ...data[workout],
        sets: [...(data[workout]?.sets || []), { ...anglesRef.current }],
      },
    });
  };

  const startWorkout = () => {
    running.current = true;
    workoutStartTime.current = Date.now();
    setData((prev) => ({
      ...prev,
      [workout]: {
        ...prev[workout],
        type: workout,
        start_time: prev[workout]?.start_time || getTime(),
      },
    }));
  };

  const finishWorkout = () => {
    running.current = false;
    const updatedData = {
      ...data,
      [workout]: { ...data[workout], end_time: getTime() },
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
    setStartTime: setStartTime.current,
    workoutStartTime: workoutStartTime.current,
  };
};
