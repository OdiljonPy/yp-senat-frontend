"use client"
import React from 'react'
import HeroDetail from '@/sections/common/DetailHero'
import Accordion from '@/components/shared/Accordion'
import { useApiQuery } from '@/hooks/useApi';
import { useTranslations } from 'next-intl';
import LoadingScreen from '@/components/shared/LoadingScreen';
interface QuestionItem {
  question: string;
  answer: string;
  id: string,
  is_visible: boolean
}
interface FAQ {
  result: QuestionItem[],
  ok: boolean
}
const Questions = () => {
  const { data, isLoading, error } = useApiQuery<FAQ>(`/base/faq/`);
  const t = useTranslations('Footer')
  if (isLoading) return <LoadingScreen/>;
  if (error) return <LoadingScreen/>;
  const text = t('questions')
  const links = [{ title: "Bosh sahifa", path: "/" }, { title: "Xududiy komissiyalar", path: '/commissions' }];
  return (
    <>
      <HeroDetail items={links} type={1} text={text} />
      <div className='container'>
        <Accordion data={data?.result || []}/>
      </div>
    </>
  )
}

export default Questions
