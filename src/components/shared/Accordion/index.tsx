"use client";

import React, { useState, useRef } from "react";

interface AccordionItem {
  question: string;
  answer: string;
  id: string,
  is_visible: boolean
}
interface PropType {
  data?: AccordionItem[] | undefined
}
import Image from "next/image";

const Accordion = ({ data }: PropType) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto sm:max-w-[90%]">
      {(data ?? []).map((item, index) => (
        <div
          key={index}
          className={`border-[0.7px] ${activeIndex === index
              ? "border-[#A6A6C3] shadow-lg shadow-[rgba(74, 58, 255, 0.19)]"
              : "border-gray-200"
            } rounded-lg mb-3 overflow-hidden shadow-md py-4 px-3 sm:py-6 sm:px-5`}
        >
          <div
            className="p-2 flex justify-between items-center cursor-pointer sm:p-4"
            onClick={() => toggleAccordion(index)}
          >
            <div className="max-w-[90%]">
              <h3 className="text-[16px] font-medium text-[#2C2B38] sm:text-[18px]">
                {item.question}
              </h3>
            </div>
            <div
              className={`w-[30px] h-[30px] rounded-[50%] flex items-center justify-center sm:w-[40px] sm:h-[40px] ${activeIndex === index ? "bg-black" : "shadow-md"
                }`}
            >
              {activeIndex !== index ? (
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width={16} // default width
                  height={16} // default height
                  sizes="(max-width: 768px) 12px, (max-width: 1200px) 14px, 16px" // responsive sizes
                  className="sm:w-[14px] sm:h-[14px] lg:w-[16px] lg:h-[16px]" // for Tailwind users
                />
              ) : (
                <Image
                  src="/icons/arrow-down-white.svg"
                  alt="arrow-down"
                  width={16} // default width
                  height={16} // default height
                  sizes="(max-width: 768px) 12px, (max-width: 1200px) 14px, 16px" // responsive sizes
                  className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] lg:w-[16px] lg:h-[16px]" // for Tailwind users
                />
              )}
            </div>
          </div>
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className={`transition-[height] duration-300 ease-in-out overflow-hidden ${activeIndex === index ? "h-auto" : "h-0"
              }`}
            style={{
              height:
                activeIndex === index
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
            }}
          >
            <div className="p-3 bg-[#F9F9FB] text-[#2C2B38B2] text-[14px] sm:text-[16px]">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
