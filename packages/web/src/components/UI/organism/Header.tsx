import { Flex } from "components/UI/atoms/shared";
import AddButton from "components/UI/molecules/AddButton";
import Nav from "components/UI/molecules/Nav";
import SearchBar from "components/UI/molecules/SearchBar";
import { useModal } from "libs/contexts/ModalContext";
import { useSearch } from "libs/contexts/SearchContext";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  gap: 1rem;
  & .searchbar-addbutton-wrapper {
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: center;
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const { onModalOpen } = useModal();
  const { handleDebounce } = useSearch();

  return (
    <Container>
      <Nav />
      {location.pathname.includes("notes") && (
        <Flex
          className="searchbar-addbutton-wrapper"
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
          gap={1}
        >
          <SearchBar onChange={handleDebounce} />
          <AddButton placeholder="note" size="lg" onClick={() => onModalOpen("NOTE")} />
        </Flex>
      )}
      {location.pathname.includes("reminders") && (
        <Flex
          className="searchbar-addbutton-wrapper"
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
          gap={1}
        >
          <SearchBar onChange={handleDebounce} />
          <AddButton placeholder="reminder" size="lg" onClick={() => onModalOpen("NOTE")} />
        </Flex>
      )}
      {(location.pathname.includes("archived") || location.pathname.includes("trash")) && (
        <SearchBar onChange={handleDebounce} />
      )}
    </Container>
  );
};

export default Header;
