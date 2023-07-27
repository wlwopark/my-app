import { Tutor as TutorType } from "@/types/tutor";
import styled from "styled-components";

interface Props extends TutorType {
  isSelected: boolean;
  onClickTutor: (id: string) => void;
  footer?: React.ReactNode;
}

export default function Tutor({
  isSelected,
  name,
  avatar,
  university,
  major,
  id,
  footer,
  onClickTutor,
}: Props) {
  return (
    <Container
      className="flex items-center justify-between"
      onClick={() => onClickTutor(id)}
      selected={isSelected ? "true" : undefined}
    >
      <Column>
        <div className="flex">
          <Avatar src={avatar} alt="avatar" />
          <Column>
            <Text className="text-h2 font-bold">{name}</Text>
            <Text className="text-[14px] text-gray-700">{university}</Text>
            <Text className="text-[14px] text-gray-500">{major}</Text>
          </Column>
        </div>
        {footer}
      </Column>
      <Icon
        src={
          isSelected
            ? "https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/complete/primary.svg"
            : "https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/check-circle/incomplete.svg"
        }
      />
    </Container>
  );
}

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Container = styled.div<{ selected?: "true" }>`
  padding: 16px 8px 18px 20px;
  cursor: pointer;

  ${({ selected }) =>
    selected
      ? `background-color: #eff1f9; border: 1px solid rgb(80, 60, 200)`
      : `border: 1px solid #e4e7f4`};

  &:hover {
    background-color: #eff1f9;
    border: 1px solid rgb(80, 60, 200);
  }
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  overflow: visible;
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 14px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  color: black;
  word-break: keep-all;

  &:empty {
    display: none;
  }
`;
