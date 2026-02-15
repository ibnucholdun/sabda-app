"use client";

import React from "react";
import HeroIbadahTracker from "./HeroIbadahTracker";
import ListIbadahView from "./ListIbadahView";
import TrackerSkeleton from "./TrackerSkeleton";
import MuhasabahSection from "./MuhasabahSection";
import HistoryProgress from "./HistoryProgress";
import DetailHistoryPerDay from "./DetailHistoryPerDay";
import DataManagement from "./DataManagement";
import ModalResetData from "./ModalResetData";
import ToasView from "./ToasView";
import { useIbadahTracker } from "~/hooks/useIbadahTracker";

const IbadahTrackerView = () => {
  const { state, actions } = useIbadahTracker();

  if (state.isLoading) return <TrackerSkeleton />;

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-6 pb-12 duration-500">
      {state.toast.visible && <ToasView toast={state.toast} />}

      {state.isResetModalOpen && (
        <ModalResetData
          setIsResetModalOpen={actions.setIsResetModalOpen}
          handleResetData={actions.handleResetData}
        />
      )}
      <HeroIbadahTracker
        dayName={state.dayName}
        dateNum={state.dateNum}
        monthName={state.monthName}
        progress={state.progress}
        completedCount={state.completedCount}
        allActivities={state.allActivities}
      />
      <ListIbadahView
        allActivities={state.allActivities}
        activitiesData={state.activitiesData}
        addCustomActivity={actions.addCustomActivity}
        editingNoteId={state.editingNoteId}
        toggleIbadah={actions.toggleIbadah}
        removeCustomActivity={actions.removeCustomActivity}
        updateNote={actions.updateNote}
        setEditingNoteId={actions.setEditingNoteId}
      />

      <MuhasabahSection
        todayRecord={state.todayRecord}
        todayKey={state.todayKey}
        setHistory={actions.setHistory}
        handleGetAIReflectionRespon={actions.handleGetAIReflectionRespon}
        isGeneratingAI={state.isGeneratingAI}
      />

      <HistoryProgress
        setViewDate={actions.setViewDate}
        viewMonthName={`${state.viewDate.toLocaleString("id-ID", { month: "short" })} ${state.viewDate.getFullYear()}`}
        monthData={state.monthData}
        handleDayClick={actions.handleDayClick}
      />

      <DataManagement
        handleExportData={actions.handleExportData}
        handleImportData={actions.handleImportData}
        setIsResetModalOpen={actions.setIsResetModalOpen}
      />

      {state.selectedDayDetail && (
        <DetailHistoryPerDay
          selectedDayDetail={state.selectedDayDetail}
          setSelectedDayDetail={actions.setSelectedDayDetail}
        />
      )}
    </div>
  );
};

export default IbadahTrackerView;
