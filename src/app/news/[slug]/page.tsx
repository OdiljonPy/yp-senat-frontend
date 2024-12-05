"use client";
import React from "react";
import { useTranslations } from "next-intl";
import HeroDetail from "@/sections/common/DetailHero";
import Image from "next/image";
import NewsCard from "@/components/shared/NewsCard";
import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { NewsDetailResponse } from "@/types/news";
import { stripHtml } from "@/lib/utils";

const NewsDetail = () => {
  const { slug } = useParams();
  const t = useTranslations('News')
  const links = [
    { title: "mainPage", path: "/" },
    { title: "news", path: "/news" },
  ];
  const { data } = useApiQuery<NewsDetailResponse>(`/post/${slug}/`);
  const text =
    "Yoshlar parlamenti: Yoshlar ovozini eshitish va ularning kelajagini shakllantirish maydoni";
  return (
    <>
      <HeroDetail items={links} text={t('hero_detail_title')} type={1} />
      <div className="container">
        <div className="relative top-[-112px]">
          <Image
            src={data?.result?.image || "/placeholder-image.jpg"}
            alt={data?.result?.title || "News detail"}
            width={0}
            height={0}
            className="rounded-[12px]"
            style={{ width: "100%", height: "377px", objectFit: "cover" }}
            priority // Muhim rasm uchun
            loading="eager" // Yuklanishni tezlashtirish uchun (priority bilan mos)
            placeholder="blur" // Rasm yuklanayotganda xira ko'rinishni ta'minlaydi
            blurDataURL="/path-to-blur-image.jpg" // Xira ko'rinish uchun URL
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive yuklashni optimallashtiradi
          />
          <div className="mt-[56px] flex gap-10">
            <div className="basis-2/3 flex flex-col gap-9">
              <div className="flex gap-7">
                <div className="flex gap-1">
                  <Image
                    src="/icons/calendar-blue.svg"
                    alt="Calendar"
                    width={20}
                    height={20}
                  />
                  <span>{data?.result?.published_date}</span>
                </div>
                <div className="flex gap-1">
                  <Image
                    src="/icons/eye-blue.svg"
                    alt="Calendar"
                    width={20}
                    height={20}
                  />
                  <span>{data?.result?.views_count}</span>
                </div>
              </div>
              <p className="text-[20px]">
                {stripHtml(data?.result?.description)}
              </p>
              <div className="flex flex-col gap-7">
                <div className="w-[80%] h-[1px] bg-[#2C2B38]"></div>
              </div>
              <Image
                src={data?.result?.image || "/placeholder-image.jpg"}
                width={560}
                height={319}
                className="rounded-[12px]"
                alt={data?.result?.title || "News detail"}
              />
              <p className="text-[20px]">
                {stripHtml(data?.result?.short_description)}
              </p>
            </div>
            <div className="basis-1/3">
              <h2 className="text-[18px] font-semibold">Aloqador loyihalar</h2>
              {data?.related_posts.map((item) => (
                <div key={item.id} className="w-full mt-5">
                  <NewsCard data={item} isShow={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
