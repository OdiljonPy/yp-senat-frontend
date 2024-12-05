import React from "react";
import clsx from "clsx";

import style from "./style.module.scss";
interface Props {
  type?: "black" | "white";
  current: number;
  setCurrent: (current: number) => void;
  length: number;
  className?: string;
}
const CarouselBottom = ({
  className,
  current,
  setCurrent,
  length,
  type = "black",
}: Props) => {
  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + length) % length);
  };

  return (
    <div className={clsx(style.pagination, style[type], className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={prevSlide}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.12155 10.5H21.0002V13.5H8.12155L13.0609 18.4393L10.9396 20.5606L2.37891 12L10.9396 3.43933L13.0609 5.56065L8.12155 10.5Z"
          fill="#2C2B38"
          fillOpacity="0.7"
        />
      </svg>
      <div className={style.dots}>
        {Array.from({ length: length }).map((_, index) => (
          <div
            className={clsx(style.dot, index === current && style.active)}
            key={index}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={nextSlide}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4775 13.557H2.92383V10.443H15.4775L10.6628 5.31595L12.7306 3.11401L21.0752 12L12.7306 20.886L10.6628 18.6841L15.4775 13.557Z"
          fill="#2C2B38"
          fillOpacity="0.7"
        />
      </svg>
    </div>
  );
};

export default CarouselBottom;
