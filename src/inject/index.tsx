import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { ModalProvider } from "./contexts/ModalContext";
import { Web3Provider } from "./contexts/Web3Context";
import { LensProvider } from "./contexts/LensProfileContext";
import { PostContentProvider } from "./contexts/PostContentContext";

import "./styles.scss";

const body = document.querySelector("body");
const injectedElem = document.createElement("div");
injectedElem.id = "reroot";
body.appendChild(injectedElem);

const root = ReactDOM.createRoot(injectedElem);
root.render(
  <React.StrictMode>
    <PostContentProvider>
      <Web3Provider>
        <LensProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </LensProvider>
      </Web3Provider>
    </PostContentProvider>
  </React.StrictMode>
);
