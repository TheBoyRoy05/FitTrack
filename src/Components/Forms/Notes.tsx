import { useStore } from "@/Hooks/useStore";

const Notes = () => {
  const { data, setData } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">Notes</h1>
      <form className="flex flex-col gap-4 pb-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            className="textarea textarea-bordered w-full"
            value={data["Notes"] ?? ""}
            onChange={(e) => setData({ ...data, Notes: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default Notes;
