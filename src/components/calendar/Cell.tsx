"use client";

import { addDate } from "@/utils/date";
import styled from "styled-components";
import ActiveColumn from "./ActiveColumn";
import { skippedHours } from "./WeeklyCalendar";

interface Props {
  date: Date;
  selectedDates: Date[];
  isBlocked: (value: Date) => boolean;
  onClickCell: (date: Date) => void;
  hiddenDash?: boolean;
  type: "pck20" | "pck40";
}

export default function Cell({
  date,
  selectedDates,
  isBlocked,
  onClickCell,
  hiddenDash = false,
  type,
}: Props) {
  const later = addDate({ date, duration: { minutes: 30 } });
  const dashed = hiddenDash ? undefined : "true";
  const selectedIndex = (col: Date) =>
    selectedDates.findIndex((d) => d.getTime() === col.getTime());

  return (
    <Container>
      {isBlocked(later) ? (
        <>
          <BlockedColumn dashed={dashed} />
          <BlockedColumn />
        </>
      ) : (
        <>
          {isBlocked(date) ? (
            <BlockedColumn dashed={dashed} />
          ) : (
            <ActiveColumn
              date={date}
              dashed={dashed}
              onClickColumn={onClickCell}
              selectedIndex={selectedIndex(date)}
              selectionCount={selectedDates.length}
              isAutoHoverActivated={type === "pck40"}
            />
          )}
          <ActiveColumn
            date={later}
            onClickColumn={onClickCell}
            selectedIndex={selectedIndex(later)}
            selectionCount={selectedDates.length}
            isAutoHoverActivated={type === "pck40"}
            isHoverDisabled={
              type === "pck40" &&
              skippedHours.some(({ from }) => from - 1 === date.getHours())
            }
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid #e4e7f4;
  width: 82px;
`;

export const CellColumn = styled.div<{
  dashed?: "true";
}>`
  height: 30px;
  color: black;
  font-size: 12px;

  ${({ dashed }) => dashed && `border-bottom: 1px dashed #e4e7f4;`}
`;

const BlockedColumn = styled(CellColumn)`
  background-color: #eff1f9;
  ${({ dashed }) => dashed && `border-bottom: 1px dashed white`}
`;
