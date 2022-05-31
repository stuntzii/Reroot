import { Contract } from "@ethersproject/contracts";
import { defaultAbiEncoder } from "@ethersproject/abi";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { formatPost, getUserProfile, pinJSONToIpfs } from "./utils";
import LensHub from "./abis/LensHub.json";
import { chainData } from "./chain";
import { waitForTx } from "./utils";

import "./styles.scss";

const lensLogo = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_11_51)"><path d="M50.2443 63.8646C49.2512 63.8646 25.6802 63.6588 7.64978 45.6498C7.26803 45.272 6.8964 44.8875 6.53154 44.5031C2.75452 40.5295 0.963976 35.8003 1.34235 30.8318C1.68019 26.4467 3.70722 22.1999 7.03492 18.8674C10.3626 15.5347 14.6295 13.5176 19.018 13.1837C23.616 12.8464 28.0113 14.3373 31.7985 17.5418C32.2072 12.6035 34.2478 8.43437 37.7478 5.43901C41.0889 2.57523 45.518 1 50.2477 1C54.9775 1 59.4066 2.57523 62.7477 5.43901C66.2444 8.43771 68.2884 12.6035 68.697 17.5418C72.4843 14.3373 76.8795 12.8193 81.4774 13.1837C85.8693 13.5209 90.1228 15.5449 93.4572 18.8674C96.7916 22.1899 98.8187 26.4501 99.1497 30.8318C99.5315 35.8003 97.7375 40.5295 93.9639 44.5097C93.599 44.8942 93.2275 45.2789 92.8458 45.6567C74.812 63.6588 51.241 63.8646 50.2443 63.8646ZM20.3221 16.8705C16.2343 16.8705 12.3964 18.7695 9.66668 21.4916C4.76127 26.3928 2.53154 34.8862 9.23424 41.9597C9.57659 42.3217 9.92568 42.6804 10.2815 43.0356C27.2343 59.9585 50.0213 60.1543 50.2477 60.1543C50.4742 60.1543 73.3086 59.9181 90.2173 43.0356C90.5754 42.6782 90.9245 42.3195 91.2646 41.9597C97.9674 34.8762 95.7375 26.3928 90.8322 21.4916C85.9267 16.5904 77.4167 14.3642 70.322 21.0599C69.9594 21.3995 69.6003 21.748 69.2444 22.1056C68.9707 22.3788 68.7039 22.6587 68.4402 22.9387L64.9167 26.6694L65.0552 21.5489C65.0552 21.1577 65.0787 20.7698 65.0787 20.3751C65.0787 19.8692 65.0787 19.3633 65.0585 18.8741C64.7884 9.1427 57.197 4.70705 50.2545 4.70705C43.3119 4.70705 35.7274 9.13936 35.4537 18.8741C35.4537 19.37 35.4335 19.8861 35.4335 20.3751C35.4335 20.7597 35.4335 21.1375 35.4537 21.5187L35.5924 26.6694L32.0653 22.9589C31.7985 22.6756 31.5282 22.3922 31.2512 22.1123C30.893 21.7547 30.5338 21.4062 30.1734 21.0665C27.0146 18.0747 23.5855 16.8705 20.3221 16.8705Z" fill="#204F24"/><path d="M47.8619 44.2128H45.1592C45.1592 40.1953 41.2403 36.9233 36.4295 36.9233C31.6187 36.9233 27.6998 40.1953 27.6998 44.2128H24.9971C24.9971 38.7045 30.1254 34.225 36.4295 34.225C42.7335 34.225 47.8619 38.7045 47.8619 44.2128Z" fill="#204F24"/><path d="M75.3412 44.1015H72.6384C72.6384 40.0842 68.7229 36.8156 63.9088 36.8156C59.0946 36.8156 55.1791 40.0842 55.1791 44.1015H52.4763C52.4763 38.5967 57.6046 34.1171 63.9088 34.1171C70.2127 34.1171 75.3412 38.5967 75.3412 44.1015Z" fill="#204F24"/><path d="M39.5405 44.2699C41.6881 44.2699 43.4291 42.5318 43.4291 40.3875C43.4291 38.2432 41.6881 36.505 39.5405 36.505C37.3929 36.505 35.6521 38.2432 35.6521 40.3875C35.6521 42.5318 37.3929 44.2699 39.5405 44.2699Z" fill="#204F24"/><path d="M66.8385 44.2699C68.9859 44.2699 70.7269 42.5318 70.7269 40.3875C70.7269 38.2432 68.9859 36.505 66.8385 36.505C64.6909 36.505 62.9499 38.2432 62.9499 40.3875C62.9499 42.5318 64.6909 44.2699 66.8385 44.2699Z" fill="#204F24"/><path d="M50.2338 54.1329C47.0482 54.1329 44.0953 52.4969 42.7169 49.9671L45.0819 48.6785C45.9975 50.3651 48.0144 51.4343 50.2271 51.4343C52.4399 51.4343 54.4602 50.3515 55.3723 48.6785L57.7372 49.9671C56.3723 52.4969 53.4299 54.1329 50.2338 54.1329Z" fill="#204F24"/><path d="M98.6689 91.5379C91.8965 94.7042 84.2626 95.5347 76.9661 93.8991C70.9267 92.5621 65.3824 89.5653 60.9594 85.2471C63.7595 86.4058 66.763 86.9951 69.7938 86.981C75.0346 86.9821 80.1457 85.3552 84.419 82.326L82.25 79.3104C76.4021 83.5133 68.358 84.5253 62.0101 81.6616C55.7466 78.845 52.2128 72.8172 51.9865 64.6441V62.0097H48.2702V62.4752V64.6239C48.0541 72.807 44.5134 78.8416 38.2433 81.6616C31.8953 84.5186 23.8379 83.5202 18.0034 79.3004L15.8378 82.316C20.1082 85.3463 25.2169 86.9754 30.456 86.9775C33.487 86.9923 36.4906 86.403 39.2906 85.2438C34.8689 89.5618 29.3255 92.5588 23.2872 93.8957C15.9907 95.5315 8.35678 94.701 1.58446 91.5346L0 94.8908C4.97354 97.2218 10.4011 98.4277 15.8953 98.4225C18.6558 98.4234 21.4079 98.1192 24.1014 97.515C32.3662 95.6831 39.7492 91.071 45.0134 84.4511L45.0372 84.4207C46.2724 82.8028 47.3569 81.0752 48.2771 79.2598V98.355H51.9932V79.2869C52.9121 81.0932 53.993 82.8128 55.223 84.4241L55.2466 84.4545C60.5103 91.0734 67.892 95.6856 76.1553 97.5186C78.8488 98.1225 81.6009 98.4269 84.3614 98.4258C89.8568 98.431 95.2853 97.2251 100.26 94.8942L98.6689 91.5379Z" fill="#204F24"/></g><defs><clipPath id="clip0_11_51"><rect width="100" height="100" fill="white"/></clipPath></defs></svg>`;

