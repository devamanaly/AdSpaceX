/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import HeaderImage from "../../../public/images/logos/AdspaceXlogo.png";
import HeaderText from "../../../public/images/logos/AdSpaceXLogo2.png";
import { JSX } from "react";

interface Measurements {
  width: string | number;
  height: string | number;
}

export const LogoHeader = ({
  width,
  height,
}: Measurements): JSX.Element => {
  return (
    <div style={{ width, height }}>
      <Image
        src={HeaderImage}
        alt="Header Logo"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export const LogoText = ({
  width,
  height,
}: Measurements): JSX.Element => {
  return (
    <div style={{ width, height }}>
      <Image
        src={HeaderText}
        alt="Header Text"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};