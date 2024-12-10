"use client";
import React from "react";
import clsx from "clsx";
import style from "./style.module.scss";
import Button from "@/components/shared/Button";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useTranslations } from "next-intl";
interface IElements {
  title: string;
  path?: string;
}

interface IProps {
  items: IElements[];
  type: number,
  text: string,
  isShowBtn?: boolean
}

const MainHero = ({ isShowBtn = true, ...props }: IProps) => {
  const t = useTranslations('Global')
  const { items, type, text } = props
  const url = "/images/news-hero.webp"
  return (
    <section className={style.hero}>
      <div
        className={clsx(style.item)}
        style={{
          background: `linear-gradient(180deg, #2c2b38 0%, rgba(44, 43, 56, 0) 100%), url(${url})`,
        }}
      >
        <div className={clsx("container", style.content)}>
          <BreadCrumb items={items} type={type} />
          <h1>{text}</h1>
          <div>
            {
              isShowBtn && <Button type="secondary">{t('more')}</Button>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
