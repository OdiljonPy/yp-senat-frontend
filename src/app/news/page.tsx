"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import NewsCard from "@/components/shared/NewsCard";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApi";
import Links from "@/sections/common/Links";
import MainHero from "@/sections/common/MainHero";
import {
  NewsCategoryItem,
  NewsCategoryResponse,
  NewsResponse,
} from "@/types/news";
import LoadingScreen from "@/components/shared/LoadingScreen";
const News = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations('News')
  const router = useRouter();
  const { data: categories } =
    useApiQuery<NewsCategoryResponse>("/categories/");
  const category_lists: NewsCategoryItem[] = [
    { name: "Hammasi", id: 0 },
    ...(categories?.result || []),
  ];
  const {
    data: news,
    isLoading,
    error,
  } = useApiQuery<NewsResponse>("/posts/", {
    page: currentPage,
    page_size: 6,
    ...(activeTab !== 0 ? { category_id: activeTab } : {}),
  });
  if (isLoading) {
    return <LoadingScreen />
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }
  const newsDetail = (slug: number) => {
    router.push(`/news/${slug}`);
  };
  const links = [{ title: "mainPage", path: "/" }, { title: "news", path: "/news" }];
  const text =
    "Yoshlar tadbirkorligini qo‘llab-quvvatlash dasturi yo‘lga qo‘yildi";

  return (
    <>
      <MainHero items={links} type={1} text={t('hero_title')} />
      <section className="container">
        <div className="pb-[56px] md:pb-[106px] pt-[10px]">
          <h1 className="text-[20px] md:text-[28px] lg:text-[36px] text-[#2C2B38] mb-[24px] md:mb-[36px] font-bold">
            {t('title')}
          </h1>
          <ul
            className="flex overflow-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {category_lists.map((item) => (
              <li
                key={item.id}
                className={
                  item.id === activeTab
                    ? "text-[#2C2B38] font-bold text-[16px] md:text-[20px] lg:[text-24px] cursor-pointer border-l-4 border-[black] px-2 md:px-3 lg:px-4 whitespace-nowrap"
                    : "cursor-pointer text-[16px] md:text-[20px] lg:[text-24px] text-[#2C2B38B2] font-medium px-2 md:px-3 lg:px-4 whitespace-nowrap"
                }
                onClick={() => setActiveTab(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-[40px] md:mt-[56px]">
            {news?.result?.content.map((item) => (
              <div key={item.id} onClick={() => newsDetail(item.id)}>
                <NewsCard data={item} isShow={true} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Links />
    </>
  );
};

export default News;