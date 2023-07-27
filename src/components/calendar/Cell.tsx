"use client";

import { addDate } from "@/utils/date";
import styled from "styled-components";
import ActiveColumn from "./ActiveColumn";
import { skippedHours } from "./WeeklyCalendar";

interface Props {
  date: Date;
  selectedDates: Date[];
  isBlocked: (date: Date) => boolean;
  onClickCell: (date: Date) => void;
  hiddenDash?: boolean;
  type: string;
  isReserved: (date: Date) => boolean;
}

export default function Cell({
  date,
  selectedDates,
  isBlocked,
  onClickCell,
  isReserved,
  hiddenDash = false,
  type,
}: Props) {
  const later = addDate({ date, duration: { minutes: 30 } });
  const dashed = hiddenDash ? undefined : "true";
  const selectedIndex = (col: Date) =>
    selectedDates.findIndex((d) => d.getTime() === col.getTime());

  const cancelClass = () => {
    alert("이 수업을 삭제하시겠습니까?"); // TODO: API 호출을 통해 수업 삭제
  };

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
          ) : isReserved(date) ? (
            <CellColumn>
              <ReservedColumn onClick={cancelClass} />
            </CellColumn>
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
          {isReserved(later) ? (
            <CellColumn>
              <ReservedColumn onClick={cancelClass} />
            </CellColumn>
          ) : (
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
          )}
        </>
      )}
    </Container>
  );
}

const ReservedColumn = styled.div`
  width: 95%;
  height: 95%;
  margin: auto;
  position: relative;
  font-size: 10px;
  text-align: center;
  color: white;
  background-color: #503cc8;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1.5rem rgba(20, 15, 51, 0.15);

  &:before {
    content: "선택 완료";
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 4px;
  }
`;

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
