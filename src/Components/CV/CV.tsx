import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useRef, useState } from "react";
import { useStore } from "@/Hooks/useStore";
import { useCameraCapture } from "@/Hooks/useCameraCapture";
import { getGoals, sleep } from "@/Utils/functions";
import { Motion } from "@/Utils/types";

const CV = ({ workout }: { workout: "Pushups" | "Squats" | "Situps" | "Pullups" }) => {
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
      Goal: getGoals()[workout],
      Count: count,
      Time: time,
      Sets: sets
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">{workout}</h1>

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

      <div className="flex justify-center gap-4">
        <button
          className={`btn ${collect ? "btn-warning" : "btn-success"}`}
          onClick={collect ? handleStopSet : handleStartSet}
        >
          {collect ? "Stop Set" : "Start Set"}
        </button>
        <span className="text-5xl font-semibold hero-text-shadow">{count}</span>
        <button className="btn btn-error" disabled={!startTime.current} onClick={handleStopWorkout}>
          Finish Workout
        </button>
      </div>
    </div>
  );
};

export default CV;
