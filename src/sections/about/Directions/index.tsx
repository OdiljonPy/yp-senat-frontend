"use client"
import React from "react";
import clsx from "clsx";

import style from "./style.module.scss";
import Title from "@/components/shared/Title";
import Image from "next/image";
import { useApiQuery } from "@/hooks/useApi";
import { stripHtml } from "@/lib/utils";
interface AboutImage {
  about_us: number,
  image: string,
  id: number
}
interface AboutResponse {
  result: {
  description: string,
  short_description: string,
  images: AboutImage[]
  }
}
const Directions = () => {
  const { data, isLoading, error } = useApiQuery<AboutResponse>(
    "/base/about/",
  );
  return (
    <section className={clsx("container", style.directions)}>
      <Title size="sm">Yoʼnalishlarimiz</Title>
      <p className={style.description}>
        {stripHtml(data?.result.description)}
      </p>

      {/* <div className={style.content}>
        <Image src="/images/directions.png" width={560} height={320} alt="" />
        <div className={style.right}>
          <Title size="sm">Biz nima qilamiz?</Title>
          <ul className={style.list}>
            <li>Yoshlarning huquq va manfaatlarini himoya qilish</li>
            <li>Yoshlarning ijtimoiy tashabbuslarini qoʼllab-quvvatlash</li>
            <li>
              Taʼlim, kasbiy rivojlanish va ishga joylashishga koʼmaklashish
            </li>
            <li>
              Yoshlarning ijtimoiy, siyosiy va iqtisodiy faolligini oshirish
            </li>
          </ul>
        </div>
      </div> */}
    </section>
  );
};

export default Directions;
