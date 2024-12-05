"use client"
import React from "react";
import { useTranslations } from "next-intl";
import { useApiQuery } from '@/hooks/useApi';
import clsx from "clsx";
import Title from "@/components/shared/Title";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/shared/LoadingScreen";
import style from "./style.module.scss";
interface AppealResponse {
  result: {
    explained_appeals: number,
    incoming_appeals: number,
    rejected_appeals: number,
    resolved_appeals: number,
  }
}
const Applications = () => {
  const t = useTranslations('Appeals')
  const router = useRouter()
  const { data, isLoading } = useApiQuery<AppealResponse>(`/statistics/`);
  if (isLoading) return <LoadingScreen />;
  const moveAppeal = () => {
    router.push('/appeal')
  }
  return (
    <section className={clsx("container", style.applications)}>
      <div className={style.content}>
        <div className={style.item}>
          <h5>{data?.result.resolved_appeals}</h5>
          <p>{t('resolved')}</p>
        </div>
        <div className={style.item}>
          <h5>{data?.result.incoming_appeals}</h5>
          <p>{t('incoming')}</p>
        </div>
        <div className={style.item}>
          <h5>{data?.result.explained_appeals}</h5>
          <p>{t('explained')}</p>
        </div>
        <div className={style.item}>
          <h5>{data?.result.rejected_appeals}</h5>
          <p>{t('rejected')}</p>
        </div>
      </div>
      <div className={style.right}>
        <Title>{t('title')}</Title>
        <p>
          {t('appeal_desc')}
        </p>
        <button onClick={moveAppeal}>{t('apply')}</button>
      </div>
    </section>
  );
};

export default Applications;
