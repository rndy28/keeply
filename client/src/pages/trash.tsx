import Layout from "components/templates/Layout";
import { useTrashQuery, useClearTrashMutation } from "generated/graphql";
import TrashList from "components/UI/organism/list/Trash";
import { INote } from "libs/types";
import { Button } from "components/UI/atoms";
import { css } from "styled-components";
import { useModal } from "libs/contexts/ModalContext";

const trash = css`
  margin-block: 0.5rem;
  font-style: italic;
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & span {
    position: relative;
    top: 3px;
  }
`;

const Trash = () => {
  const [{ data }] = useTrashQuery();
  const [, clearTrash] = useClearTrashMutation();
  const { onModalOpen, onModalClose } = useModal();

  return (
    <Layout>
      <div css={trash}>
        <span>Notes in Trash are deleted after 7 days.</span>
        {data?.trash && data.trash.length > 0 && (
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
      <TrashList notes={data?.trash as INote[]} />
    </Layout>
  );
};

export default Trash;
