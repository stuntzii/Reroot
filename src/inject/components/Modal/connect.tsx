import React, { useState, useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";

import useModal from "../../contexts/ModalContext";
import useWeb3 from "../../contexts/Web3Context";
import Button from "../Button";
import lensLogo from "../../../assets/lens.svg";
import { Loader } from "../Loader";
import ErrorText from "../Error";
import useLensProfile from "../../contexts/LensProfileContext";
import { targetNetwork } from "../../chain";
import PostPreview from "./postPreview";

const LogoContainer = styled.div`
  background: var(--light-green);
  width: 150px;
  height: 150px;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export default function Connect() {
  const [loading, setLoading] = useState(false);

  const {
    connect,
    disconnect,
    switchNetwork,
    provider,
    signer,
    networkConfig,
  } = useWeb3();
  const { fetchingProfile, profileId, lensError } = useLensProfile();
  const { setModal } = useModal();

  const callAsync = async (action: () => Promise<void>) => {
    try {
      setLoading(true);
      await action();
      setLoading(false);
    } catch (err) {
      console.error(error);
      setLoading(false);
    }
  };

  const [error, action, buttonText] = useMemo(() => {
    if (provider && signer && !networkConfig) {
      return [
        "Looks like you’re on the wrong network, please switch to polygon.",
        () => {
          switchNetwork(targetNetwork);
        },
        "SWITCH NETWORK",
      ];
    } else if (provider && !signer) {
      return [
        "Error connecting to wallet please try to reconnect.",
        () => {
          callAsync(async () => {
            await disconnect();
            await connect();
          });
        },
        "RECONNECT",
      ];
    } else if (lensError) {
      return [
        `Error finding default lens profile please try a different wallet.`,
        () => {
          callAsync(disconnect);
        },
        "DISCONNECT",
      ];
    }
    return [
      "",
      () => {
        callAsync(connect);
      },
      "CONNECT",
    ];
  }, [provider, signer, networkConfig]);

  useEffect(() => {
    if (provider && signer && networkConfig && profileId) {
      setModal(<PostPreview />);
    }
  }, [provider, signer, networkConfig, profileId, lensError]);

  return (
    <>
      <LogoContainer>
        <img src={lensLogo} alt="logo" />
      </LogoContainer>
      {error && <ErrorText>{error}</ErrorText>}
      <Button onClick={action}>
        {loading || fetchingProfile ? <Loader /> : buttonText}
      </Button>
    </>
  );
}
