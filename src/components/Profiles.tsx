import React, { FunctionComponent } from "react";
import { Profile } from "../types";
import ProfileItem from "./ProfileItem";

interface Props {
  profiles: Profile[] | undefined;
}

const displayedProfiles: string[] = ["github", "linkedin", "twitter"];

const Profiles: FunctionComponent<Props> = ({ profiles }: Props) => {
  if (!profiles) {
    return null;
  }
  return (
    <ul>
      {profiles
        ?.filter((profile: Profile) => displayedProfiles.includes(profile.network.toLowerCase())
        )
        .map((profile: Profile) => (
          <ProfileItem {...profile}></ProfileItem>
        ))}
    </ul>
  );
};

export default Profiles;
