"use client";
import React from "react";
import clsx from "clsx";
import Title from "@/components/shared/Title";
import Image from "next/image";
import style from "./style.module.scss";
import { useApiQuery } from "@/hooks/useApi";
interface ManagementItem {
  full_name: string,
  image: string,
  id: number,
  order: number,
  description: string
}
interface ManagementResponse {
  result: {
    content: ManagementItem[]
  }
}
const Council = () => {
  const { data, isLoading, error } = useApiQuery<ManagementResponse>("/management/");
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
    <section id="council" className={clsx("container", style.council)}>
      <Title size="sm">Parlament rahbariyati</Title>
      <div className={style.content}>
        {data?.result.content.map((item) => (
          <div className={style.card} key={item.id}>
            <Image
              src={item.image}
              alt={item.full_name}
              width={266}
              height={172}
              className={style.image}
            />
            <h4 className={style.title}>{item.full_name}</h4>
            <p className={style.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Council;
