import { useContext } from "react";
import { PressureDataContext } from "../context/pressureDataContext";

export const usePressureDataContext = () => {
  const { setChartData, setStreamString, chartData } =
    useContext(PressureDataContext);

  const resetData = () => {
    setStreamString("");
    setChartData({});
  };

  return {
    resetData,
  };
};
