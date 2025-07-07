import { THRESHOLD } from "@/Utils/consts";
import { useStore } from "./useStore";
import { CVWorkout } from "@/Utils/types";

export const useChart = (workout: CVWorkout) => {
  const { anglesRef } = useStore();

  return {
    series: [
      { name: "Left", data: Object.values(anglesRef.current).map(([left]) => left) },
      { name: "Right", data: Object.values(anglesRef.current).map(([, right]) => right) },
    ],
    options: {
      chart: { type: "line" as const },
      stroke: { width: 3 },
      tooltip: { theme: "dark" },
      xaxis: { axisTicks: { show: false }, labels: { show: false } },
      yaxis: {
        decimalsInFloat: 0,
        labels: { style: { colors: ["#ddd"] } },
        title: {
          text: "Angle",
          style: { color: "#ddd", fontSize: "12px", fontWeight: "bold" },
        },
      },
      legend: { show: true, labels: { colors: ["#ddd", "#ddd"] } },
      annotations: {
        yaxis: [
          { y: THRESHOLD[workout][0], borderColor: "#FF4500", strokeDashArray: 0 },
          { y: THRESHOLD[workout][1], borderColor: "#FF4500", strokeDashArray: 0 },
        ],
      },
    }
  };
};