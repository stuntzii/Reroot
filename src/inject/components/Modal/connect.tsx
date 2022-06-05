import React from "react";
import styled from "styled-components";

import Button from "../Button";
import lensLogo from "../../../assets/lens.svg";

const LogoContainer = styled.div`
  background: var(--light-green);
  width: 150px;
  height: 150px;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export default function Connect() {
  return (
    <>
      <LogoContainer>
        <img src={lensLogo} alt="logo" />
      </LogoContainer>
      <Button
        onClick={() => {
          console.log("TEST");
        }}
      >
        CONNECT
      </Button>
    </>
  );
}
