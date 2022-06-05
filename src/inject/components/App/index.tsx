import React, { useEffect, useState, useCallback } from "react";

import LensButton from "../LensButton";
import useModal from "../../contexts/ModalContext";
import ConnectModal from "../Modal/connect";

export default function App() {
  const [tweetButtons, setTweetButtons] = useState<HTMLButtonElement[]>();
  const { setModal } = useModal();

  const setConnectModal = useCallback(() => {
    setModal?.(<ConnectModal />);
  }, [setModal]);

  useEffect(() => {
    const checkForTweetButtons = () => {
      setTweetButtons([
        document.querySelector('[data-testid="tweetButtonInline"]'),
        document.querySelector('[data-testid="tweetButton"]'),
      ]);
    };
    window.addEventListener("DOMNodeInserted", checkForTweetButtons);
    return () => {
      window.removeEventListener("DOMNodeInserted", checkForTweetButtons);
    };
  }, []);

  return (
    <>
      {tweetButtons?.map((el) => (
        <LensButton el={el?.parentElement} onClick={setConnectModal} />
      ))}
    </>
  );
}
