"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { stripHtml } from "@/lib/utils";
import CarouselBottom from "@/components/shared/CarouselBottom";
import Button from "@/components/shared/Button";
import { useApiQuery } from "@/hooks/useApi";
import { AboutResponse } from "@/types";
import style from "./style.module.scss";
interface IProps {
  showBottom?: boolean;
  commissions?: AboutResponse | null,
  showBtn?: boolean
}
interface AboutImage {
  about_us: number,
  image: string,
  id: number
}
interface AboutResponsePage {
  result: {
    description: string,
    short_description: string,
    images: AboutImage[]
  }
}
const About = ({
  showBottom = false,
  commissions,
  showBtn = true
}: IProps) => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data } = useApiQuery<AboutResponsePage>(
    "/base/about/",
  );
  const slides = commissions?.result.images || data?.result.images || [];
  const handleClick = () => {
    router.push('/about')
  }

  return (
    <section className={clsx("container", style.section)}>
      <div className={style.about}>
        {
          slides?.map((slide, index) => {
            return (
              <div
                className={clsx(
                  style.slide,
                  currentSlide === index && style.active
                )}
                key={slide.id}
              >
                <div data-aos="fade-right" className={style.imageBox}>
                  <Image
                    src={slide.image}
                    alt={`${slide.id}`}
                    width={500}
                    height={500}
                  />
                </div>
                <div data-aos="fade-left" className={style.content}>
                  <h3>{commissions ? "Kommissiya haqida ma’lumot" : "Biz haqimizda"}</h3>
                  <p>{stripHtml(commissions?.result.description ? commissions?.result.description : data?.result.short_description)}</p>
                  {
                    showBtn ? <Button type="secondary" click={handleClick}>Batafsil</Button> : ""
                  }
                </div>
              </div>
            );
          })
        }
        <CarouselBottom
          current={currentSlide}
          setCurrent={setCurrentSlide}
          length={slides.length}
          className={style.pagination}
          type="white"
        />
      </div>
      {
        showBottom && <div className={style.bottom}>
          {
            slides.map((item, index) => {
              return (
                <Image
                  key={'bottom' + item.id}
                  src={item.image}
                  alt={`${item.id}`}
                  className="cursor-pointer"
                  onClick={() => setCurrentSlide(index)}
                  width={286}
                  height={180}
                />
              )
            })
          }
        </div>
      }
    </section>
  );
};

export default About;
