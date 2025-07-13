import { useEffect, useState } from "react";

interface TimerProps {
  timems?: number;
  title: string;
  startTime?: number;
  isRunning?: boolean;
}

const Timer = ({ timems, title, startTime, isRunning = false }: TimerProps) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [finalElapsedMs, setFinalElapsedMs] = useState<number | null>(null);

  useEffect(() => {
    if (!startTime) {
      setElapsedMs(timems || 0);
      setFinalElapsedMs(null);
      return;
    }

    if (isRunning) {
      setFinalElapsedMs(null);
      const updateTimer = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        setElapsedMs(elapsed);
      };

      updateTimer();

      const interval = setInterval(updateTimer, 10);
      return () => clearInterval(interval);
    } else {
      if (finalElapsedMs === null) {
        const now = Date.now();
        const elapsed = now - startTime;
        setFinalElapsedMs(elapsed);
        setElapsedMs(elapsed);
      }
    }
  }, [startTime, isRunning, timems, finalElapsedMs]);

  const hours = Math.floor((elapsedMs / 60 / 60 / 1000) % 24);
  const minutes = Math.floor((elapsedMs / 60 / 1000) % 60);
  const seconds = Math.floor((elapsedMs / 1000) % 60);
  const milliseconds = Math.floor(elapsedMs % 1000);

  return (
    <div className="flex flex-col gap-2 items-center bg-base-300 rounded-lg p-4">
      <span className="text-center text-3xl font-bold">{title}</span>
      <div className="flex justify-center items-end gap-2 text-2xl font-semibold">
        <span>{hours.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{minutes.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{seconds.toString().padStart(2, "0")}</span>
        <span className="text-sm -ml-[6px] pb-[1px]">
          .{milliseconds.toString().padStart(3, "0")}
        </span>
      </div>
    </div>
  );
};

export default Timer;
