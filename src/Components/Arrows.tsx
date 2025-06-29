import { EMPTY_DATA } from "@/Utils/consts";
import { saveData, saveMeasurements, saveWorkout } from "@/Utils/functions";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useStore } from "@/Hooks/useStore";
import { Data, Workout } from "@/Utils/types";

interface ArrowsProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const btnClass =
  "fixed top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 cursor-pointer text-white flex items-center justify-center shadow-lg transition-colors";

const save = (data: Data, page: number) => {
  if (page === 0) saveMeasurements(data.measurements);
  else saveWorkout((Object.values(data) as Workout[])[page]);
  saveData(data);
};

const PrevArrow = ({ page, setPage }: ArrowsProps) => {
  const { data } = useStore();
  if (page === 0) return null;

  return (
    <button
      className={`${btnClass} left-[5vw]`}
      onClick={() => {
        save(data, page);
        setPage((prev) => prev - 1);
      }}
    >
      <IoIosArrowBack />
    </button>
  );
};

const NextArrow = ({ page, setPage }: ArrowsProps) => {
  const { data } = useStore();
  if (page === Object.keys(EMPTY_DATA).length - 1) return null;

  return (
    <button
      className={`${btnClass} right-[5vw]`}
      onClick={() => {
        save(data, page);
        setPage((prev) => prev + 1);
      }}
    >
      <IoIosArrowForward />
    </button>
  );
};

export { PrevArrow, NextArrow };
