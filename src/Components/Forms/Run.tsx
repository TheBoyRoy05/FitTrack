import { useStore } from "@/Hooks/useStore";
import Input from "./Input";

const Run = () => {
  const { data } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4 pb-6" onSubmit={handleSubmit}>
      <Input category="Run" name="Distance" title="Distance (mi)" />
      <Input category="Run" name="Time" title="Time (seconds)" />
      <button type="submit" className="btn btn-primary mt-4">
        Save
      </button>
    </form>
  )
}

export default Run
