import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useRef, useState } from "react";
import { useStore } from "@/Hooks/useStore";
import { useCameraCapture } from "@/Hooks/useCameraCapture";
import { capitalize, getGoal, saveData, saveWorkout, sleep } from "@/Utils/functions";
import { Motion } from "@/Utils/types";
import Notes from "../Forms/Notes";

const CV = ({ workout }: { workout: "pushups" | "squats" | "situps" | "pullups" }) => {
  const { collect, setCollect, userMotionRef, data, setData } = useStore();
  const { videoRef, canvasRef } = useCameraCapture(workout);
  const startTime = useRef<string>("");
  const running = useRef(false);
  const sets = useRef<Motion[]>([]);
  const [text, setText] = useState("");

  const handleStartSet = async () => {
    setText("Ready");
    await sleep(1000);
    setText("Set");
    await sleep(1000);
    setText("Go!");
    await sleep(1000);
    setText("");

    setCollect(true);
    if (!running.current) {
      startTime.current = new Date().toISOString().split("T")[1];
      userMotionRef.current = {};
      running.current = true;
      sets.current = [];
    }
  };

  const handleStopSet = () => {
    setCollect(false);
    const newSet = { ...userMotionRef.current };
    sets.current = [...sets.current, newSet];
  };

  const handleStopWorkout = () => {
    running.current = false;
    const updatedData = {
      ...data,
      [workout]: {
        ...data[workout],
        type: workout,
        start_time: startTime.current,
        end_time: new Date().toISOString().split("T")[1],
        sets: sets.current,
      },
    };

    setData(updatedData);
    saveData(updatedData);
    saveWorkout(updatedData[workout]);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">
        {data[workout]?.actual || 0} / {getGoal(workout)} {capitalize(workout)}
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
          className="btn btn-lg btn-primary flex-1"
          disabled={!running.current}
          onClick={handleStopWorkout}
        >
          Finish and Save
        </button>
      </div>
    </div>
  );
};

export default CV;
