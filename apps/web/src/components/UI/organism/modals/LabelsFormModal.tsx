import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons";
import Modal from "components/templates/Modal";
import { Button, Input, InputLabel, Loader } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import WarningModal from "components/UI/organism/modals/WarningModal";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateLabelMutation, useDeleteLabelMutation, useEditLabelMutation, useLabelsQuery } from "@keeply/api";
import { shortVariant } from "libs/animation";
import { useModal } from "libs/contexts/ModalContext";
import { ellipsis } from "libs/utils/ellipsis";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled(motion.div)`
  background-color: ${(p) => p.theme.colorBackground};
  min-height: fit-content;
  width: 100%;
  max-width: 25rem;
  padding-block: 1.3rem 1rem;
  & svg {
    cursor: pointer;
    &:hover {
      color: ${(p) => (p.theme.state === "light" ? "#828997" : "#979ba3")};
    }
  }
`;

const Create = styled.button`
  cursor: pointer;
  width: 1.8rem;
  height: 1.8rem;
  background-color: transparent;
  color: ${(p) => p.theme.colorText};
`;

const Line = styled.span`
  width: 100%;
  height: 2px;
  background-color: ${(p) => p.theme.colorBorder};
  display: block;
  margin-block: 1.5rem;
`;

const LabelContainer = styled.div`
  min-height: 2.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  cursor: pointer;
  background-color: ${(p) => p.theme.colorBackground};
  color: ${(p) => (p.theme.state === "light" ? "#4c566a" : "#D8DEE9")};
  & label {
    position: relative;
    top: 3px;
  }
`;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 10rem;
  margin-top: 1rem;
  padding-right: 0.5rem;
  &::-webkit-scrollbar-track {
    background: ${(p) => (p.theme.state === "light" ? p.theme.colorAccentText : p.theme.colorAccent)};
  }
`;

const LoaderContainer = styled.div`
  min-height: 5rem;
  position: relative;
  margin-top: 1.5rem;
`;

interface LabelForm {
  labelName: string;
  editedLabelName: string;
}

const LabelsFormModal = () => {
  const [{ fetching: createLabelFetching }, createLabel] = useCreateLabelMutation();
  const [, deleteLabel] = useDeleteLabelMutation();
  const [, editLabel] = useEditLabelMutation();

  const { onModalClose } = useModal();
  const { register, handleSubmit, reset } = useForm<LabelForm>();
  const [action, setAction] = useState<{
    type: "edit" | "delete";
    id: string;
  } | null>(null);

  const [{ fetching, data }] = useLabelsQuery();

  const onCreate: SubmitHandler<Pick<LabelForm, "labelName">> = async ({ labelName }) => {
    const { data } = await createLabel({ name: labelName });
    if (typeof data !== "undefined") {
      reset();
    }
  };

  const onEdit: SubmitHandler<Pick<LabelForm, "editedLabelName">> = async ({ editedLabelName }) => {
    if (action && action.type === "edit") {
      const { data } = await editLabel({
        name: editedLabelName,
        labelId: +action.id,
      });
      if (typeof data !== "undefined") {
        reset();
        setAction(null);
      }
    }
  };

  const onCancel = () => {
    setAction(null);
  };

  const onAction = (id: string, type: "edit" | "delete") => {
    return () => {
      setAction({ type, id });
    };
  };

  const onLabelDeleted = async () => {
    if (action && action.type === "delete") {
      await deleteLabel({ labelId: +action.id });

      setAction(null);
    }
  };
  return (
    <>
      <Modal>
        <Container variants={shortVariant} initial="hidden" animate="visible" exit="exit">
          <div
            css={`
              padding-inline: 1rem;
            `}
          >
            <Modal.Title
              css={`
                margin-bottom: 0.5rem;
              `}
            >
              Edit labels
            </Modal.Title>
            <Flex
              alignItems="center"
              gap={1}
              as="form"
              onSubmit={handleSubmit(onCreate)}
              css={`
                position: relative;
              `}
            >
              <Input
                type="text"
                placeholder="Create new label"
                variant="neutral"
                elementSize="md"
                autoComplete="off"
                {...register("labelName")}
              />
              {createLabelFetching ? (
                <Loader
                  size="sm"
                  css={`
                    position: relative;
                    top: 0;
                    left: 0;
                    transform: translate(0, 0);
                  `}
                />
              ) : (
                <Create type="submit">
                  <IconCheck />
                </Create>
              )}
            </Flex>

            {fetching && !data ? (
              <LoaderContainer>
                <Loader size="md" />
              </LoaderContainer>
            ) : (
              data?.labels &&
              data.labels.length > 0 && (
                <Wrapper>
                  {data?.labels.map(({ id, name }) =>
                    action?.type === "edit" && action?.id === id ? (
                      <Flex alignItems="center" gap={1} as="form" onSubmit={handleSubmit(onEdit)} key={id}>
                        <Input
                          type="text"
                          variant="secondary"
                          elementSize="md"
                          autoComplete="off"
                          placeholder="Edit label"
                          autoFocus
                          defaultValue={name}
                          {...register("editedLabelName")}
                        />
                        <Flex gap={0.5} alignItems="center">
                          <Create
                            type="submit"
                            css={`
                              position: relative;
                              top: 2px;
                            `}
                          >
                            <IconCheck size={19} />
                          </Create>
                          <IconX onClick={onCancel} size={19} />
                        </Flex>
                      </Flex>
                    ) : (
                      <LabelContainer key={id}>
                        <InputLabel>{ellipsis(name, 50)}</InputLabel>
                        <Flex gap={0.8} alignItems="center">
                          <IconTrash size={18} onClick={onAction(id, "delete")} />
                          <IconPencil size={18} onClick={onAction(id, "edit")} />
                        </Flex>
                      </LabelContainer>
                    ),
                  )}
                </Wrapper>
              )
            )}
          </div>
          <Line />
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={onModalClose}
            css={`
              margin-inline: auto 1rem;
            `}
          >
            Close
          </Button>
        </Container>
      </Modal>
      <AnimatePresence>
        {action && action.type === "delete" && (
          <WarningModal
            title="Are you sure?"
            message="We’ll delete this label and remove it from all of your notes. Your notes won’t be deleted."
            onCancel={onCancel}
            onDelete={onLabelDeleted}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default LabelsFormModal;
