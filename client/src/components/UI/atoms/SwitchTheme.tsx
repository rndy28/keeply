import styled, { css } from "styled-components";
import { IconMoon, IconSun } from "@tabler/icons";
import { BaseSmallContainer } from "components/UI/atoms/shared";

const Container = styled(BaseSmallContainer)``;

const Moon = styled(IconMoon)`
  transition: transform 300ms ease;
  ${(p) =>
    p.theme.state !== "dark" &&
    css`
      opacity: 0;
      position: absolute;
      transform: translateY(-100%);
    `}
`;

const Sun = styled(IconSun)`
  transition: transform 300ms ease;
  ${(p) =>
    p.theme.state !== "light" &&
    css`
      opacity: 0;
      position: absolute;
      transform: translateY(100%);
    `}
`;

type Props = {
  handleSwitch: () => void;
};

const SwitchTheme = ({ handleSwitch }: Props) => {
  return (
    <Container onClick={handleSwitch}>
      <Sun size={20} />
      <Moon size={20} />
    </Container>
  );
};

export default SwitchTheme;
