import React from "react";
import FormCustomIbadah from "./FormCustomIbadah";
import ListIbadah from "./ListIbadah";
import type { Activity, ActivityStatus } from "~/types/type";

const ListIbadahView = ({
  addCustomActivity,
  allActivities,
  activitiesData,
  editingNoteId,
  toggleIbadah,
  removeCustomActivity,
  updateNote,
  setEditingNoteId,
}: {
  addCustomActivity: (name: string) => void;
  allActivities: Activity[];
  activitiesData: Record<string, ActivityStatus>;
  editingNoteId: string | null;
  toggleIbadah: (id: string) => void;
  removeCustomActivity: (id: string, e: React.MouseEvent) => void;
  updateNote: (id: string, note: string) => void;
  setEditingNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <>
      <FormCustomIbadah addCustomActivityParent={addCustomActivity} />
      <ListIbadah
        allActivities={allActivities}
        activitiesData={activitiesData}
        editingNoteId={editingNoteId}
        toggleIbadah={toggleIbadah}
        removeCustomActivity={removeCustomActivity}
        updateNote={updateNote}
        setEditingNoteId={setEditingNoteId}
      />
    </>
  );
};

export default ListIbadahView;
