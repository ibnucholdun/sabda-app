"use client";

import TitleSelector from "./TitleSelector";
import ButtonTasbih from "./ButtonTasbih";
import ResetButton from "./ResetButton";
import SettingTasbih from "./SettingTasbih";
import { useTasbih } from "~/hooks/useTasbih";

const TasbihView = () => {
  const { state, actions } = useTasbih();

  return (
    <div className="animate-in zoom-in-95 flex flex-col items-center justify-center space-y-8 py-8 duration-500">
      <TitleSelector
        tasbihTitle={state.tasbihTitle}
        setIsDzikirModalOpen={actions.setIsDzikirModalOpen}
      />

      <ButtonTasbih
        tasbihCount={state.tasbihCount}
        tasbihLimit={state.tasbihLimit}
        progress={state.progress}
        isFull={state.isFull}
        handleTasbihClick={actions.handleTasbihClick}
      />

      <ResetButton handleTasbihReset={actions.handleTasbihReset} />

      {state.isDzikirModalOpen && (
        <SettingTasbih
          isDzikirModalOpen={state.isDzikirModalOpen}
          setIsDzikirModalOpen={actions.setIsDzikirModalOpen}
          tasbihTitle={state.tasbihTitle}
          setTasbihTitle={actions.setTasbihTitle}
          tasbihLimit={state.tasbihLimit}
          setTasbihLimit={actions.setTasbihLimit}
          customLimit={state.customLimit}
          setCustomLimit={actions.setCustomLimit}
          customDzikir={state.customDzikir}
          setCustomDzikir={actions.setCustomDzikir}
          saveCustomLimit={actions.saveCustomLimit}
          saveCustomDzikir={actions.saveCustomDzikir}
          dzikirList={state.dzikirList}
        />
      )}
    </div>
  );
};

export default TasbihView;
