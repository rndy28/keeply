import {
  IconArchive,
  IconCalendarTime,
  IconPalette,
  IconPencil,
  IconPinned,
  IconX,
} from "@tabler/icons";
import Modal from "components/templates/Modal";
import { Button, Label } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import DateTimePicker from "components/UI/molecules//DateTimePicker";
import LabelForm from "components/UI/molecules/LabelForm";
import Palette from "components/UI/molecules/Palette";
import TextBox from "components/UI/molecules/TextBox";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateNoteMutation, useEditNoteMutation } from "generated/graphql";
import { formVariant } from "libs/animation";
import { DARK_COLORS, LIGHT_COLOR } from "libs/constants/colors";
import { useModal } from "libs/contexts/ModalContext";
import { useTheme } from "libs/contexts/ThemeContext";
import { useFocus } from "libs/hooks/useFocus";
import type { INote, LabelT } from "libs/types";
import { formatDate } from "libs/utils/formatDate";
import { stringDateToNumber } from "libs/utils/stringDateToNumber";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled(motion.div)`
  min-height: 9rem;
  width: 90%;
  max-width: 30rem;
  position: relative;
`;

const IconContainer = styled.div<{ isActive?: boolean }>`
  min-height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: ${(p) => p.theme.borderRadius};
  transition: border 250ms ease;
  cursor: pointer;
  background-color: ${(p) =>
    p.isActive ? (p.theme.state === "light" ? "#D8DEE9" : "#4C566A") : "transparent"};
  &:hover {
    border-color: ${(p) => p.theme.colorBorder};
  }
`;

const Form = styled.form`
  min-height: inherit;
  border-radius: ${(p) => p.theme.borderRadius};
`;

const Footer = styled(Flex)`
  min-height: 3rem;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  padding-inline: 0.5rem;
  transition: all 250ms ease;
  & svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const Body = styled.div<{ background?: string }>`
  min-height: inherit;
  padding: 0.5rem;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  transition: all 250ms ease;
  position: relative;
  background-color: ${(p) => typeof p.background === "string" && `#${p.background}`};
  & ~ ${Footer} {
    background-color: ${(p) => typeof p.background === "string" && `#${p.background}`};
  }
  & div:nth-of-type(2),
  & div:nth-of-type(2) > div {
    min-height: inherit;
  }
`;

const LastUpdated = styled.span`
  display: inline-block;
  width: fit-content;
  text-align: end;
  font-size: 0.913rem;
  position: absolute;
  right: 1rem;
`;

const CloseIcon = styled(IconX)`
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: color 250ms ease;
  &:hover {
    color: ${(p) => (p.theme.state === "light" ? "#828997" : "#979ba3")};
  }
