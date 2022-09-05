import { DARK_COLORS, LIGHT_COLOR } from "libs/constants/colors";
import { useTheme } from "libs/contexts/ThemeContext";
import styled, { css } from "styled-components";
import { IconDropletOff } from "@tabler/icons";
import { motion } from "framer-motion";
import { shortVariant } from "libs/animation";

const baseColor = css<{ isSelected?: boolean }>`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  border: 2px solid ${(p) => (p.isSelected ? "#5E81AC" : "transparent")};
  cursor: pointer;
  ${(p) =>
    !p.isSelected &&
    css`
      &:hover {
        border-color: ${(p) => (p.theme.state === "light" ? "#4C566A" : "#D8DEE9")};
      }
    `}
`;

const Container = styled(motion.div)`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${(p) => p.theme.colorBackground};
  padding: 0.5rem;
  position: absolute;
  width: 100%;
  bottom: -6.5rem;
  border-radius: ${(p) => p.theme.borderRadius};
  @media (min-width: 450px) {
    width: fit-content;
  }
  @media (min-width: 523px) {
    bottom: -4rem;
  }
  @media (min-width: 526px) {
    right: 0;
  }
`;

const Color = styled.div<{ color: string; isSelected?: boolean }>`
  ${baseColor}
  background-color: #${(p) => p.color};
`;

const DefaultColor = styled.div<{ isSelected?: boolean }>`
  border-color: ${(p) => p.theme.colorBorder};
  ${baseColor}
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  onSelect: (id: number | null) => void;
  currentColorId: number | null;
}

const Palette = ({ onSelect, currentColorId }: Props) => {
  const theme = useTheme();

  const COLORS = theme.state === "light" ? LIGHT_COLOR : DARK_COLORS;

  return (
    <Container variants={shortVariant} initial="hidden" animate="visible" exit="exit">
      <DefaultColor role="button" isSelected={!currentColorId} onClick={() => onSelect(null)}>
        <IconDropletOff size={20} color={theme.state === "light" ? "#4C566A" : "#D8DEE9"} />
      </DefaultColor>
      {COLORS.map(({ code, id }) => (
        <Color key={id} role="button" color={code} isSelected={id === currentColorId} onClick={() => onSelect(id)} />
      ))}
    </Container>
  );
};

export default Palette;
