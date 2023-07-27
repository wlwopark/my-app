"use client";
import styled, { css } from "styled-components";
import { CellColumn } from "./Cell";
import { toFormattedDate } from "@/utils/date";
import { useRef } from "react";

interface Props {
  selectedIndex: number;
  selectionCount: number;
  date: Date;
  dashed?: "true";
  onClickColumn: (date: Date) => void;
  isAutoHoverActivated: boolean;
  isHoverDisabled?: boolean;
}

export default function ActiveColumn({
  date,
  dashed,
  selectedIndex,
  selectionCount,
  onClickColumn,
  isAutoHoverActivated,
  isHoverDisabled = false,
}: Props) {
  const colId = date.toString();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <CellColumn dashed={dashed} id={colId} ref={ref}>
        <Box
          autohover={isAutoHoverActivated ? "true" : undefined}
          text={toFormattedDate({ date, formatPattern: "HH:mm" })}
          onClick={() => onClickColumn(date)}
          selectedindex={selectedIndex}
          count={selectionCount}
          disabled={isHoverDisabled ? "true" : undefined}
        />
      </CellColumn>
    </>
  );
}

const Box = styled.div<{
  text?: string;
  selectedindex: number;
  count: number;
  autohover?: "true";
  disabled?: "true";
}>`
  width: 95%;
  margin: auto;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  text-align: center;

  ${({ disabled, autohover, text }) =>
    !disabled &&
    css`
      &:hover {
        height: ${autohover ? "200%" : "100%"};
        border: 1px solid #e4e7f4;
        background-color: #e5e2f7;
        box-shadow: 0 0.5rem 1.5rem rgba(20, 15, 51, 0.15);
        z-index: 1;

        &:before {
          content: "${text}";
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 4px;
        }
      }
    `}

  &:not(:hover) {
    height: 95%;
  }

  ${({ selectedindex, count, autohover }) =>
    selectedindex >= 0
      ? `color: black; 
    background-color: white;
    box-shadow: 0 0.5rem 1.5rem rgba(20, 15, 51, 0.15);
    border: 1px solid #503cc8;

    ${
      selectedindex > 0
        ? `border-top: none;
        border-radius: 0 0 6px 6px;
        &:hover {
            border-radius: ${autohover ? "6px" : "0 0 6px 6px"};
        }
        &:before {
            content: "튜터 선택";
        }
        `
        : count > 1
        ? `border-bottom: none;
        border-radius: 6px 6px 0 0;
        &:hover {
            border-radius: ${autohover ? "6px" : "6px 6px 0 0"};
        }
        `
        : `border-radius: 6px;  
        &:hover {
            border-radius: 6px;
        }
        &:before {
            content: "튜터 선택";
        }`
    }
    `
      : `border-radius: 6px;`}
`;
