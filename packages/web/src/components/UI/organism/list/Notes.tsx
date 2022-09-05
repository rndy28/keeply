import State from "components/templates/State";
import { Loader } from "components/UI/atoms";
import Note from "components/UI/molecules/Note";
import { breakpointColumns } from "libs/constants/breakpointColumns";
import { useSearch } from "libs/contexts/SearchContext";
import type { INote } from "libs/types";
import { memo } from "react";
import Masonry from "react-masonry-css";
import { useLocation } from "react-router-dom";
import { Container, containerAdditionalCss, Title } from "./style";
import "styles/masonry.css";

interface Props {
  notes?: INote[];
}

const Notes = ({ notes }: Props) => {
  const { query } = useSearch();
  const location = useLocation();

  if (!notes)
    return (
      <Container css={containerAdditionalCss}>
        <Loader />
      </Container>
    );

  const queriedNotes = notes.filter(
    (note) =>
      (location.pathname.includes("/reminders") ? note.time : !note.time) &&
      (note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.text.toLowerCase().includes(query.toLowerCase())) &&
      !note.archived &&
      !note.trashed,
  );

  const pinned = queriedNotes.filter((note) => note.pinned);
  const others = queriedNotes.filter((note) => !note.pinned);

  if (query.length > 0 && others.length === 0 && pinned.length === 0)
    return (
      <Container css={containerAdditionalCss}>
        <State title="Not Found" description="Use capital or spell more precisely" />
      </Container>
    );
  if (query.length === 0 && others.length === 0 && pinned.length === 0)
    return (
      <Container css={containerAdditionalCss}>
        <State
          title="Empty"
          description={`You can create new ${location.pathname.replace("/", "").replace("s", "")}, just click
                the button on the top right corner or just press ctrl + c`}
        />
      </Container>
    );

  if (pinned.length === 0)
    return (
      <Container>
        <Masonry className="masonry-grid" columnClassName="masonry-grid_column" breakpointCols={breakpointColumns}>
          {queriedNotes.map((note) => (
            <Note key={note.id} {...note} />
          ))}
        </Masonry>
      </Container>
    );

  return (
    <Container>
      {pinned.length > 0 && (
        <>
          <Title>Pinned</Title>
          <Masonry className="masonry-grid" columnClassName="masonry-grid_column" breakpointCols={breakpointColumns}>
            {pinned.map((note) => (
              <Note key={note.id} {...note} />
            ))}
          </Masonry>
        </>
      )}
      {others.length > 0 && (
        <>
          <Title>Others</Title>
          <Masonry className="masonry-grid" columnClassName="masonry-grid_column" breakpointCols={breakpointColumns}>
            {others.map((note) => (
              <Note key={note.id} {...note} />
            ))}
          </Masonry>
        </>
      )}
    </Container>
  );
};

const memoNoteList = memo(Notes);

export default memoNoteList;
