import axios from "axios";
import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { getApolloClient } from "./apollo-client";
import { PINATA_API_KEY, PINATA_API_SECRET } from "../env";

const DEFAULT_PROFILE_QUERY = `
query DefaultProfile($request: DefaultProfileRequest!) {
  defaultProfile(request: $request) {
    id
    name
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
  }
}`;

export const getUserProfile = async (ethereumAddress, lensApi) => {
  const response = await getApolloClient(lensApi).query({
    query: gql(DEFAULT_PROFILE_QUERY),
    variables: {
      request: {
        ethereumAddress,
      },
    },
  });
  return response.data.defaultProfile;
};

export const formatPost = ({ text, handle }) => ({
  version: "1.0.0",
  metadata_id: uuidv4(),
  description: text,
  content: text,
  external_url: null,
  image: null,
  imageMimeType: null,
  name: `Post by @${handle}`,
  attributes: [{ traitType: "string", key: "type", value: "post" }],
  media: [],
  appId: "Reroot",
});

export const pinJSONToIpfs = (json) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios.post(
    url,
    {
      pinataContent: json,
    },
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    }
  );
};

export const waitForTx = async (provider, tx) =>
  new Promise(async (resolve, reject) => {
    const result = await provider.getTransactionReceipt(tx.hash);
    console.log({ provider, tx, result });
    if (result != null) {
      resolve(result);
    } else {
      setTimeout(() => {
        waitForTx(provider, tx).then(resolve);
      }, 500);
    }
  });
