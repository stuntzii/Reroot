import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import lensLogo from "../../../assets/lens.svg";

const Button = styled.button`
  background: var(--bright-green);
  color: var(--dark-green);
  min-height: 36px;
  border: none;
  border-radius: 999px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 12px;

  img {
    height: 20px;
    width: 20px;
  }

  &:hover {
    background: var(--bright-green-dark);
  }

  &:active {
    background: var(--bright-green-darker);
  }

  &:disabled {
    opacity: 0.5;
  }

  span {
    margin-left: 6px;
  }

  * {
    font-family: Inter, sans-serif;
  }
`;

interface Props {
  el: HTMLElement;
}

export default function Modal({ el }: Props) {
  return el
    ? ReactDOM.createPortal(
        <Button>
          <img src={lensLogo} alt="logo" />
        </Button>,
        el
      )
    : null;
}
