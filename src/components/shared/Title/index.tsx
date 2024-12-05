import React from "react";
import clsx from "clsx";
import style from "./style.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  centred?: boolean;
  size?: "sm" | "md" | "lg";
}

const Title = ({ children, className, centred, size = "md" }: Props) => {
  return (
    <h2
      className={clsx(
        style[size],
        style.title,
        className,
        centred && "text-center"
      )}
    >
      {children}
    </h2>
  );
};

export default Title;
