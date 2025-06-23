import { EMPTY_DATA } from "@/Utils/consts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ArrowsProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Arrows = ({ page, setPage }: ArrowsProps) => {
  return (
    <div className="flex justify-between">
      {page > 0 && (
        <button className="btn hover:btn-primary" onClick={() => setPage((prev) => prev - 1)}>
          <IoIosArrowBack />
          Previous
        </button>
      )}
      <div className="w-full" />
      {page < Object.keys(EMPTY_DATA).length - 1 && (
        <button className="btn hover:btn-primary" onClick={() => setPage((prev) => prev + 1)}>
          Next
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default Arrows;
