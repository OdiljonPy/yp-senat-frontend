"use client"
import React from "react";
import Title from "@/components/shared/Title";
import Link from "next/link";
import Image from "next/image";
import { useApiQuery } from "@/hooks/useApi";
import style from "./style.module.scss";
import { useTranslations } from "next-intl";
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
  const { data, isLoading, error } = useApiQuery<LinksResponse>(
    "/base/additional/",
  );
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Yuklanmoqda...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }
  return (
    <section className={style.links}>
      <div className="container">
        <Title centred>{t('useful_links')}</Title>
        <div className={style.content}>
          {data?.result.map((link) => {
            return (
              <Link
                className={style.item}
                href={link.link}
                key={link.id}
              >
                <div className={style.imageBox}>
                  <Image src="/images/oliy-majlis.png" alt="" width={81} height={46} />
                  <b>{link.title}</b>
                </div>
                <div className={style.linkBox}>
                  <Image src="/icons/link.svg" alt="" width={24} height={24} />
                  <p>{link.link}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Links;
