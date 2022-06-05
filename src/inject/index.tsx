import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { ModalProvider } from "./contexts/ModalContext";

// import { providers, Signer } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// import { postToLens } from "./lens";
// import { getUserProfile } from "./utils";
// import { chainData, Network } from "./chain";

import "./styles.scss";

const body = document.querySelector("body");
const injectedElem = document.createElement("div");
injectedElem.id = "reroot";
body.appendChild(injectedElem);

const root = ReactDOM.createRoot(injectedElem);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);

// interface SetPostModalParams {
//   profileId: string;
//   userImg: string;
//   username: string;
//   handle: string;
//   text: string;
//   signer: Signer;
//   provider: providers.JsonRpcProvider;
//   networkInfo: Network;
// }

// const modal = document.createElement("div");
// modal.id = "reroot-modal";

// const font = document.createElement("style");
// font.innerHTML = `@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap");@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');`;

// const setConnectModal = (action: (button: Element) => void) => {
//   modal.className = "active";
//   modal.innerHTML = `
//     <div class="content-container">
//       <div class="lens-logo">${lensLogo}</div>
//       <button>CONNECT</button>
//     </div>
//   `;
//   const button = modal.querySelector("button");
//   if (button) {
//     button.onclick = () => action(button);
//   }
// };

// const setPostModal = ({
//   profileId,
//   userImg,
//   username,
//   handle,
//   text,
//   signer,
//   networkInfo,
// }: SetPostModalParams) => {
//   modal.className = "active";
//   modal.innerHTML = `
//   <div class="content-container">
//     <div class="post-text">
//       ${text}
//     </div>
//     <div class="bottom-container">
//       <div class="user-container">
//         <img alt="userImg" src="${userImg}"/>
//         <div class='user-text'>
//           <p class="username">
//             ${username}
//           </p>
//           <p class="userid">
//             @${handle}
//           </p>
//         </div>
//       </div>
//       <button>POST</button>
//     </div>
//   </div>
// `;
//   const button = modal.querySelector("button");
//   if (button) {
//     button.onclick = async () => {
//       button.innerHTML = '<span class="loader"></span>';
//       await postToLens({
//         text,
//         handle,
//         profileId,
//         signer,
//         networkInfo,
//       });
//       closeModal();
//       tweetButtons.forEach((button) => {
//         if (button) {
//           button.click();
//         }
//       });
//     };
//   }
// };

// const closeModal = () => {
//   modal.innerHTML = "";
//   modal.className = "";
// };

// let inputText = "";
// let tweetButtons: HTMLButtonElement[] = [];

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider,
//     options: {
//       infuraId: process.env.INFURA_ID,
//       rpc: {
//         80001: "https://matic-mumbai.chainstacklabs.com",
//         137: "https://polygon-rpc.com",
//       },
//     },
//   },
// };

// const web3Modal = new Web3Modal({
//   network: "mainnet",
//   cacheProvider: false,
//   providerOptions,
// });

// const reroot = document.createElement("button");
// reroot.id = "reroot";
// reroot.innerHTML = lensLogo;
// reroot.addEventListener("click", function () {
//   setConnectModal(async (button) => {
//     button.innerHTML = '<span class="loader"></span>';
//     try {
//       const instance = await web3Modal.connectTo("walletconnect");
//       const provider = new providers.Web3Provider(instance);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();
//       const network = await provider.getNetwork();
//       const networkInfo = chainData[network.chainId];
//       const user = await getUserProfile(address, networkInfo.lensApi);
//       setPostModal({
//         profileId: user.id,
//         userImg: user.picture.original.url,
//         username: user.name,
//         handle: user.handle,
//         text: inputText,
//         signer,
//         provider,
//         networkInfo,
//       });
//     } catch (err) {
//       console.error(err);
//       closeModal();
//     }
//   });
// });

// const ensureButtons = () => {
//   tweetButtons = [
//     document.querySelector('[data-testid="tweetButtonInline"]'),
//     document.querySelector('[data-testid="tweetButton"]'),
//   ];

//   tweetButtons.forEach((button) => {
//     if (
//       button &&
//       button.parentNode &&
//       !button.parentNode.querySelector("#reroot")
//     ) {
//       button.after(reroot);
//     }
//   });
// };

// window.addEventListener("DOMNodeInserted", () => {
//   let inputElems = document.querySelectorAll('span[data-text="true"]');
//   if (inputElems) {
//     inputText = Array.from(inputElems).reduce(
//       (prev, curr) => `${prev} ${curr.innerHTML}`,
//       ""
//     );
//   }
//   reroot.disabled = !inputText;
//   ensureButtons();
// });

// const body = document.querySelector("body");
// body.appendChild(font);
// body.appendChild(modal);