const modal = document.createElement("div");
modal.id = "reroot-modal";

const font = document.createElement("style");
font.innerHTML = `@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap");@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');`;

const setConnectModal = (action) => {
  modal.className = "active";
  modal.innerHTML = `
    <div class="content-container">
      <div class="lens-logo">${lensLogo}</div>
      <button>CONNECT</button>
    </div>
  `;
  const button = modal.querySelector("button");
  if (button) {
    button.onclick = () => action(button);
  }
};

const postToLens = async ({
  text,
  handle,
  profileId,
  signer,
  provider,
  networkInfo,
}) => {
  const metadata = formatPost({
    text,
    handle,
  });
  const {
    data: { IpfsHash },
  } = await pinJSONToIpfs(metadata);
  const postData = {
    profileId,
    contentURI: `https://ipfs.io/ipfs/${IpfsHash}`,
    collectModule: networkInfo.freeCollectModule,
    collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
      ["bool"],
      [true]
    ),
    referenceModule: "0x0000000000000000000000000000000000000000",
    referenceModuleInitData: [],
  };
  console.log({
    postData,
  });
  const lensHub = new ethers.Contract(
    networkInfo.lensHubProxy,
    LensHub,
    signer
  );

  console.log({
    lensHub,
  });
  lensHub.post(postData).then((tx) => {
    waitForTx(provider, tx).then(() => {
      closeModal();
      tweetButtons.forEach((button) => {
        if (button) {
          button.click();
        }
      });
    });
  });
};

const setPostModal = ({
  profileId,
  userImg,
  username,
  handle,
  text,
  signer,
  provider,
  contracts,
}) => {
  modal.className = "active";
  modal.innerHTML = `
  <div class="content-container">
    <div class="post-text">
      ${text}
    </div>
    <div class="bottom-container">
      <div class="user-container">
        <img alt="userImg" src="${userImg}"/>
        <div class='user-text'>
          <p class="username">
            ${username}
          </p>
          <p class="userid">
            @${handle}
          </p>
        </div>
      </div>
      <button>POST</button>
    </div>
  </div>
`;
  const button = modal.querySelector("button");
  if (button) {
    button.onclick = () => {
      button.innerHTML = '<span class="loader"></span>';
      postToLens({ text, handle, profileId, signer, provider, contracts });
    };
  }
};

const closeModal = () => {
  modal.innerHTML = "";
  modal.className = "";
};

let inputElem = document.querySelector('[data-text="true"]');
let inputText = "";
let tweetButtons = [];

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_ID,
      rpc: {
        80001: "https://matic-mumbai.chainstacklabs.com",
        137: "https://polygon-rpc.com",
      },
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: false,
  providerOptions,
});

const reroot = document.createElement("button");
reroot.id = "reroot";
reroot.innerHTML = lensLogo;
reroot.addEventListener("click", function () {
  setConnectModal(async (button) => {
    button.innerHTML = '<span class="loader"></span>';
    try {
      const instance = await web3Modal.connectTo("walletconnect");
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const networkInfo = chainData[provider._network.chainId];
      const user = await getUserProfile(address, networkInfo.lensApi);
      setPostModal({
        profileId: user.id,
        userImg: user.picture.original.url,
        username: user.name,
        handle: user.handle,
        text: inputText,
        signer,
        provider,
        networkInfo,
      });
    } catch (err) {
      console.error(err);
      closeModal();
    }
  });
});

const ensureButtons = () => {
  tweetButtons = [
    document.querySelector('[data-testid="tweetButtonInline"]'),
    document.querySelector('[data-testid="tweetButton"]'),
  ];

  tweetButtons.forEach((button) => {
    if (
      button &&
      button.parentNode &&
      !button.parentNode.querySelector("#reroot")
    ) {
      button.after(reroot);
    }
  });
};

window.addEventListener("DOMNodeInserted", () => {
  inputElem = document.querySelectorAll('span[data-text="true"]');
  if (inputElem) {
    inputText = Array.from(inputElem).reduce(
      (prev, curr) => `${prev} ${curr.innerHTML}`,
      ""
    );
  }
  reroot.disabled = !inputText;
  ensureButtons();
});

const body = document.querySelector("body");
body.appendChild(font);
body.appendChild(modal);
