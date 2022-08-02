import Layout from "components/templates/Layout";
import Archived from "components/UI/organism/list/Archived";
import NoteList from "components/UI/organism/list/Notes";

import { useNotesQuery, useReminderSubscription } from "generated/graphql";
import { useModal } from "libs/contexts/ModalContext";
import type { INote } from "libs/types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Notes = () => {
  const location = useLocation();

  const [{ data: reminderData, fetching: fetchingReminder }] = useReminderSubscription();

  const [{ data }] = useNotesQuery({
    variables: {
      reminder: location.pathname.includes("reminders") ? true : undefined,
    },
  });
  const { onModalOpen } = useModal();

  useEffect(() => {
    if (location.pathname.includes("/notes") || location.pathname.includes("/reminders")) {
      const onOpen = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "c") {
          onModalOpen("NOTE");
        }
      };

      window.addEventListener("keydown", onOpen);

      return () => {
        window.removeEventListener("keydown", onOpen);
      };
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!reminderData) return;
    alert(reminderData.reminder.title);
  }, [fetchingReminder, reminderData]);

  return (
    <Layout>
      {location.pathname.includes("archived") ? (
        <Archived notes={data?.notes as INote[]} />
      ) : (
        <NoteList notes={data?.notes as INote[]} />
      )}
    </Layout>
  );
};

export default Notes;
