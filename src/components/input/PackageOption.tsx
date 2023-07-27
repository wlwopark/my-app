"use client";

import styled from "styled-components";

interface Props {
  isSelected: boolean;
  label: React.ReactNode;
  iconName: string;
  customClass?: string;
  onClickButton: () => void;
}

export default function PackageOption({
  isSelected,
  label,
  iconName,
  customClass,
  onClickButton,
}: Props) {
  return (
    <Container
      highlight={isSelected ? "true" : undefined}
      onClick={onClickButton}
      className="flex items-center"
    >
      <Icon className={`${customClass} flex items-center justify-center`}>
        <div>{iconName}</div>
      </Icon>
      <Label>{label}</Label>
      <div className="flex items-center justify-center px-[12px]">
        {isSelected ? (
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] cursor-pointer border-[#7a5de8]">
            <div className="h-[12px] w-[12px] rounded-full bg-[#7a5de8]"></div>
          </span>
        ) : (
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] cursor-pointer border-[#abbcd5]"></span>
        )}
      </div>
    </Container>
  );
}

const Icon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const Container = styled.div<{ highlight?: "true" }>`
  border-radius: 5px;
  padding: 12px 20px 12px 12px;
  justify-content: space-between;
  margin-bottom: 16px;
  cursor: pointer;

  ${({ highlight }) =>
    highlight
      ? `background-color: rgb(239 241 249); border: 1px solid rgb(80 60 200)`
      : `border: 1px solid rgb(228 231 244)`};
`;

const Label = styled.div`
  flex: 1;
  margin: 0 32px;
`;
