import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { providers, Signer } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

import { chainData, Network, targetNetwork } from "../chain";

interface Web3ContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (networkId: number) => Promise<void>;
  provider?: providers.JsonRpcProvider;
  signer?: Signer;
  address?: string;
  networkConfig?: Network;
}

const getRpcs = (networks: { [key: number]: Network }) => {
  let rpcs: { [key: number]: string } = {};
  for (const key in networks) {
    rpcs[key] = networks[key].networkDetails.rpcUrls[0];
  }
  return rpcs;
};

const Web3Context = createContext<Web3ContextType>({
  connect: async () => {},
  disconnect: async () => {},
  switchNetwork: async () => {},
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<providers.JsonRpcProvider>();
  const [signer, setSigner] = useState<Signer>();
  const [address, setAddress] = useState<string>();
  const [networkConfig, setNetworkConfig] = useState<Network>();

  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: getRpcs(chainData),
            },
          },
        },
      }),
    []
  );

  const connect = useCallback(async () => {
    if (web3Modal) {
      const instance = await web3Modal.connectTo("walletconnect");
      const newProvider = new providers.Web3Provider(instance);
      const network = await newProvider.getNetwork();
      setNetworkConfig(chainData[network.chainId]);
      setProvider(newProvider);
      setSigner(undefined);
      setAddress(undefined);
    }
  }, [web3Modal]);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setNetworkConfig(undefined);
      setProvider(undefined);
      setSigner(undefined);
      setAddress(undefined);
    }
  }, [web3Modal]);

  const switchNetwork = useCallback(
    async (networkId: number) => {
      if (web3Modal && provider) {
        await provider.send("wallet_addEthereumChain", [
          chainData[networkId].networkDetails,
        ]);
      }
    },
    [web3Modal, provider]
  );

  useEffect(() => {
    if (provider) {
      // Get signer and address on provider change
      const newSigner = provider.getSigner();
      newSigner.getAddress().then((newAddress) => {
        setSigner(newSigner);
        setAddress(newAddress);
      });
      // Update networkConfig on network switch
      provider.on("chainChanged", (chainId: number) => {
        console.log({ chainId });
        setNetworkConfig(chainData[chainId]);
      });
    }
  }, [provider]);

  const values = useMemo(
    () => ({
      provider,
      connect,
      disconnect,
      switchNetwork,
      signer,
      address,
      networkConfig,
    }),
    [
      provider,
      connect,
      disconnect,
      switchNetwork,
      signer,
      address,
      networkConfig,
    ]
  );

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
}
const useWeb3 = () => useContext(Web3Context) as Web3ContextType;

export default useWeb3;
