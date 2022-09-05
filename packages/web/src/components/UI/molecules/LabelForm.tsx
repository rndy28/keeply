import { IconCirclePlus, IconSearch } from "@tabler/icons";
import { Checkbox, Input, InputLabel, Loader } from "components/UI/atoms";
import { motion } from "framer-motion";
import { useCreateLabelMutation, useLabelsQuery } from "generated/graphql";
import { shortVariant } from "libs/animation";
import type { LabelT } from "libs/types";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled(motion.div)`
  max-width: 13rem;
  position: absolute;
  border-radius: ${(p) => p.theme.borderRadius};
  background-color: ${(p) => p.theme.colorBackground};
  overflow: hidden;
  margin-top: 1rem;
  left: 10rem;
  & input::placeholder,
  & input {
    font-size: 0.813rem;
  }
  & > div {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 15vh;
  &::-webkit-scrollbar-track {
    background: ${(p) =>
      p.theme.state === "light" ? p.theme.colorAccentText : p.theme.colorAccent};
  }
`;

const LabelContainer = styled.div`
  min-height: 2.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  padding-inline: 1rem;
  & .label {
    position: relative;
    top: 3px;
    font-size: 0.813rem;
  }
`;

interface Props {
  onIncluded: (id: string, name: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  includedLabels: LabelT[];
}

const LabelForm = ({ onIncluded, includedLabels }: Props) => {
  const [, createLabel] = useCreateLabelMutation();
  const [query, setQuery] = useState("");
  const [{ fetching, data }] = useLabelsQuery();
  const [labels, setLabels] = useState<LabelT[]>([]);

  const filteredLabels = [
    ...new Map([...labels, ...includedLabels].map((note) => [note.id, note])).values(),
  ].filter((label) => label.name.toLowerCase().includes(query.toLowerCase()));

  const onKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredLabels.length === 0) {
      e.preventDefault();
      await onCreateLabel();
    }
  };

  const onLabelSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [query],
  );

  const onCreateLabel = async () => {
    const { data } = await createLabel({ name: query });

    if (typeof data !== "undefined") {
      setQuery("");
    }
  };

  useEffect(() => {
    if (!fetching && data) {
      setLabels(data.labels);
    }
  }, [data, fetching]);

  return (
    <Container variants={shortVariant} initial="hidden" animate="visible" exit="exit">
      <Input
        type="text"
        elementSize="md"
        variant="secondary"
        placeholder="Enter label name"
        withIcon={{ position: "right" }}
        value={query}
        onChange={onLabelSearch}
        onKeyDown={onKeydown}
      >
        <IconSearch size={18} />
      </Input>
      {fetching && !data ? (
        <div
          css={`
            min-height: 5rem;
            position: relative;
          `}
        >
          <Loader size="md" />
        </div>
      ) : (
        <>
          {filteredLabels.length > 0 && (
            <Wrapper>
              {filteredLabels.map((label, idx) => (
                <LabelContainer
                  key={idx}
                  css={`
                    justify-content: flex-end;
                    flex-direction: row-reverse;
                  `}
                  tabIndex={idx}
                >
                  <InputLabel htmlFor={label.name} className="label">
                    {label.name}
                  </InputLabel>
                  <Checkbox
                    checked={"included" in label}
                    name={label.name}
                    onChange={onIncluded(label.id, label.name)}
                  />
                </LabelContainer>
              ))}
            </Wrapper>
          )}
          {filteredLabels.length === 0 && (
            <LabelContainer onClick={onCreateLabel}>
              <IconCirclePlus size={20} />
              <InputLabel className="label">{query}</InputLabel>
            </LabelContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default LabelForm;
