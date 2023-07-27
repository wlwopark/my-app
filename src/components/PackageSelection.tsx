"use client";

import styled from "styled-components";
import PackageOption from "./input/PackageOption";
import Modal from "./modal/Modal";

interface Props {
  selected: "pck20" | "pck40";
  isOpen: boolean;
  closeModal: () => void;
  changeSelection: (selected: "pck20" | "pck40") => void;
}

export default function PackageSelection({
  selected,
  isOpen,
  closeModal,
  changeSelection,
}: Props) {
  return (
    <Modal title="수업권 선택" isOpen={isOpen} closeModal={closeModal}>
      <Content>
        <PackageOption
          key="pck20"
          isSelected={selected === "pck20"}
          label={
            <Label>
              <Column>
                <Text className="text-h4 text-gray-900">1회 패키지(20분)</Text>
                <Text className="text-[12px] text-gray-500">
                  수강 기간: 30일 남음
                </Text>
              </Column>
              <Column>
                <Text className="text-[12px] text-gray-500">미사용 수업권</Text>
                <Text className="text-[18px] text-purple-500">1</Text>
              </Column>
            </Label>
          }
          iconName="20분"
          customClass="bg-blue-50 text-blue-500"
          onClickButton={() => changeSelection("pck20")}
        />
        <PackageOption
          key="pck40"
          isSelected={selected === "pck40"}
          label={
            <Label>
              <Column>
                <Text className="text-h4 text-gray-900">1회 패키지</Text>
                <Text className="text-[12px] text-gray-500">
                  수강 기간: 365일 남음
                </Text>
              </Column>
              <Column>
                <Text className="text-[12px] text-gray-500">미사용 수업권</Text>
                <Text className="text-[18px] text-purple-500">1</Text>
              </Column>
            </Label>
          }
          iconName="40분"
          customClass="bg-green-50 text-green-500"
          onClickButton={() => changeSelection("pck40")}
        />
      </Content>
    </Modal>
  );
}

const Content = styled.div`
  padding: 0 32px 32px 40px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  &:last-of-type {
    text-align: right;
  }
`;

const Text = styled.p``;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
