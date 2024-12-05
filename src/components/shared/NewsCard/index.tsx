import React from "react";
import Image from "next/image";
import { stripHtml } from '@/lib/utils'
import style from "./style.module.scss";

interface Props {
  data: {
    id: number;
    title?: string;
    name?: string;
    description: string;
    image: string;
    date?: string;
    endDate?: string;
    published_date?: string,
    views_count?: number
  };
  isShow?: boolean;
  isLoading?: boolean;
}

const NewsCard = ({ data, isShow, isLoading }: Props) => {

  if (isLoading) {
    return <div className={style.newsCard}>
      <span className="skeleton"></span>
    </div>
  }
  return (
    <div className={style.newsCard}>
      <div className={style.imageWrapper}>
        <Image
          src={data.image}
          alt={data.title || data.name || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={style.image}
          priority
        />
      </div>
      <div className={style.content}>
        <h5 className={style.title}>{stripHtml(data.title ?? data.name ?? "")}</h5>
        <p className={style.description}>{stripHtml(data.description)}</p>
        {isShow && (
          <div className={style.dateBox}>
            <div className={style.date}>
              <Image
                src="/icons/calendar-blue.svg"
                alt="Calendar"
                width={20}
                height={20}
                className={style.icon}
              />
              <span>{data.date || data.published_date}</span>
            </div>
            <div className={style.date}>
              <Image
                src="/icons/eye-blue.svg"
                alt="Views"
                width={20}
                height={20}
                className={style.icon}
              />
              <span>{data.views_count}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;

