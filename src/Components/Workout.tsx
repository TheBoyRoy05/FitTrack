import { useStore } from "@/Hooks/useStore";
import { useCameraCapture } from "@/Hooks/useCameraCapture";
import { capitalize, getGoal } from "@/Utils/functions";
import Notes from "./Forms/Notes";
import CenterText from "./CenterText";
import Chart from "react-apexcharts";
import { useChart } from "@/Hooks/useChart";
import { useWorkout } from "@/Hooks/useWorkout";
import { CVWorkout } from "@/Utils/types";
import { memo, useMemo } from "react";

const MemoizedChart = memo(Chart);

const Workout = ({ workout }: { workout: CVWorkout }) => {
  const { startSet, stopSet, finishWorkout, running, text } = useWorkout(workout);
  const { videoRef, canvasRef } = useCameraCapture(workout);
  const { collect, data } = useStore();
  const chartProps = useChart(workout);

  const memoizedChart = useMemo(() => <MemoizedChart {...chartProps} />, [chartProps]);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">
        {data[workout]?.actual || 0} / {getGoal(workout)} {capitalize(workout)}
      </h1>

      <div className="flex gap-4 relative w-full">
        <div className="flex-1 min-w-0 aspect-[4/3] bg-base-300 shadow-lg rounded-lg p-4">
          <video ref={videoRef} style={{ display: "none" }} />
          <canvas ref={canvasRef} className="w-full h-full rounded-md" />
        </div>
        <div className="flex-1 min-w-0 aspect-[4/3] bg-base-300 shadow-lg rounded-lg p-4">
          {memoizedChart}
        </div>
        <CenterText text={text} />
      </div>

      <Notes category={workout} />

      <div className="flex w-full items-center gap-4">
        <button
          className={`btn btn-lg flex-1 ${collect ? "btn-warning" : "btn-success"}`}
          onClick={collect ? stopSet : startSet}
        >
          {collect ? "Stop Set" : "Start Set"}
        </button>
        <button
          className="btn btn-lg btn-primary flex-1"
          disabled={!running}
          onClick={finishWorkout}
        >
          Finish and Save
        </button>

        {/* DEBUG */}
        {/* <button
          className="btn btn-lg btn-error flex-1"
          onClick={() => {
            setData({ ...data, [workout]: { type: workout } });
            saveData({ ...data, [workout]: { type: workout } });
          }}
        >
          Reset
        </button> */}
      </div>
    </div>
  );
};

export default Workout;
