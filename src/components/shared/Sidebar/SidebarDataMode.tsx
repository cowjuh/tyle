import Button from "../Atoms/Button";
import { CheckBoxAndLabel } from "../../Containers";
import Checkbox from "../Atoms/Checkbox";
import { useContext } from "react";
import { PressureDataContext } from "../../context/pressureDataContext";
import { usePressureDataContext } from "../../hooks/usePressureDataContext";
import { DataModeContext } from "../../context/dataModeContext";

const SidebarDataMode = () => {
  const { setAutoscroll, chartData } = useContext(PressureDataContext);
  const { setShowChart, showChart } = useContext(DataModeContext);
  const { resetData } = usePressureDataContext();
  const handleAutoscroll = (checked: boolean) => {
    console.log(checked);
    setAutoscroll(checked);
  };

  const handleShowChart = (checked: boolean) => {
    setShowChart(checked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(chartData));
  };
  return (
    <>
      <Checkbox label="Autoscroll" onChange={handleAutoscroll} />
      <Checkbox
        label="Show Graph"
        onChange={handleShowChart}
        defaultValue={showChart}
      />
      <Button onClick={handleCopy}>Copy JSON</Button>
      <Button onClick={resetData} variant={"secondary"}>
        Clear Output
      </Button>
    </>
  );
};

export default SidebarDataMode;
