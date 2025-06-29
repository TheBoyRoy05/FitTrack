import { EMPTY_DATA } from "@/Utils/consts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ArrowsProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const btnClass =
  "fixed top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 cursor-pointer text-white flex items-center justify-center shadow-lg transition-colors";

const PrevArrow = ({ page, setPage }: ArrowsProps) => {
  if (page === 0) return null;

  return (
    <button className={`${btnClass} left-[5vw]`} onClick={() => setPage((prev) => prev - 1)}>
      <IoIosArrowBack />
    </button>
  );
};

const NextArrow = ({ page, setPage }: ArrowsProps) => {
  if (page === Object.keys(EMPTY_DATA).length - 1) return null;

  return (
    <button className={`${btnClass} right-[5vw]`} onClick={() => setPage((prev) => prev + 1)}>
      <IoIosArrowForward />
    </button>
  );
};

export { PrevArrow, NextArrow };
