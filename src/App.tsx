import { useEffect, useState } from "react";
import Measurements from "./Components/Forms/Measurements";
import Timeline from "./Components/Timeline";
import { NextArrow, PrevArrow } from "./Components/Arrows";
import { useStore } from "./Hooks/useStore";
import Run from "./Components/Forms/Run";
import Workout from "./Components/Workout";
import { EMPTY_DATA } from "./Utils/consts";
import { getDate, getGoal } from "./Utils/functions";
import Photos from "./Components/Photos";

function App() {
  const { data, setData } = useStore();
  const [page, setPage] = useState(0);
  const completedPages = Object.fromEntries(
    Object.entries({ ...EMPTY_DATA, ...data }).map(([key, value]) => [
      key,
      value && "type" in value
        ? getGoal(value.type!)! <= (value.actual ?? 0)
        : value !== undefined,
    ])
  );

  const pageMap = {
    measurements: <Measurements />,
    photos: <Photos />,
    run: <Run />,
    pushups: <Workout workout="pushups" />,
    squats: <Workout workout="squats" />,
    situps: <Workout workout="situps" />,
    pullups: <Workout workout="pullups" />,
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    const date = localStorage.getItem("date");
    if (data && data != "{}" && date == getDate()) setData(JSON.parse(data));
  }, [setData]);

  return (
    <div className="min-h-screen flex">
      <PrevArrow page={page} setPage={setPage} />
      <div className="min-h-screen flex flex-col w-[60vw] mx-auto py-6">
        <Timeline events={completedPages} page={page} setPage={setPage} />
        {Object.values(pageMap)[page]}
      </div>
      <NextArrow page={page} setPage={setPage} />
    </div>
  );
}

export default App;
