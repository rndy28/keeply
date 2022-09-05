import State from "components/templates/State";
import { Loader } from "components/UI/atoms";
import Note from "components/UI/molecules/Note";
import { breakpointColumns } from "libs/constants/breakpointColumns";
import { useSearch } from "libs/contexts/SearchContext";
import type { INote } from "libs/types";
import { memo } from "react";
import Masonry from "react-masonry-css";
import "styles/masonry.css";
import { Container, containerAdditionalCss } from "./style";

interface Props {
  notes?: INote[];
}

const Trash = ({ notes }: Props) => {
  const { query } = useSearch();

  if (!notes)
    return (
      <Container css={containerAdditionalCss}>
        <Loader />
      </Container>
    );

  const queriedNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) || note.text.toLowerCase().includes(query.toLowerCase()),
  );

  if (query.length > 0 && queriedNotes.length === 0)
    return (
      <Container css={containerAdditionalCss}>
        <State title="Not Found" description="Use capital or spell more precisely" />
      </Container>
    );

  if (query.length === 0 && queriedNotes.length === 0)
    return (
      <Container css={containerAdditionalCss}>
        <State title="Empty" description="No notes in trash" />
      </Container>
    );

  return (
    <Container>
      <Masonry className="masonry-grid" columnClassName="masonry-grid_column" breakpointCols={breakpointColumns}>
        {queriedNotes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </Masonry>
    </Container>
  );
};

const trashMemo = memo(Trash);

export default trashMemo;
