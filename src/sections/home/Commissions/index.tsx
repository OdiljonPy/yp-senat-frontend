"use client"
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Title from "@/components/shared/Title";
import useStore from "@/stores/useStore";
import style from "./style.module.scss";
import { useTranslations } from "next-intl";
import { useApiQuery } from "@/hooks/useApi";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useRouter } from "next/navigation";
import { CommissionResponse } from "@/types";
const Comissions = () => {
  const { data, isLoading } = useApiQuery<CommissionResponse>(`/commission/category/`);
  const { setSelectedCommission, selectedCommission } = useStore()
  const t = useTranslations('Commission')
  const router = useRouter()
  if (isLoading) {
    return <LoadingScreen />
  }
  const handleClick = (index: number, id: number) => {
    setSelectedCommission(0, index, id)
    router.push('/commissions')
  }
  return (
    <section className={style.commissions}>
      <div className="container">
        <Title centred>{t('title')}</Title>
        <div className={style.content}>
          {data?.result?.map((item, index) => (
            <div
              className={clsx(style.item, index % 2 && style.reverse)}
              key={item.id}
              onClick={() => handleClick(index, item.id)}
            >
              <Image
                className={style.icon}
                src={item.icon || '/icons/ball.svg'}
                alt=""
                width={40}
                height={40}
              />
              <span className={style.line} />
              <b className={style.title}>{item.name}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comissions;
