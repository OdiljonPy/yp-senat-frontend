"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import style from "./style.module.scss";
import Title from "@/components/shared/Title";
import clsx from "clsx";
import NewsCard from "@/components/shared/NewsCard";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApi";
import {
  NewsCategoryItem,
  NewsCategoryResponse,
  NewsResponse,
} from "@/types/news";
const News = () => {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations('News')
  const router = useRouter();
  const { data: categories } =
    useApiQuery<NewsCategoryResponse>("/categories/");
  const category_lists: NewsCategoryItem[] = [
    { name: t('all'), id: 0 },
    ...(categories?.result || []),
  ];
  const {
    data: news,
    isLoading
  } = useApiQuery<NewsResponse>("/posts/", {
    page: 1,
    page_size: 6,
    ...(activeTab !== 0 ? { category_id: activeTab } : {}),
  });

  const newsDetail = (slug: number) => {
    router.push(`/news/${slug}`);
  };
  return (
    <section className={style.news}>
      <div className={clsx("container", style.content)}>
        <div className={style.left}>
          <Title>{t('title')}</Title>
          <ul className={style.types}>
            {category_lists.map((type) => (
              <li
                onClick={() => setActiveTab(type.id)}
                className={clsx(
                  style.type,
                  activeTab === type.id && style.active
                )}
                key={type.id}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.right}>
          {
            isLoading && (new Array(4).fill(0).map((_, i) => (
              <NewsCard isLoading={isLoading} isShow key={i} data={{} as any} />
            )))
          }
          {
            !isLoading && (
              news?.result.content.slice(0, 4).map((item) => (
                <div onClick={() => newsDetail(item.id)} key={item.id}>
                  <NewsCard isLoading={isLoading} isShow data={item} />
                </div>
              ))
            )
          }
        </div>
      </div>
    </section>
  );
};

export default News;
