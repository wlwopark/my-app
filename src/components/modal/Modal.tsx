"use client";
import styled, { css } from "styled-components";

interface Props {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, isOpen, closeModal, children }: Props) {
  return isOpen ? (
    <>
      <Container>
        <Header>
          <H1>{title}</H1>
          <button onClick={closeModal}>
            <img
              src="https://d38emex6h5e12i.cloudfront.net/new-theme/new-icons/adult/icon/x/black.svg"
              alt="close"
            />
          </button>
        </Header>
        {children}
      </Container>
      <Background onClick={closeModal} />
    </>
  ) : null;
}

const Header = styled.div`
  padding: 32px 32px 16px;
  display: flex;
  justify-content: space-between;
`;

const H1 = styled.h1`
  color: black;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  word-break: keep-all;
`;

const fixedPosition = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const Container = styled.div`
  ${fixedPosition}
  top: 30%;
  bottom: unset;
  margin: auto;

  max-width: 724px;
  z-index: 11;
  border-radius: 5px;
  background-color: white;
`;

const Background = styled.div`
  ${fixedPosition}
  background-color: rgba(0, 0, 0, 0.4);
`;
