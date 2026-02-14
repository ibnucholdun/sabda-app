import React from "react";
import FormCustomIbadah from "./FormCustomIbadah";
import ListIbadah from "./ListIbadah";
import type { Activity } from "~/types/type";

const ListIbadahView = ({
  addCustomActivity,
  newActivityName,
  setNewActivityName,
  allActivities,
  activitiesData,
  editingNoteId,
  toggleIbadah,
  removeCustomActivity,
  updateNote,
  setEditingNoteId,
}: {
  addCustomActivity: (e: React.FormEvent) => void;
  newActivityName: string;
  setNewActivityName: (name: string) => void;
  allActivities: Activity[];
  activitiesData: any;
  editingNoteId: string | null;
  toggleIbadah: (id: string) => void;
  removeCustomActivity: (id: string, e: React.MouseEvent) => void;
  updateNote: (id: string, note: string) => void;
  setEditingNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <>
      <FormCustomIbadah
        addCustomActivity={addCustomActivity}
        newActivityName={newActivityName}
        setNewActivityName={setNewActivityName}
      />
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
