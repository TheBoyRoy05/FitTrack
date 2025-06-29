import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useRef, useState } from "react";
import { useStore } from "@/Hooks/useStore";
import { useCameraCapture } from "@/Hooks/useCameraCapture";
import { capitalize, getGoals, sleep } from "@/Utils/functions";
import { Motion } from "@/Utils/types";
import Notes from "../Forms/Notes";

const CV = ({ workout }: { workout: "pushups" | "squats" | "situps" | "pullups" }) => {
  const { collect, setCollect, count, userMotionRef, data } = useStore();
  const { videoRef, canvasRef } = useCameraCapture();
  const startTime = useRef<number | null>(null);
  const [text, setText] = useState("");
  const sets: Motion[] = [];

  const handleStartSet = async () => {
    setText("Ready");
    await sleep(1000);
    setText("Set");
    await sleep(1000);
    setText("Go!");
    await sleep(1000);
    setText("");

    setCollect(true);
    if (!startTime.current) {
      startTime.current = new Date().getUTCMilliseconds();
    }
  };

  const handleStopSet = () => {
    setCollect(false);
    sets.push(userMotionRef.current);
  };

  const handleStopWorkout = () => {
    const time = (new Date().getUTCMilliseconds() - startTime.current!) / 1000;

    data[workout] = {
      ...data[workout],
      goal: getGoals()[workout],
      value: count,
      time,
      sets,
    };
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">
        {count} {capitalize(workout)}
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

      <div className="flex w-[30vw] mx-auto justify-around items-center gap-4">
        <button
          className={`btn btn-lg ${collect ? "btn-warning" : "btn-success"}`}
          onClick={collect ? handleStopSet : handleStartSet}
        >
          {collect ? "Stop Set" : "Start Set"}
        </button>
        <button
          className="btn btn-lg btn-error"
          disabled={!startTime.current}
          onClick={handleStopWorkout}
        >
          Finish Workout
        </button>
      </div>

      <Notes workout={workout} />
    </div>
  );
};

export default CV;
