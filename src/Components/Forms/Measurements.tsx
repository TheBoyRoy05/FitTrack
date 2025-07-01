import Input from "./Input";
import Notes from "./Notes";
import { useStore } from "@/Hooks/useStore";
import { saveData, saveMeasurements } from "@/Utils/functions";

const Measurements = () => {
  const { data } = useStore();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">Measurements</h1>
      <form className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4">
          <Input category="measurements" name="left_forearm" title="Left Forearm (in)" />
          <Input category="measurements" name="right_forearm" title="Right Forearm (in)" />
        </div>
        <div className="flex gap-4">
          <Input category="measurements" name="left_bicep" title="Left Bicep (in)" />
          <Input category="measurements" name="right_bicep" title="Right Bicep (in)" />
        </div>
        <div className="flex gap-4">
          <Input category="measurements" name="left_thigh" title="Left Thigh (in)" />
          <Input category="measurements" name="right_thigh" title="Right Thigh (in)" />
        </div>
        <div className="flex gap-4">
          <Input category="measurements" name="left_calf" title="Left Calf (in)" />
          <Input category="measurements" name="right_calf" title="Right Calf (in)" />
        </div>
        <Input category="measurements" name="chest" title="Chest (in)" />
        <Input category="measurements" name="waist" title="Waist (in)" />
        <Input category="measurements" name="hips" title="Hips (in)" />
        <Input category="measurements" name="weight" title="Weight (lbs)" />
        <Notes category="measurements" />
      </form>
      <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          saveMeasurements(data.measurements);
          saveData(data);
        }}
      >
        Save Measurements
      </button>
    </div>
  );
};

export default Measurements;
