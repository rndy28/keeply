import { Greeting, Hamburger, Profile, SwitchTheme } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import { useMeQuery } from "generated/graphql";
import { useSidebar } from "libs/contexts/SidebarContext";
import { useChangeTheme } from "libs/contexts/ThemeContext";

const Nav = () => {
  const switchTheme = useChangeTheme();
  const { expanded, onToggle } = useSidebar();

  const [{ data }] = useMeQuery();

  return (
    <Flex alignItems="center" justifyContent="space-between" gap={1} as="nav">
      <Flex alignItems="center" gap={1}>
        <Hamburger aria-controls="sidebar" aria-expanded={expanded} onClick={onToggle} />
        <Greeting name={data?.me?.name ?? "User"} />
      </Flex>
      <Flex alignItems="center" gap={1}>
        <SwitchTheme handleSwitch={switchTheme} />
        {data?.me?.picture ? <Profile src={data.me?.picture} size="md" /> : <Profile size="md" />}
      </Flex>
    </Flex>
  );
};

export default Nav;
