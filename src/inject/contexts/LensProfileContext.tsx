import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";

import useWeb3 from "./Web3Context";
import { getUserProfile } from "../utils/general";

interface LensProfileContextType {
  name?: string;
  handle?: string;
  profileId?: string;
  pfp?: string;
  lensError?: string;
  fetchingProfile?: boolean;
}

const LensProfileContext = createContext<LensProfileContextType>({});

export function LensProvider({ children }: { children: React.ReactNode }) {
  const { address, networkConfig } = useWeb3();
  const [name, setName] = useState<string>();
  const [handle, setHandle] = useState<string>();
  const [profileId, setProfileId] = useState<string>();
  const [pfp, setPfp] = useState<string>();
  const [lensError, setLensError] = useState<string>();
  const [fetchingProfile, setFetchingProfile] = useState(false);

  useEffect(() => {
    if (address && networkConfig) {
      setFetchingProfile(true);
      getUserProfile(address, networkConfig.lensApi)
        .then((profile) => {
          if (profile) {
            setName(profile.name);
            setHandle(profile.handle);
            setProfileId(profile.id);
            setPfp(profile.picture?.uri ?? profile.picture?.original?.url);
          }
        })
        .catch((err: Error) => {
          setLensError(err.message);
        })
        .finally(() => {
          setFetchingProfile(false);
        });
    }
  }, [address, networkConfig]);

  const lensValues = useMemo(
    () => ({
      name,
      handle,
      profileId,
      pfp,
      lensError,
      fetchingProfile,
    }),
    [name, handle, profileId, pfp, lensError, fetchingProfile]
  );

  return (
    <LensProfileContext.Provider value={lensValues}>
      {children}
    </LensProfileContext.Provider>
  );
}
const useLensProfile = () =>
  useContext(LensProfileContext) as LensProfileContextType;

export default useLensProfile;
