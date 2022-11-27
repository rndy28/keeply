import { IconDotsVertical } from "@tabler/icons";
import { Label } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import Menu from "components/UI/molecules/Menu";
import { AnimatePresence } from "framer-motion";
import {
  useMoveNoteToTrashMutation,
  useEditNoteMutation,
  useRestoreNoteFromTrashMutation,
  useDeleteNoteForeverMutation,
} from "generated/graphql";
import { DARK_COLORS, LIGHT_COLOR } from "libs/constants/colors";
import { useModal } from "libs/contexts/ModalContext";
import { useTheme } from "libs/contexts/ThemeContext";
import { useOutsideClick } from "libs/hooks/useOutsideClick";
import type { INote, ReadOnlyArray } from "libs/types";
import { ellipsis } from "libs/utils/ellipsis";
import { formatDate } from "libs/utils/formatDate";
import { useRef, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.article<{ background?: string }>`
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  outline: none;
  ${(p) =>
    typeof p.background === "undefined" &&
    css`
      border: 1px solid ${p.theme.colorBorder};
      transition: all 250ms ease;
      &:hover {
        border-color: ${(p) => (p.theme.state === "light" ? "#adb2ba" : "#4C566A")};
      }
    `}
  ${(p) =>
    typeof p.background === "string" &&
    css`
      background-color: #${p.background};
    `}
`;

const Wrapper = styled(Flex)`
  margin-bottom: 0.5rem;
  position: relative;
`;

const Title = styled.h1`
  word-wrap: break-word;
  overflow: hidden;
  max-width: 17rem;
`;

const Body = styled.p`
  word-wrap: break-word;
`;

const Reminder = styled.time<{ isNotified: boolean }>`
  font-size: 0.813rem;
  display: block;
  width: fit-content;
  height: fit-content;
  text-align: end;
  border: 1px solid ${(p) => p.theme.colorBorder};
  border-radius: 4px;
  padding: 6px 5px 0 5px;
  text-decoration: ${(p) => p.isNotified && "line-through"};
`;

const Note = ({ id, text, updatedAt, title, labels, archived, pinned, time, indexColor, trashed }: INote) => {
  const [isMenuExpanded, setExpandedMenu] = useState(false);
  const [, editNote] = useEditNoteMutation();
  const [, moveNoteToTrash] = useMoveNoteToTrashMutation();
  const [, deleteNoteForever] = useDeleteNoteForeverMutation();
  const [, restoreNote] = useRestoreNoteFromTrashMutation();

  const { onModalOpen, onModalClose } = useModal();
  const theme = useTheme();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const now = new Date().toISOString();

  const COLORS = theme.state === "light" ? LIGHT_COLOR : DARK_COLORS;
  const options = !trashed
    ? ([pinned ? "unpin" : "pin", archived ? "unarchive" : "archive", "edit", "remove"] as const)
    : (["restore", "remove forever"] as const);

  useOutsideClick(menuRef, (target) => {
    if (target.classList.contains("options")) return;
    setExpandedMenu(false);
  });

  const onUnHide = () => {
    setExpandedMenu((c) => !c);
  };

  const onAction = async (id: string, type: typeof options[number]) => {
    switch (type) {
      case "pin":
        await editNote({
          noteId: +id,
          noteInput: { pinned: !pinned, archived: false },
        });
        break;
      case "unpin":
        await editNote({
          noteId: +id,
          noteInput: { pinned: false, archived: false },
        });
        break;
      case "archive":
        await editNote({
          noteId: +id,
          noteInput: { archived: !archived, pinned: false },
        });
        break;
      case "unarchive":
        await editNote({
          noteId: +id,
          noteInput: { archived: false, pinned: false },
        });
        break;
      case "edit": {
        const data = {
          id,
          text,
          updatedAt,
          title,
          labels,
          archived,
          pinned,
          time,
          indexColor,
        };
        onModalOpen("NOTE", data);

        break;
      }
      case "remove":
        await moveNoteToTrash({ noteId: +id });

        break;
      case "remove forever": {
        const props = {
          title: "Are you sure?",
          message: "You want to delete this note",
          onDelete: async () => {
            await deleteNoteForever({ noteId: +id });
            onModalClose();
          },
          onCancel: () => {
            onModalClose();
          },
        };
        onModalOpen("WARNING", props);
        break;
      }

      case "restore":
        await restoreNote({ noteId: +id });
        break;
    }
    setExpandedMenu(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setExpandedMenu(false);
    }
  };

  return (
    <Container
      tabIndex={-1}
      onKeyDown={onKeyDown}
      background={typeof indexColor === "number" ? COLORS[indexColor - 1].code : undefined}
    >
      <div onKeyDown={onKeyDown}>
        <Wrapper justifyContent="space-between">
          <Title>{ellipsis(title, 50)}</Title>
          <IconDotsVertical
            color={theme.state === "light" ? theme.colorAccent : theme.colorAccentText}
            aria-controls="menu"
            aria-expanded={isMenuExpanded}
            onClick={onUnHide}
            css="cursor: pointer;"
            className="options"
          />
          <AnimatePresence>
            {isMenuExpanded && (
              <Menu<typeof options, ReadOnlyArray<typeof options>>
                id="menu"
                aria-expanded={isMenuExpanded}
                noteId={id}
                onAction={onAction}
                items={options}
                menuRef={menuRef}
              />
            )}
          </AnimatePresence>
        </Wrapper>
        <Body>{ellipsis(text, 500)}</Body>
      </div>
      {labels.length > 0 && (
        <Flex alignItems="center" flexWrap="wrap" gap={0.5} css="max-width: 12rem">
          {labels.map((label, index) => (
            <Label key={index}>{label.name}</Label>
          ))}
        </Flex>
      )}

      {time && typeof time === "string" && (
        <Reminder dateTime={time} isNotified={time < now}>
          {formatDate(time, undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Reminder>
      )}
    </Container>
  );
};

export default Note;
