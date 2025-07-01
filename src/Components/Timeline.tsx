import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { capitalize } from "@/Utils/functions";

interface TimelineProps {
  events: Record<string, boolean>;
  page: number;
  setPage: (page: number) => void;
}

const Timeline = ({ events, page, setPage }: TimelineProps) => {
  return (
    <ul className="timeline mx-auto -mb-10">
      {Object.entries(events).map(([event, completed], index) => (
        <li key={index}>
          {index !== 0 && <hr className={completed ? "bg-primary" : ""} />}
          <button
            className={`timeline-start timeline-box ${completed ? "bg-primary" : ""} ${
              page === index ? "border-2 border-white" : ""
            } m-4 text-sm cursor-pointer`}
            onClick={() => {
              setPage(index);
            }}
          >
            {capitalize(event)}
          </button>
          <div className="timeline-middle">
            {completed ? (
              <FaCheckCircle className="mx-1 h-5 w-5 text-primary" />
            ) : (
              <FaCircle className="mx-1 h-5 w-5" />
            )}
          </div>
          {index !== Object.entries(events).length - 1 && (
            <hr className={completed ? "bg-primary" : ""} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
