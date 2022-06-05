export interface Network {
  freeCollectModule: string;
  lensHubProxy: string;
  lensApi: string;
  networkDetails: {
    chainId: string;
    rpcUrls: string[];
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    blockExplorerUrls: string[];
  };
}

export const targetNetwork = 137;

export const chainData: { [key: number]: Network } = {
  80001: {
    freeCollectModule: '0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c',
    lensHubProxy: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
    lensApi: 'https://api-mumbai.lens.dev',
    networkDetails: {
      chainId: '0x13881',
      rpcUrls: ['https://matic-mumbai.chainstacklabs.com	'],
      chainName: 'Matic Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  },
  137: {
    freeCollectModule: '0x23b9467334bEb345aAa6fd1545538F3d54436e96',
    lensHubProxy: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
    lensApi: 'https://api.lens.dev/',
    networkDetails: {
      chainId: '0x89',
      rpcUrls: ['https://rpc-mainnet.matic.network/'],
      chainName: 'Matic Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
  },
};
