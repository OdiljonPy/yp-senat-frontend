"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./style.module.scss";
import { slides } from "@/constants";
import Image from "next/image";
import Button from "@/components/shared/Button";
import CarouselBottom from "@/components/shared/CarouselBottom";
import { useApiQuery } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
interface BannerItem {
  created_at: string;
  id: number,
  image: string,
  is_published: boolean,
  title: string,
  published_date: string,
  views_count: number
}
interface FAQ {
  result: BannerItem[],
  ok: boolean
}
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, error } = useApiQuery<FAQ>(
    "/banner/",
  );
  const router = useRouter()
  const t = useTranslations('Global')
  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.result && data.result.length > 1) {
        setCurrentSlide((currentSlide + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  if (isLoading) {
    return <LoadingScreen/>
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }
  const handleClick =(id: number)=>{
    router.push(`/news/${id}`)
  }
  return (
    <section className={style.hero}>
      {data?.result.map((slide, index) => (
        <div
          key={slide.id + index}
          className={clsx(style.slide, currentSlide === index && style.active)}
          style={{
            background: `linear-gradient(180deg, #2c2b38 0%, rgba(44, 43, 56, 0) 100%), url(${slide.image})`,
          }}
        >
          <div className={clsx("container", style.content)}>
            <div className={style.dateBox}>
              <div className={style.date}>
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span>{formatDate(slide.published_date)}</span>
              </div>
              <div className={style.date}>
                <Image src="/icons/eye.svg" alt="" width={20} height={20} />
                <span>{slide.views_count}</span>
              </div>
            </div>

            <h1>{slide.title}</h1>
            <Button type="secondary" click={()=>handleClick(slide.id)}>{t('more')}</Button>
          </div>
        </div>
      ))}
      {data?.result?.length ? (
        <CarouselBottom
          length={data.result.length}
          setCurrent={setCurrentSlide}
          current={currentSlide}
          className={style.pagination}
        />
      ) : null}
    </section>
  );
};

export default Hero;
