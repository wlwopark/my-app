"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import useOpenModal from "@/hooks/useOpenModal";
import { styled } from "styled-components";
import PackageSelection from "./PackageSelection";

export default function Header({ packageType }: { packageType: string }) {
  const router = useRouter();

  const { isOpen, closeModal, openModal } = useOpenModal(true);

  const changeSelection = (value: string) => {
    if (value !== packageType) {
      closeModal();
    }
    router.push(`/schedule/${value}`);
  };

  return (
    <>
      <Container className="flex items-center bg-gray-50">
        <Row className="flex items-center">
          <img
            src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/chevron-left/primary.svg"
            alt="back"
          />
          <span className="ml-[12px] text-purple-500">나가기</span>
        </Row>
        <Row>
          <img
            src="/assets/logo_purple.svg"
            className="h-[30px] w-[30px]"
          ></img>
        </Row>
        <Row>수업 예약</Row>
        <Row>STEP 1. 튜터 및 시간 선택</Row>
        <Row>
          <Input className="border-gray-300 rounded-md" onClick={openModal}>
            <a>
              <Content>
                <div
                  className={`mr-[12px] text-[12px] inline-block rounded-[4px] px-[8px] py-[0px] font-medium flex items-center ${
                    packageType === "pck20"
                      ? "bg-blue-50 text-blue-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {packageType}
                </div>
                <div>{packageType}</div>
              </Content>
            </a>
          </Input>
        </Row>
        <Row style={{ marginLeft: "auto" }}>
          예약 신청한 수업 <span className="text-purple-500">0</span>
        </Row>
        <Row>
          <Button>다음</Button>
        </Row>
      </Container>

      <PackageSelection
        isOpen={isOpen}
        closeModal={closeModal}
        selected={packageType}
        changeSelection={changeSelection}
      />
    </>
  );
}

const Container = styled.div`
  height: 70px;
  color: black;
  border: 1px solid rgb(228 231 244);
  font-size: 14px;
`;

const Row = styled.div`
  &:first-of-type {
    margin: 0 20px;
  }
  &:not(:first-of-type) {
    margin-right: 20px;
  }
`;

const Input = styled.div`
  width: 360px;
  border: 1px solid rgb(201 204 222);
`;

const Content = styled.div`
  padding: 8px 16px;
  display: flex;
`;

const Button = styled.button`
  padding: 10px;
  min-width: 150px;
  background-color: rgb(201 204 222);
  border-radius: 5px;
  border: 1px solid rgb(228 231 244);
`;