`;

type LabelTWithIncluded = LabelT & {
  included: boolean;
};

type NoteWithLabelsIncluded = Omit<INote, "labels" | "createdAt"> & {
  labels: LabelTWithIncluded[];
};

const initialNote = {
  title: "",
  text: "",
  pinned: false,
  archived: false,
  indexColor: null as number | null,
  labels: [] as LabelTWithIncluded[],
  time: null as string | null,
};

type OpenType = "palette" | "label" | "time";

const NoteFormModal = (data: NoteWithLabelsIncluded) => {
  const location = useLocation();

  const [note, setNote] = useState<typeof initialNote | NoteWithLabelsIncluded>(initialNote);

  const [{ fetching: createFetching }, createNote] = useCreateNoteMutation();
  const [{ fetching: editFetching }, editNote] = useEditNoteMutation();
  const [open, setOpen] = useState<OpenType | undefined>();
  const [labelName, setLabelName] = useState("");
  const { onModalClose } = useModal();
  const theme = useTheme();

  const COLORS = theme.state === "light" ? LIGHT_COLOR : DARK_COLORS;

  const isDataExist = Object.keys(data).length > 0;

  const titleRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useFocus(bodyRef, note.text);
  useFocus(titleRef, note.title);

  const onCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (note.title === "" || note.text === "") return;

    const { labels, ...rest } = note;

    const labelId = labels.map(({ id }) => ({ id: +id }));

    if ("id" in rest) {
      const { id, updatedAt, ...noteInput } = rest;
      const { data } = await editNote({
        noteId: +id,
        noteInput: { ...noteInput },
        labelId,
      });

      if (typeof data !== "undefined") {
        onModalClose();
      }
    } else {
      const { data } = await createNote({ noteInput: rest, labelId });

      if (typeof data !== "undefined") {
        onModalClose();
      }
    }
  };

  const onChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setNote((prev) => ({
      ...prev,
      [target.id as string]: target.textContent!,
    }));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Escape") {
      onModalClose();
    }
  };

  const onAction = (keyName: "archived" | "pinned") => {
    return () => {
      setNote((prev) =>
        keyName === "archived"
          ? { ...prev, [keyName]: !prev[keyName], pinned: false }
          : { ...prev, [keyName]: !prev[keyName], archived: false }
      );
    };
  };

  const onBackgroundChange = (currentColorId: number | null) => {
    setNote((prev) => ({ ...prev, indexColor: currentColorId }));
  };

  const onOpen = (keyName: OpenType) => {
    return () => {
      setOpen((prev) => (prev !== keyName ? keyName : undefined));
    };
  };

  const onIncludeLabel = (id: string, name: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setNote((prev) => ({
        ...prev,
        labels: e.target.checked
          ? [...prev.labels, Object.create({ id, name, included: true })]
          : prev.labels.filter((label) => label.id !== id),
      }));
    };
  };

  const onRemoveLabel = (id: string) => {
    return () => {
      setNote((prev) => ({
        ...prev,
        labels: prev.labels.filter((label) => label.id !== id),
      }));
    };
  };

  const onGetLabelName = (name: string) => {
    return () => {
      setLabelName((prev) => (prev !== name ? name : ""));
    };
  };

  const onGetReminderTime = (data: { date: Date; time: string }) => {
    const dateNumber = stringDateToNumber(
      formatDate(data.date, undefined, {
        dateStyle: "short",
      }) +
        " " +
        data.time
    );
    const isoDate = new Date(dateNumber).toISOString();

    setNote((prev) => ({ ...prev, time: isoDate }));
    setOpen(undefined);
  };

  useEffect(() => {
    if (isDataExist) {
      setNote(() => ({
        ...data,
        labels: data.labels.map((label) => ({ ...label, included: true })),
      }));
    }
  }, []);

  useEffect(() => {
    if (!note.title || note.text!) {
      titleRef?.current?.focus();
    }
  }, []);

  return (
    <Modal>
      <Container variants={formVariant} initial="hidden" animate="visible" exit="exit">
        <CloseIcon onClick={onModalClose} />
        <Form onKeyDown={onKeyDown} onSubmit={onCreate}>
          <Body
            background={
              typeof note.indexColor === "number"
                ? COLORS[note.indexColor - 1].code // id start from 1
                : undefined
            }
          >
            <TextBox
              aria-label="title"
              id="title"
              value={note.title}
              onChange={onChange}
              placeholder="Title"
              fontSize={1.5}
              ref={titleRef}
            />
            <TextBox
              aria-label="text"
              id="text"
              value={note.text}
              onChange={onChange}
              placeholder="Body"
              ref={bodyRef}
            />
            {"updatedAt" in note && note?.updatedAt && (
              <LastUpdated>
                last edited{" "}
                {formatDate(note.updatedAt, undefined, {
                  day: "numeric",
                  month: "short",
                })}
              </LastUpdated>
            )}
            {note.labels.length > 0 && (
              <Flex alignItems="center" flexWrap="wrap" gap={0.5} css="max-width: 15rem;">
                {note.labels.map((label, idx) => (
                  <Label
                    key={idx}
                    role="button"
                    onMouseEnter={onGetLabelName(label.name)}
                    onMouseLeave={onGetLabelName("")}
                  >
                    {label.name}
                    {labelName === label.name && (
                      <IconX
                        size={15}
                        css="position: relative; bottom: 2px"
                        onClick={onRemoveLabel(label.id)}
                      />
                    )}
                  </Label>
                ))}
              </Flex>
            )}
            {note.time && (
              <Label>
                {formatDate(note.time, undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Label>
            )}
          </Body>
          <Footer justifyContent="space-between" alignItems="center">
            <Flex gap={1} role="toolbar">
              <IconContainer role="button" onClick={onAction("pinned")} isActive={note.pinned}>
                <IconPinned />
              </IconContainer>
              <IconContainer role="button" onClick={onAction("archived")} isActive={note.archived}>
                <IconArchive />
              </IconContainer>
              {location.pathname.includes("reminders") && (
                <IconContainer role="button" onClick={onOpen("time")}>
                  <IconCalendarTime />
                </IconContainer>
              )}
              <IconContainer role="button" onClick={onOpen("palette")}>
                <IconPalette />
              </IconContainer>
              <IconContainer role="button" onClick={onOpen("label")}>
                <IconPencil />
              </IconContainer>
            </Flex>
            {isDataExist ? (
              <Button size="sm" loading={editFetching} variant="neutral" type="submit">
                update
              </Button>
            ) : (
              <Button size="sm" loading={createFetching} variant="neutral" type="submit">
                create
              </Button>
            )}
          </Footer>
        </Form>
        <AnimatePresence>
          {open === "palette" && (
            <Palette key="palette" onSelect={onBackgroundChange} currentColorId={note.indexColor} />
          )}
          {open === "label" && (
            <LabelForm onIncluded={onIncludeLabel} includedLabels={note.labels} />
          )}
          {open === "time" && (
            <DateTimePicker onSuccessSubmit={onGetReminderTime} selectedTime={note.time} />
          )}
        </AnimatePresence>
      </Container>
    </Modal>
  );
};

export default NoteFormModal;
