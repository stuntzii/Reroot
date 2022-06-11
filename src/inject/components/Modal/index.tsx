import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  ${({ active }) => (active ? "bottom: 0;" : "")}
`;

const ContentContainer = styled.div<{ active: boolean }>`
  display: ${({ active }) => (active ? "flex" : "none")};
  max-width: 360px;
  background: white;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  align-items: center;
`;

interface ModalProps {
  content: React.ReactNode;
  active: boolean;
  closeModal: () => void;
}

export default function Modal({ content, active, closeModal }: ModalProps) {
  const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalContainer active={active} onClick={closeModal}>
      <ContentContainer onClick={stopPropagation} active={!!content}>
        {content}
      </ContentContainer>
    </ModalContainer>
  );
}
