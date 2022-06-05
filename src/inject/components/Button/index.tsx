import styled from "styled-components";

export default styled.button`
  background: var(--dark-green);
  color: white;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: var(--dark-green-dark);
  }

  &:active {
    background: var(--dark-green-darker);
  }
`;
