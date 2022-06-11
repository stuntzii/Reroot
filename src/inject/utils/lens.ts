import { Signer, ethers } from "ethers";

import { Network } from "../chain";
import { formatPost, pinJSONToIpfs } from "./general";
import { LensHub__factory } from "../../typechain";

interface PostToLensParams {
  text: string;
  handle: string;
  profileId: string;
  signer: Signer;
  networkConfig: Network;
}

interface PostData {
  profileId: string;
  contentURI: string;
  collectModule: string;
  collectModuleInitData: string;
  referenceModule: string;
  referenceModuleInitData: number[];
}

export const postToLens = async ({
  text,
  handle,
  profileId,
  signer,
  networkConfig,
}: PostToLensParams): Promise<void> => {
  const metadata = formatPost({
    text,
    handle,
  });
  const {
    data: { IpfsHash },
  } = await pinJSONToIpfs(metadata);
  const postData: PostData = {
    profileId,
    contentURI: `https://ipfs.io/ipfs/${IpfsHash}`,
    collectModule: networkConfig.freeCollectModule,
    collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
      ["bool"],
      [true]
    ),
    referenceModule: "0x0000000000000000000000000000000000000000",
    referenceModuleInitData: [],
  };

  const lensHub = LensHub__factory.connect(networkConfig.lensHubProxy, signer);
  const tx = await lensHub.post(postData);
  await tx.wait(1);
};
