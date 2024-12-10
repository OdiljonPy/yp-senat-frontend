"use client"
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import Title from "@/components/shared/Title";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useApiQuery } from "@/hooks/useApi";
import style from "./style.module.scss";
import 'swiper/css';
interface Links {
  id: number;
  link: string,
  title: string
}

interface LinksResponse {
  result: Links[]
}
const Links = () => {
  const t = useTranslations("Global")
  const { data, isLoading } = useApiQuery<LinksResponse>(
    "/base/additional/",
  );
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <section className={style.links}>
      <div className="container">
        <Title centred>{t('useful_links')}</Title>
        <div >
          <Swiper
            slidesPerView={3}
            spaceBetween={24}
            loop={true}
            navigation
            freeMode
            className={style.content}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {
              data?.result.map((link) => {
                return (
                  <SwiperSlide onClick={() => window.open(link.link, "_blank")} className={style.item} key={link.id}>
                    <div className={style.imageBox}>
                      <Image src="/images/oliy-majlis.png" alt="" width={81} height={46} />
                      <b>{link.title}</b>
                    </div>
                    <div className={style.linkBox}>
                      <Image src="/icons/link.svg" alt="" width={24} height={24} />
                      <p>{link.link}</p>
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Links;
