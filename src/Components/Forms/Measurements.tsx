import Input from "./Input";
import { useStore } from "@/Hooks/useStore";

const Measurements = () => {
  const { data } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4 pb-6" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <Input category="Measurements" name="Left Forearm" />
        <Input category="Measurements" name="Right Forearm" />
      </div>
      <div className="flex gap-4">
        <Input category="Measurements" name="Left Bicep" />
        <Input category="Measurements" name="Right Bicep" />
      </div>
      <div className="flex gap-4">
        <Input category="Measurements" name="Left Thigh" />
        <Input category="Measurements" name="Right Thigh" />
      </div>
      <div className="flex gap-4">
        <Input category="Measurements" name="Left Calf" />
        <Input category="Measurements" name="Right Calf" />
      </div>
      <Input category="Measurements" name="Chest" />
      <Input category="Measurements" name="Waist" />
      <Input category="Measurements" name="Hips" />
      <Input category="Measurements" name="Weight" />
      <button type="submit" className="btn btn-primary mt-4">
        Save
      </button>
    </form>
  );
};

export default Measurements;
