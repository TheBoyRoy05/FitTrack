import Input from "./Input";
import Notes from "./Notes";

const Measurements = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">Measurements</h1>
      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input category="measurements" name="left_forearm" title="Left Forearm" />
          <Input category="measurements" name="right_forearm" title="Right Forearm" />
        </div>
        <div className="flex gap-4">
          <Input category="measurements" name="left_bicep" title="Left Bicep" />
          <Input category="measurements" name="right_bicep" title="Right Bicep" />
        </div>
        <div className="flex gap-4">
          <Input category="measurements" name="left_thigh" title="Left Thigh" />
          <Input category="measurements" name="right_thigh" title="Right Thigh" />
        </div>
        <div className="flex gap-4">
          <Input category="measurements" name="left_calf" title="Left Calf" />
          <Input category="measurements" name="right_calf" title="Right Calf" />
        </div>
        <Input category="measurements" name="chest" title="Chest" />
        <Input category="measurements" name="waist" title="Waist" />
        <Input category="measurements" name="hips" title="Hips" />
        <Input category="measurements" name="weight" title="Weight" />
        <Notes category="measurements" />
      </form>
    </div>
  );
};

export default Measurements;
