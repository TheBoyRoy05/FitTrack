import { THRESHOLD } from "@/Utils/consts";
import { useStore } from "./useStore";
import { CVWorkout } from "@/Utils/types";
import { useMemo } from "react";

export const useChart = (workout: CVWorkout) => {
  const { anglesRef } = useStore();

  const chartData = useMemo(() => {
    const values = Object.values(anglesRef.current).slice(-150);
    return {
      series: [
        { name: "Left", data: values.map(([left]) => left) },
        {
          name: "Average",
          data: values.map(([left, right]) => (left + right) / 2),
        },
        { name: "Right", data: values.map(([, right]) => right) },
      ],
      options: {
        chart: {
          type: "line" as const,
          animations: {
            enabled: false, // Disable animations for better performance
          },
          redrawOnWindowResize: false,
          redrawOnParentResize: false,
        },
        title: { text: "Angle Tracking", align: "center", style: { color: "#fff", fontSize: "24px", fontWeight: "bold" } },
        stroke: { width: [3, 2, 3], dashArray: [0, 2, 0] },
        tooltip: { theme: "dark" },
        xaxis: {
          axisTicks: { show: false },
          labels: { show: false },
          title: { text: "Time", style: { color: "#ddd", fontSize: "16px", fontWeight: "bold" } },
        },
        yaxis: {
          decimalsInFloat: 0,
          labels: { style: { colors: ["#ddd"] } },
          title: {
            text: "Angle",
            offsetX: -5,
            style: { color: "#ddd", fontSize: "16px", fontWeight: "bold" },
          },
        },
        legend: { show: true, labels: { colors: ["#ddd", "#ddd", "#ddd"] } },
        annotations: {
          yaxis: [
            { y: THRESHOLD[workout][0], borderColor: "#FF4500", strokeDashArray: 0 },
            { y: THRESHOLD[workout][1], borderColor: "#FF4500", strokeDashArray: 0 },
          ],
        },
      },
    };
  }, [anglesRef.current, workout]);

  return chartData;
};
