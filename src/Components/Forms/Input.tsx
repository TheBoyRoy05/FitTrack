import { Data } from "@/Utils/types";
import { useStore } from "@/Hooks/useStore";

interface InputProps {
  category: keyof Data;
  name: string;
  title?: string;
}

const Input = ({ category, name, title }: InputProps) => {
  const { data, setData } = useStore();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-sm font-medium">
        {title ?? name}
      </label>
      <input
        type="number"
        className="input input-bordered w-full"
        value={data[category] ? (data[category] as any)[name] ?? "" : ""}
        onChange={(e) =>
          setData({
            ...data,
            [category]: { ...(data[category] as object), [name]: Number(e.target.value) },
          })
        }
      />
    </div>
  );
};

export default Input;