import Layout from "components/templates/Layout";
import { useClearTrashMutation, useNotesQuery } from "generated/graphql";
import TrashList from "components/UI/organism/list/Trash";
import { INote } from "libs/types";
import { Button } from "components/UI/atoms";
import { css } from "styled-components";
import { useModal } from "libs/contexts/ModalContext";
import { useState, useEffect } from "react";

const trashLayout = css`
  margin-block: 0.5rem;
  font-style: italic;
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  margin-inline: auto;
  text-align: center;
  & span {
    position: relative;
    top: 3px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Trash = () => {
  const [, clearTrash] = useClearTrashMutation();
  const [{ data, fetching }] = useNotesQuery();
  const { onModalOpen, onModalClose } = useModal();
  const [trash, setTrash] = useState<INote[] | undefined>();

  useEffect(() => {
    if (!fetching && data) {
      setTrash(
        data.notes.filter((note) => note.trashed && !note.pinned && !note.archived) as INote[]
      );
    }
  }, [data, fetching]);
  return (
    <Layout>
      <div css={trashLayout}>
        <span>Notes in Trash are deleted after 7 days.</span>
        {trash && trash.length > 0 && (
          <Button
            variant="neutral"
            size="sm"
            type="button"
            onClick={() => {
              const props = {
                title: "Empty trash?",
                message: "All notes in Trash will be permanently deleted.",
                onDelete: async () => {
                  await clearTrash();
                  onModalClose();
                },
                onCancel: () => {
                  onModalClose();
                },
              };
              onModalOpen("WARNING", props);
            }}
          >
            clear trash
          </Button>
        )}
      </div>
      <TrashList notes={trash} />
    </Layout>
  );
};

export default Trash;
