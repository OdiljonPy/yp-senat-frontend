"use client";
import React, { useEffect } from "react";
import About from "@/sections/common/About";
import Applications from "@/sections/common/Applications";
import Links from "@/sections/common/Links";
import Council from "@/sections/about/Council";
import Directions from "@/sections/about/Directions";

const AboutPage = () => {

  useEffect(() => {
    const link = window.location.href;

    if (link.includes("#")) {
      const id = link.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

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
