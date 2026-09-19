import React from "react";

interface BonaLogoProps {
  theme: "dark" | "light";
}

const BonaLogo = ({ theme }: BonaLogoProps) => {
  return (
    <img
      src={theme === "dark" ? "./logo-dark.webp" : "./logo-light.webp"}
      alt="nkematu bonaventure chinechere, senior software engineer"
      className="max-w-full w-20"
    />
  );
};

export default BonaLogo;
