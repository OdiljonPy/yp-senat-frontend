import React from "react";

import About from "@/sections/common/About";
import Applications from "@/sections/common/Applications";
import Links from "@/sections/common/Links";
import Council from "@/sections/about/Council";
import Directions from "@/sections/about/Directions";

const AboutPage = () => {
  return (
    <main>
      <About showBtn={false} />
      <Council />
      <Directions />
      <Applications />
      <Links />
    </main>
  );
};

export default AboutPage;
