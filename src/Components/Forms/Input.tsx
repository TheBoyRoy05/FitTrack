import { Data } from "@/Utils/types";
import { useStore } from "@/Hooks/useStore";

interface InputProps {
  category: keyof Data;
  name: string;
  title?: string;
  type?: "number" | "text";
}

const Input = ({ category, name, title, type = "number" }: InputProps) => {
  const { data, setData } = useStore();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-lg font-medium">
        {title ?? name}
      </label>
      <input
        type={type}
        className="input input-bordered w-full"
        value={
          data[category] ? (data[category] as Record<string, number | string>)[name] ?? "" : ""
        }
        onChange={(e) =>
          setData({
            ...data,
            [category]: {
              ...(data[category] as object),
              [name]: type === "number" ? Number(e.target.value) : e.target.value,
            },
          })
        }
      />
    </div>
  );
};

export default Input;
