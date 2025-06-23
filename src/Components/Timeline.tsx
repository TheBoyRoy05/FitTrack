import { FaCheckCircle, FaCircle } from "react-icons/fa";

const Timeline = ({ events }: { events: Record<string, boolean> }) => {
  return (
    <ul className="timeline mx-auto">
      {Object.entries(events).map(([event, completed], index) => (
        <li key={index}>
          {index !== 0 && <hr className={completed ? "bg-primary" : ""} />}
          <div className="timeline-start timeline-box">{event}</div>
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
