"use client"
import useDashboardStore from "@/app/dashboard/dashboard.store";
import { UpdateAppSettingReq } from "@/app/settings/definitions";
import { updateAppSettingAction } from "@/app/settings/setting-actions";
import { useEffect } from "react";
import { showErrorMessage, showSuccessMessage } from "../Toast";

const SpeedSetting = () => {

  //Get value from store
  const {
    rpm,
    speedSetting,
    isCharging,

    setParking,
    setRpm,
    setSpeedSetting,
    setMotorStatusIndicator
  } = useDashboardStore();

  const speedStep: number = 200;
  const settingCode = "APP_SETTING";

  useEffect(() => {
    convertRpmToSpeedSetting(rpm);
  }, [rpm]);

  const convertRpmToSpeedSetting = async (val: number) => {
    //console.log("-----val/speedStep---", val / speedStep);
    const s = val / speedStep + "";
    setSpeedSetting(parseInt(s));

    setParking(false);
    if (val == 0) {
      setParking(true);
    }
  };


  const handleSpeedSettingChange = async (val: string) => {
    const inputValue = parseFloat(val);
    // Check if the parsed value is a valid number
    if (!isNaN(inputValue)) {
      const sp = inputValue * speedStep;
      setSpeedSetting(inputValue);
      setRpm(sp);

      setParking(false);
      if (sp == 0) {
        setParking(true);
      }

      //if RPM > 599 show indicator
      setMotorStatusIndicator(false);
      if (sp > 599) {
        setMotorStatusIndicator(true);
      }

      handleAppSettingUpdateSubmit("APP_SETTING_RPM", sp + "");
    }
  };

  // Handler to update readOnly state after submission
  const handleAppSettingUpdateSubmit = (code: string, val: string) => {
    const req: UpdateAppSettingReq = {
      parentCode: settingCode,//constant value for this function.
      code: code,
      configValue: val,
    };

    updateAppSettingAction(req).then((res) => {
      //console.log("---------updateAppSettingAction-----", res);
      if (res.error) {
        showErrorMessage(res.error); // Show error on the client
      } else if (res.data) {
        showSuccessMessage("updated successfully.");
      }
    });

  };


  return (
    <div className="ms-12 mt-2">
      <div className="ms-10 text-xs text-white mb-1">MOTOR SPEED SETTING</div>
      <input type="range" disabled={isCharging}  min={0} max="4" value={speedSetting} onChange={(e) => handleSpeedSettingChange(e.target.value)} className="range range-lgaccent-white w-64 h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer" step="1" />

      <div className="flex w-full justify-between text-xs text-white">
        <span className="ms-0">OFF</span>
        <span className="ms-0">1</span>
        <span className="ms-4">2</span>
        <span className="ms-4">3</span>
        <span className="ms-4">4</span>
      </div>
    </div>
  );
};

export default SpeedSetting;
