import React, { useEffect, useState } from "react";

import LensButton from "../LensButton";

export default function App() {
  const [tweetButtons, setTweetButtons] = useState<HTMLButtonElement[]>();

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
        <LensButton el={el?.parentElement} />
      ))}
    </>
  );
}
