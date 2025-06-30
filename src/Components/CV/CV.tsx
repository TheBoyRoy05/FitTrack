import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useRef, useState } from "react";
import { useStore } from "@/Hooks/useStore";
import { useCameraCapture } from "@/Hooks/useCameraCapture";
import { capitalize, getGoals, saveData, saveWorkout, sleep } from "@/Utils/functions";
import { Motion } from "@/Utils/types";
import Notes from "../Forms/Notes";

const CV = ({ workout }: { workout: "pushups" | "squats" | "situps" | "pullups" }) => {
  const { collect, setCollect, count, userMotionRef, data, setData } = useStore();
  const { videoRef, canvasRef } = useCameraCapture(workout);
  const startTime = useRef<string>("");
  const running = useRef(false);
  const [text, setText] = useState("");
  const [sets, setSets] = useState<Motion[]>([]);

  const handleStartSet = async () => {
    setText("Ready");
    await sleep(500);
    setText("Set");
    await sleep(500);
    setText("Go!");
    await sleep(500);
    setText("");

    setCollect(true);
    running.current = true;
    userMotionRef.current = {};
    if (!startTime.current) startTime.current = new Date().toISOString().split("T")[1];
  };

  const handleStopSet = () => {
    setCollect(false);
    const newSet = { ...userMotionRef.current };
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const handleStopWorkout = () => {
    running.current = false;
    const updatedData = {
      ...data,
      [workout]: {
        ...data[workout],
        type: workout,
        actual: count,
        start_time: startTime.current,
        end_time: new Date().toISOString().split("T")[1],
        sets,
      },
    };
    setData(updatedData);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">
        {count} / {getGoals()[workout]} {capitalize(workout)}
      </h1>

      <div className="flex gap-4 relative w-full">
        <div className="flex-1 min-w-0 aspect-[4/3] bg-base-300 shadow-lg rounded-lg p-4">
          <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
            <Model />
            <ambientLight intensity={1} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>
        <div className="flex-1 min-w-0 aspect-[4/3] bg-base-300 shadow-lg rounded-lg p-4">
          <video ref={videoRef} style={{ display: "none" }} />
          <canvas ref={canvasRef} className="w-full h-full rounded-md" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <h1 className="flex-1 text-[7vw] z-50 text-center sporting-outline">{text}</h1>
        </div>
      </div>

      <Notes category={workout} />

      <div className="flex w-full items-center gap-4">
        <button
          className={`btn btn-lg flex-1 ${collect ? "btn-warning" : "btn-success"}`}
          onClick={collect ? handleStopSet : handleStartSet}
        >
          {collect ? "Stop Set" : "Start Set"}
        </button>
        <button
          className="btn btn-lg btn-error flex-1"
          disabled={!running.current}
          onClick={handleStopWorkout}
        >
          Finish Workout
        </button>
      </div>

      <button
        className="btn btn-lg btn-primary w-full"
        onClick={() => {
          saveWorkout(data[workout]);
          saveData(data);
        }}
      >
        Save Workout
      </button>
    </div>
  );
};

export default CV;
