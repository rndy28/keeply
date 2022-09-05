import State from "components/templates/State";
import { Loader } from "components/UI/atoms";
import Note from "components/UI/molecules/Note";
import { useSearch } from "libs/contexts/SearchContext";
import type { INote } from "libs/types";
import { memo } from "react";
import { Container, containerAdditionalCss } from "./style";
import Masonry from "react-masonry-css";
import { breakpointColumns } from "libs/constants/breakpointColumns";

interface Props {
  notes?: INote[];
}

const Archived = ({ notes }: Props) => {
  const { query } = useSearch();

  if (!notes)
    return (
      <Container css={containerAdditionalCss}>
        <Loader />
      </Container>
    );

  const queriedNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.text.toLowerCase().includes(query.toLowerCase())) &&
      note.archived &&
      !note.trashed,
  );

  const archived = queriedNotes.filter((note) => !note.pinned);

  if (query.length > 0 && archived.length === 0)
    return (
      <Container css={containerAdditionalCss}>
        <State title="Not Found" description="Use capital or spell more precisely" />
      </Container>
    );

  if (query.length === 0 && archived.length === 0)
    return (
      <Container css={containerAdditionalCss}>
        <State title="Empty" description="Your archived notes/reminders will appear here" />
      </Container>
    );

  return (
    <Container>
      <Masonry
        className="masonry-grid"
        columnClassName="masonry-grid_column"
        breakpointCols={breakpointColumns}
      >
        {queriedNotes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </Masonry>
    </Container>
  );
};

const memoArchived = memo(Archived);

export default memoArchived;
