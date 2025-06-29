import { useStore } from "@/Hooks/useStore";
import { Data } from "@/Utils/types";

const Notes = ({ category }: { category: keyof Data }) => {
  const { data, setData } = useStore();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="notes" className="text-sm font-medium">
        Notes
      </label>
      <textarea
        id="notes"
        className="textarea textarea-bordered w-full"
        value={data[category]?.notes ?? ""}
        onChange={(e) =>
          setData({ ...data, [category]: { ...data[category], notes: e.target.value } })
        }
      />
    </div>
  );
};

export default Notes;
