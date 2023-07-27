"use client";
import { useRouter, useSearchParams } from "next/navigation";

import {
  addDate,
  diffDate,
  eachDateOfInterval,
  getEdgeOfWeek,
  toFormattedDate,
} from "@/utils/date";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import HeadCell from "./HeadCell";
import Link from "next/link";

export const skippedHours = [
  { from: 3, to: 4 },
  { from: 14, to: 18 },
];

function isSkippedHour(date: Date) {
  return skippedHours.some(({ from }) => from === date.getHours());
}

function hasNoService(date: Date) {
  const HH = date.getHours(); // 24h
  return skippedHours.some(({ from, to }) => HH <= to && HH >= from);
}

function blockTime(date: Date) {
  return (
    diffDate({
      from: addDate({ date: new Date(), duration: { minutes: 24 * 60 + 90 } }),
      to: date,
      unit: "minute",
    }) <= 0 || hasNoService(date)
  );
}

function createDateSet(date: Date, packageType: string) {
  return packageType === "pck20"
    ? [date]
    : [date, addDate({ date, duration: { minutes: 30 } })];
}

export default function WeeklyCalendar({
  packageType,
}: {
  packageType: string;
}) {
  const router = useRouter();
  const startDate = useSearchParams().get("startDate") ?? null;
  const [date, setDate] = useState(new Date()); // TODO weekly calendar navigation
  const init = () =>
    startDate ? createDateSet(new Date(startDate), packageType) : [];
  const [selectedDates, setSelectedDates] = useState<Date[]>(init);
  const { start, end } = getEdgeOfWeek({ date });
  const weekly = eachDateOfInterval({ type: "day", params: { start, end } });
  const changeSelectedDates = (date: Date) => {
    setSelectedDates(
      packageType === "pck20"
        ? [date]
        : [date, addDate({ date, duration: { minutes: 30 } })]
    );
    router.push(
      `/schedule/${packageType}?startDate=${toFormattedDate({
        date,
        formatPattern: "yyyy-MM-dd HH:mm",
      })}`
    );
  };

  useEffect(() => {
    if (!startDate) {
      setSelectedDates(init());
    }
  }, []);

  return (
    <Table className="flex">
      {React.Children.toArray(
        weekly.map((date, index) => {
          const times = eachDateOfInterval({
            type: "hour",
            params: {
              start: date,
              end: addDate({ date, duration: { hours: 23 } }),
            },
          }).filter((t) => !(!isSkippedHour(t) && hasNoService(t)));

          return (
            <>
              {index === 0 && (
                <Column
                  key={`${date.toString()}_head`}
                  className="flex flex-col"
                >
                  {React.Children.toArray(
                    times.map((time, index) => (
                      <>
                        {index === 0 && <Head />}
                        <HeadCell date={time} hasDot={isSkippedHour(time)} />
                      </>
                    ))
                  )}
                </Column>
              )}
              <Column key={date.toString()} className="flex flex-col">
                {React.Children.toArray(
                  times.map((time, index) => (
                    <>
                      {index === 0 && (
                        <Head className="flex items-center justify-center flex-col">
                          <Text
                            highlight={
                              time.getDay() > 5 || time.getDay() === 0
                                ? "true"
                                : undefined
                            }
                          >
                            {toFormattedDate({
                              date: time,
                              formatPattern: "eee",
                            })}
                          </Text>
                          <Circle
                            className="flex items-center justify-center"
                            today={
                              time.getDate() === new Date().getDate()
                                ? "true"
                                : undefined
                            }
                            weekend={
                              time.getDay() > 5 || time.getDay() === 0
                                ? "true"
                                : undefined
                            }
                          >
                            {time.getDate()}
                          </Circle>
                        </Head>
                      )}
                      <Cell
                        type={packageType}
                        date={time}
                        isBlocked={blockTime}
                        hiddenDash={isSkippedHour(time)}
                        onClickCell={changeSelectedDates}
                        selectedDates={selectedDates}
                      />
                    </>
                  ))
                )}
              </Column>
            </>
          );
        })
      )}
    </Table>
  );
}

const Column = styled.div``;

const Head = styled(Column)`
  color: black;
  height: 70px;
`;

const Table = styled.div`
  overflow: scroll;
`;

const Text = styled.div<{ highlight?: "true" }>`
  font-size: 12px;
  ${({ highlight }) => highlight && `color: red;`};
`;

const Circle = styled.div<{ today?: "true"; weekend?: "true" }>`
  border-radius: 50%;
  width: 38px;
  height: 38px;
  font-weight: 600;
  color: black;

  ${({ today, weekend }) =>
    `${today && `color: white; background-color: #503cc8;`}${
      weekend && `color: red;`
    }`}
`;
