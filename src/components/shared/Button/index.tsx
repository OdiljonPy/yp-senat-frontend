import React from "react";

import style from "./style.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "primary" | "secondary";
  click?: ()=> void
};
const Button = ({ children, type = "primary", click }: Props) => {
  return <button className={style[type]} onClick={click}>{children}</button>;
};

export default Button;
