import Header from "components/UI/organism/Header";
import Sidebar from "components/UI/organism/Sidebar";
import { SearchProvider } from "libs/contexts/SearchContext";
import { useSidebar } from "libs/contexts/SidebarContext";
import styled from "styled-components";

const Container = styled.div<{ isSidebarExpanded: boolean }>`
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: ${(p) => (p.isSidebarExpanded ? "18rem" : "4.5rem")} 1fr;
  }
`;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { expanded } = useSidebar();

  return (
    <Container isSidebarExpanded={expanded}>
      <div></div>
      <Sidebar />
      <main>
        <SearchProvider>
          <Header />
          {children}
        </SearchProvider>
      </main>
    </Container>
  );
};

export default Layout;
