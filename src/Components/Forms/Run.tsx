import { saveData, saveWorkout } from "@/Utils/functions";
import Input from "./Input";
import Notes from "./Notes";
import { useStore } from "@/Hooks/useStore";

const Run = () => { 
  const { data } = useStore();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">Run</h1>
      <form className="flex flex-col gap-4 pb-6">
        <Input category="run" name="actual" title="Distance (mi)" />
        <Input category="run" name="time" title="Time (seconds)" />
        <Notes category="run" />
      </form>
      <button className="btn btn-lg btn-primary w-full" onClick={() => {
        saveWorkout(data.run);
        saveData(data);
      }}>
        Save Workout
      </button>
    </div>
  );
};

export default Run;
