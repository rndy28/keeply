import React from "react";
import styled from "styled-components";

export const BaseSmallContainer = styled.div`
  border: 2px solid transparent;
  cursor: pointer;
  height: 2.3rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) =>
    p.theme.state === "light" ? p.theme.colorAccentText : p.theme.colorAccent};
  color: ${(p) => (p.theme.state === "light" ? p.theme.colorAccent : p.theme.colorAccentText)};
  transition: border-color 250ms ease;
  border-radius: 0.3rem;
  &:hover {
    border-color: ${(p) => (p.theme.state === "light" ? "#ECEFF4" : "#4c566a")};
  }
`;

interface IFlex {
  direction: React.CSSProperties["flexDirection"];
  justifyContent: React.CSSProperties["justifyContent"];
  alignItems: React.CSSProperties["alignItems"];
  flex: React.CSSProperties["flex"];
  flexWrap: React.CSSProperties["flexWrap"];
  gap: number;
}

export const Flex = styled.div<Partial<IFlex>>`
  display: flex;
  flex-direction: ${(p) => p.direction};
  justify-content: ${(p) => p.justifyContent};
  align-items: ${(p) => p.alignItems};
  gap: ${(p) => p.gap}rem;
  flex-wrap: ${(p) => p.flexWrap};
  flex: ${(p) => p.flex};
`;
