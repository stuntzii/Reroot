import React, { useCallback, useState } from "react";
import styled from "styled-components";

import useLensProfile from "../../contexts/LensProfileContext";
import usePostContent from "../../contexts/PostContentContext";
import useWeb3 from "../../contexts/Web3Context";
import Button from "../Button";
import { postToLens } from "../../utils/lens";
import useModal from "../../contexts/ModalContext";
import { Loader } from "../Loader";
import { postToTwitter } from "../../utils/general";

const TextContainer = styled.div`
  font-family: "Space Grotesk", sans-serif;
  background: var(--light-green);
  font-weight: 500;
  color: black;
  padding: 20px;
  border-radius: 20px;
  min-width: 320px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 200px;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
`;

const UserText = styled.div`
  font-family: "Space Grotesk", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-left: 10px;
`;

const Username = styled.p`
  color: black;
  font-weight: 700;
  text-align: left;
  margin: 0;
`;

const Handle = styled.p`
  color: var(--dark-green);
  font-weight: 400;
  font-size: 12px;
  text-align: left;
  margin: 0;
`;

export default function PostPreview() {
  const [loading, setLoading] = useState(false);

  const { closeModal } = useModal();
  const { inputText } = usePostContent();
  const { name, handle, pfp, profileId } = useLensProfile();
  const { signer, networkConfig } = useWeb3();

  const handlePostClick = useCallback(() => {
    setLoading(true);
    postToLens({
      text: inputText,
      signer,
      handle,
      profileId,
      networkConfig,
    })
      .then(() => {
        postToTwitter();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [inputText, name, handle, pfp]);

  return (
    <>
      <TextContainer>{inputText}</TextContainer>
      <BottomContainer>
        <UserContainer>
          <UserImg alt="userImg" src={pfp} />
          <UserText>
            <Username>{name}</Username>
            <Handle>@{handle}</Handle>
          </UserText>
        </UserContainer>
        <Button onClick={handlePostClick}>
          {loading ? <Loader /> : "POST"}
        </Button>
      </BottomContainer>
    </>
  );
}
