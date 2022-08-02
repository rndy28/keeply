import {
  IconArchive,
  IconCalendarTime,
  IconLogout,
  IconNotes,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { Close, Logo } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import { useLogoutMutation } from "generated/graphql";
import { useModal } from "libs/contexts/ModalContext";
import { useSidebar } from "libs/contexts/SidebarContext";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const links = [
  {
    id: 1,
    name: "notes",
    icon: IconNotes,
  },
  {
    id: 2,
    name: "reminders",
    icon: IconCalendarTime,
  },
  {
    id: 3,
    name: "labels",
    icon: IconPencil,
  },
  {
    id: 4,
    name: "archived",
    icon: IconArchive,
  },
  {
    id: 5,
    name: "trash",
    icon: IconTrash,
  },
];

const Nav = styled.nav`
  width: inherit;
  height: inherit;
  padding: 1rem 0.8rem 0.5rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Items = styled.ul`
  display: inherit;
  flex-direction: inherit;
  gap: 1rem;
  &:nth-of-type(1) > li:nth-of-type(1) span {
    top: 13px;
  }
`;

const Item = styled.li<{ isExpanded: boolean }>`
  width: 100%;
  & .link {
    display: flex;
    align-items: center;
    padding-left: 0.67rem;
    cursor: pointer;
    width: inherit;
    height: 2.5rem;
    border-radius: 0.4rem;
    font-size: 0.813rem;
    font-weight: 500;
    position: relative;
    transition: all 250ms ease;
    &.active {
      background-color: ${(p) => p.theme.colorAccent};
      color: ${(p) => p.theme.colorAccentText};
    }
    &:hover:not(&.active) {
      color: ${(p) => (p.theme.state === "light" ? "#828997" : "#979ba3")};
    }
  }
  span {
    position: absolute;
    top: 14px;
    font-size: 0.95rem;
    left: 3rem;
    font-weight: 700;
    @media (min-width: 800px) {
      opacity: ${(p) => (p.isExpanded ? "1" : "0")};
    }
  }
`;
const Wrapper = styled(Flex)`
  width: 88%;
  margin-inline: auto;
  @media (min-width: 800px) {
    & .close {
      display: none;
    }
  }
`;

const Container = styled.aside<{ isExpanded: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  transform: translateX(${(p) => (p.isExpanded ? "0" : "-100%")});
  transition: transform 300ms ease-in-out;
  height: 100%;
  background-color: ${(p) => p.theme.colorBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18rem;
  padding-block: 1.7rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  @media (min-width: 800px) {
    box-shadow: none;
    transform: translateX(0);
    width: 100%;
    max-width: ${(p) => (p.isExpanded ? "18rem" : "4.5rem")};
    border-right: 1px solid ${(p) => p.theme.colorBorder};
    transition: max-width 150ms cubic-bezier(0.4, 0, 0.2, 1);
    & ${Wrapper} {
      ${(p) =>
        !p.isExpanded &&
        css`
          width: 100%;
          justify-content: center;
        `}
    }
  }
`;

const Sidebar = () => {
  const { onModalOpen } = useModal();
  const [, logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { sidebarRef, expanded, onClose } = useSidebar();

  const onLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <Container isExpanded={expanded} ref={sidebarRef}>
      <Wrapper alignItems="center" justifyContent="space-between">
        <Logo type={window.innerWidth <= 850 ? "full" : expanded ? "full" : "initial"} />
        <Close handleClose={onClose} />
      </Wrapper>

      <Nav>
        <Items>
          {links.map(({ id, name, icon: Icon }) =>
            name.includes("labels") ? (
              <Item key={id} isExpanded={expanded} onClick={() => onModalOpen("LABELS")}>
                <a className="link">
                  <Icon />
                  <span>{name}</span>
                </a>
              </Item>
            ) : (
              <Item key={id} isExpanded={expanded}>
                <NavLink to={`/${name}`} className="link">
                  <Icon />
                  <span>{name}</span>
                </NavLink>
              </Item>
            )
          )}
        </Items>
        <Item isExpanded={expanded}>
          <a onClick={onLogout} className="link">
            <IconLogout />
            <span>Logout</span>
          </a>
        </Item>
      </Nav>
    </Container>
  );
};

export default Sidebar;
