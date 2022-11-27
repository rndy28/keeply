import "react-calendar/dist/Calendar.css";
import { IconChevronDown } from "@tabler/icons";
import { Button, Input, InputError } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { shortVariant } from "libs/animation";
import { formatDate } from "libs/utils/formatDate";
import { stringDateToNumber } from "libs/utils/stringDateToNumber";
import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import { determineTime } from "libs/utils/determineTime";

const Container = styled(motion.form)`
  position: absolute;
  border-radius: ${(p) => p.theme.borderRadius};
  overflow-x: hidden;
  overflow-y: auto;
  right: 0;
  background-color: ${(p) => p.theme.colorBackground};
  min-height: 5rem;
  width: 100%;
  max-width: 18rem;
  margin-block: 1rem;
  @media (min-width: 600px) {
    left: 8rem;
  }
`;

const CalendarContainer = styled(motion.div)`
  position: absolute;
  z-index: 2;
  top: -0.2rem;
  left: 1rem;
  & .react-calendar {
    box-shadow: ${(p) => p.theme.boxShadow};

    max-width: 20rem;
    background-color: ${(p) => p.theme.colorBackground};
    color: ${(p) => p.theme.colorText};
    border: none;
    border-radius: ${(p) => p.theme.borderRadius};
    font-size: 0.9rem;
    &__navigation > *,
    &__year-view__months > *,
    &__decade-view__years > *,
    &__century-view__decades > * {
      color: ${(p) => p.theme.colorText};
    }
    &__navigation button {
      border-radius: ${(p) => p.theme.borderRadius} !important;
      &:hover:not(&:disabled),
      &:active,
      &:focus {
        background-color: ${(p) => (p.theme.state === "light" ? "#ECEFF4" : "#4C566A")} !important;
      }
      &:disabled {
        background-color: ${(p) => p.theme.colorBackground};
      }
    }
    &__tile {
      &:hover {
        background-color: ${(p) => (p.theme.state === "light" ? "#ECEFF4" : "#4C566A")};
      }
      &:disabled {
        background-color: ${(p) => (p.theme.state === "light" ? "#ECEFF4" : "#262b35")};
        color: ${(p) => p.theme.colorText};
      }
    }
    &__tile--active {
      background-color: #5e81ac !important;
      color: #eceff4;
    }
    &__month-view__days__day:not(&__month-view__days__day--neighboringMonth) {
      color: ${(p) => p.theme.colorText};
    }
    &__tile--now {
      background-color: transparent;
      &:hover {
        background-color: ${(p) => (p.theme.state === "light" ? "#ECEFF4" : "#4C566A")};
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 1rem 1rem 0.5rem 1rem;
`;

const DatePlaceholder = styled(Flex)`
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: ${(p) => p.theme.colorText};
  border-bottom: 1px solid ${(p) => (p.theme.state === "light" ? "#D8DEE9" : "#4c566a")};
  border-radius: 0;

  &:hover,
  &:focus {
    border-color: ${(p) => (p.theme.state === "light" ? "#adb2ba" : "#707888")};
  }
`;

const IconArrow = styled(IconChevronDown)`
  transition: transform 250ms ease;
  transform: rotate(${(p) => (p["aria-selected"] ? "180deg" : "0")});
`;

function getInitialTime() {
  let initialTime = "";
  const currentTime = determineTime();
  switch (currentTime) {
    case "Morning":
      initialTime = "12:00 PM";
      break;
    case "Noon":
      initialTime = "6:00 PM";
      break;
    case "Evening":
      initialTime = "8:00 PM";
      break;
  }
  return initialTime;
}

interface Props extends HTMLMotionProps<"form"> {
  onSuccessSubmit?: (datetime: { date: Date; time: string }) => void;
  selectedTime?: string | null;
}

const DateTimePicker = ({ onSuccessSubmit, selectedTime, ...props }: Props) => {
  const date = new Date();

  const initialTime = useMemo(() => getInitialTime(), []);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [datetime, setDatetime] = useState({
    date,
    time: selectedTime
      ? formatDate(selectedTime, undefined, {
          hour: "numeric",
          minute: "numeric",
        }).split(",")[1]
      : initialTime,
  });
  const [error, setError] = useState("");

  const currentTime = datetime.date.toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

  const onDateChange = (value: Date, _: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) return setError("required");

    // if nan or current value less than current time
    // throw errror
    const isTimeNan = isNaN(stringDateToNumber(`${formatDate(date, undefined, { dateStyle: "short" })} ${value}`));
    const numTime = stringDateToNumber(`${formatDate(date, undefined, { dateStyle: "short" })} ${value}`);
    const currentTimeInNum = stringDateToNumber(
      `${formatDate(date, undefined, {
        dateStyle: "short",
      })} ${currentTime}`,
    );

    if (isTimeNan || numTime < currentTimeInNum) {
      setError("invalid time");
    } else {
      setError("");
      setDatetime((prev) => ({ ...prev, time: value }));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (datetime.time.length === 0) return setError("required");
    if (error.length > 0) return;

    if (onSuccessSubmit) {
      onSuccessSubmit(datetime);
    }
  };

  return (
    <>
      <AnimatePresence>
        {openCalendar && (
          <CalendarContainer id="calendar" variants={shortVariant} initial="hidden" animate="visible" exit="exit">
            <Calendar
              minDate={date}
              defaultValue={date}
              onChange={onDateChange}
              onClickDay={() => setOpenCalendar(false)}
            />
          </CalendarContainer>
        )}
      </AnimatePresence>
      <Container
        variants={shortVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSave}
        {...props}
      >
        <Title>Pick date and time</Title>
        <DatePlaceholder alignItems="center" justifyContent="space-between" onClick={() => setOpenCalendar((c) => !c)}>
          <span>
            {formatDate(datetime.date, undefined, {
              dateStyle: "medium",
            })}
          </span>
          <IconArrow aria-controls="calendar" aria-selected={openCalendar} size={20} />
        </DatePlaceholder>
        <Input
          type="text"
          elementSize="md"
          variant="secondary"
          aria-errormessage="time-error"
          aria-invalid={error.length > 0}
          defaultValue={datetime.time.includes("custom") ? undefined : datetime.time}
          placeholder="Add a time"
          onChange={onTimeChange}
        />
        {error.length > 0 && (
          <InputError
            id="time-error"
            css={`
              margin-left: 1rem;
            `}
          >
            {error}
          </InputError>
        )}
        <Button
          type="submit"
          size="sm"
          variant="primary"
          css={`
            margin: 0.5rem 1rem 0.5rem auto;
          `}
          disabled={error ? true : undefined}
        >
          save
        </Button>
      </Container>
    </>
  );
};

export default DateTimePicker;
