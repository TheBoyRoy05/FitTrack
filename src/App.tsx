import { useEffect, useState } from "react";
import Measurements from "./Components/Forms/Measurements";
import Timeline from "./Components/Timeline";
import Arrows from "./Components/Arrows";
import { useStore } from "./Hooks/useStore";
import Run from "./Components/Forms/Run";
import Notes from "./Components/Forms/Notes";

function App() {
  const { data, setData } = useStore();
  const [page, setPage] = useState(0);
  const completedPages = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value !== null])
  );

  const pageMap = {
    Measurements: <Measurements />,
    Pushups: <></>,
    Squats: <></>,
    Situps: <></>,
    Pullups: <></>,
    Run: <Run />,
    Notes: <Notes />,
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) setData(JSON.parse(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-[60vw] mx-auto py-10">
      <Timeline events={completedPages} />
      {Object.values(pageMap)[page]}
      <Arrows page={page} setPage={setPage} />
    </div>
  );
}

export default App;
