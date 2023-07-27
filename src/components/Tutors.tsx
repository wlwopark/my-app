"use client";

import { toFormattedDate } from "@/utils/date";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";
import Tutor from "./input/Tutor";

const dummy = [
  {
    id: "1",
    name: "김민수",
    avatar: "https://avatars.githubusercontent.com/u/76855221?v=4",
    university: "서울대학교",
    major: "컴퓨터공학과",
    confirmRate: 100,
    tags: ["#프론트엔드", "#백엔드"],
  },
  {
    id: "2",
    name: "김민수",
    avatar: "https://avatars.githubusercontent.com/u/76855221?v=4",
    university: "서울대학교",
    major: "컴퓨터공학과",
    confirmRate: 100,
    tags: ["#프론트엔드", "#백엔드"],
  },
  {
    id: "3",
    name: "김민수",
    avatar: "https://avatars.githubusercontent.com/u/76855221?v=4",
    university: "서울대학교",
    major: "컴퓨터공학과",
    confirmRate: 100,
    tags: ["#프론트엔드", "#백엔드"],
  },
  {
    id: "4",
    name: "김민수",
    avatar: "https://avatars.githubusercontent.com/u/76855221?v=4",
    university: "서울대학교",
    major: "컴퓨터공학과",
    confirmRate: 100,
    tags: ["#프론트엔드", "#백엔드"],
  },
  {
    id: "5",
    name: "김민수",
    avatar: "https://avatars.githubusercontent.com/u/76855221?v=4",
    university: "서울대학교",
    major: "컴퓨터공학과",
    confirmRate: 100,
    tags: ["#프론트엔드", "#백엔드"],
  },
];

interface Props {
  packageType: string;
}

export default function Tutors({ packageType }: Props) {
  const startDate = useSearchParams().get("startDate") ?? null;

  const [selectedTutorId, setSelectedTutorId] = useState<
    string | null | "auto"
  >(null); // TODO client 상태로 저장하는게 아닌, API 호출을 통해 서버에 저장하도록 변경

  const changeTutorId = (id: string) => {
    setSelectedTutorId(id === selectedTutorId ? null : id);
  };

  if (!startDate) {
    return (
      <Container className="flex h-full items-center">
        <GuidText>{`캘린더에서 원하시는 시간을 눌러\n수업을 신청해 주세요.`}</GuidText>
      </Container>
    );
  }

  return (
    <>
      <Container className="flex flex-col">
        <Text className="text-h4 px-[8px] py-[20px] text-gray-900">
          {toFormattedDate({
            date: startDate,
            formatPattern: "yyyy-MM-dd HH:mm",
          })}
        </Text>
        <Tutor
          isSelected={selectedTutorId === "auto"}
          id="auto"
          avatar="https://d38emex6h5e12i.cloudfront.net/web/202210/ic-auto-matching.png"
          name="링글 자동 매칭"
          university="예약 가능한 튜터 중, 평점이 높고 성실한 튜터와 자동으로 매칭해 드려요."
          major={null}
          confirmRate={0}
          onClickTutor={changeTutorId}
          footer={
            <div className="flex items-center">
              <Text className="text-[14px] text-gray-700">
                불만족 시 수업권 복구
              </Text>
              <Icon
                src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/question/black.svg"
                alt="info"
              />
            </div>
          }
        />
        <Text className="px-[8px] py-[20px] text-gray-900">튜터 직접 선택</Text>
        <div className="flex justify-around">
          <Tab selected="true">{`예약 가능 (${dummy.length})`}</Tab>
          <Tab>{`추천 튜터 (0)`}</Tab>
          <Tab>{`찜한 튜터 (0)`}</Tab>
        </div>
        <GuidText className="text-[12px]">
          선택한 시간에 수업 가능한 튜터들입니다.
        </GuidText>
        {React.Children.toArray(
          dummy.map((tutor) => (
            <Tutor
              isSelected={selectedTutorId === tutor.id}
              {...tutor}
              onClickTutor={changeTutorId}
              footer={
                <div>
                  {tutor.confirmRate > 0 && (
                    <Text className="text-[14px] text-gray-500">
                      수락률{tutor.confirmRate}%
                    </Text>
                  )}
                  <div className="flex">
                    {tutor.tags?.map((tag) => (
                      <Tag
                        key={tag}
                        className="rounded-md text-gray-700 bg-gray-100"
                      >
                        <span className="capitalize text-gray-700">{tag}</span>
                      </Tag>
                    ))}
                  </div>
                </div>
              }
            />
          ))
        )}
      </Container>
    </>
  );
}

const GuidText = styled.div`
  padding: 24px 16px;
  color: #80839e;
`;

const Tab = styled.div<{ selected?: "true" }>`
  cursor: pointer;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  color: #80839e;
  border-bottom: 1px solid #e4e7f4;
  flex: 1;

  ${({ selected }) =>
    selected &&
    `
    color: #503cc8;
    background-color: #eff1f9;
    border-bottom: 1px solid #503cc8;
    `}
`;

const Container = styled.div`
  width: 372px;
  overflow-y: scroll;
`;

const Text = styled.p``;

const Tag = styled.div`
  font-size: 12px;
  padding: 2px;

  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;
