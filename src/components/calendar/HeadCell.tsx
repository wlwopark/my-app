"use client";

import { toFormattedDate } from "@/utils/date";
import styled from "styled-components";

interface Props {
  date: Date;
  hasDot?: boolean;
}

export default function HeadCell({ date, hasDot }: Props) {
  return (
    <Container>
      <Half>
        <Text>{toFormattedDate({ date, formatPattern: "HH:mm" })}</Text>
      </Half>
      <Half>
        {hasDot && <Dot className="flex items-center justify-center">...</Dot>}
      </Half>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid #e4e7f4;
  position: relative;
  width: 80px;
`;

const Half = styled.div`
  height: 30px;
  color: black;
  font-size: 14px;
`;

const Text = styled.div`
  position: absolute;
  top: -12px;
  background-color: white;
  padding-left: 8px;
`;

const Dot = styled.div`
  color: gray;
  position: absolute;
  bottom: 30%;
  left: 30%;
  font-size: 20px;
`;
