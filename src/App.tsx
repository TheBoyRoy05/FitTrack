import { useEffect, useState } from "react";
import Measurements from "./Components/Forms/Measurements";
import Timeline from "./Components/Timeline";
import { NextArrow, PrevArrow } from "./Components/Arrows";
import { useStore } from "./Hooks/useStore";
import Run from "./Components/Forms/Run";
import CV from "./Components/CV/CV";
import { EMPTY_DATA } from "./Utils/consts";
import { getDateTime, getGoal } from "./Utils/functions";

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
    pushups: <CV workout="pushups" />,
    squats: <CV workout="squats" />,
    situps: <CV workout="situps" />,
    pullups: <CV workout="pullups" />,
    run: <Run />,
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    const date = localStorage.getItem("date");
    if (data && data != "{}" && date == getDateTime().date) setData(JSON.parse(data));
  }, [setData]);

  return (
    <div className="min-h-screen flex">
      <PrevArrow page={page} setPage={setPage} />
      <div className="min-h-screen flex flex-col w-[60vw] mx-auto py-10">
        <Timeline events={completedPages} page={page} setPage={setPage} />
        {Object.values(pageMap)[page]}
      </div>
      <NextArrow page={page} setPage={setPage} />
    </div>
  );
}

export default App;
