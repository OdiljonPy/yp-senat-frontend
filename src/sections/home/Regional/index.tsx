"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import Title from "@/components/shared/Title";
import Map from "@/components/shared/Map";
import useStore from "@/stores/useStore";
import { useApiQuery } from "@/hooks/useApi";
import { RegionResponse } from "@/types";
import style from "./style.module.scss";

const Regional = () => {
  const t = useTranslations('Commission')
  const [selectedRegion, setSelectedRegion] = useState<
    number
  >(11);
  const { setSelectedCommission, selectedCommission } = useStore()
  const { data, error, isLoading } = useApiQuery<RegionResponse>(
    "/commission/", {
    region: selectedRegion
  }
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }

  return (
    <section className={clsx("container", style.regional)}>
      <Title centred>{t("regional")}</Title>
      <div className={style.content}>
        <Map
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          className={style.map}
        />

        <div className={style.comissionsBox}>
          <div className={style.titleBox}>
            <h4>Komissiya a’zolari</h4>
            <Link
              href="/parliament"
              onClick={() => {
                if (selectedCommission.id) {
                  setSelectedCommission(0, 0, selectedCommission.id)
                }
              }}
            >
              Barchasi
            </Link>
          </div>
          <ul className={style.list}>
            {
              isLoading && <div className={clsx("loader", style.loader)}></div>
            }
            {
              !isLoading && (
                data?.result?.content.map((item) => (
                  <li data-aos="fade-up" className={style.item} key={item.id}>
                    <Image
                      className={style.image}
                      src={item.image}
                      alt=""
                      width={80}
                      height={105}
                    />
                    <div className={style.info}>
                      <h5 className={style.name}>{item.full_name}</h5>
                      <p className={style.position}>{item.description}</p>
                    </div>
                  </li>
                ))
              )
            }
          </ul>
          <div className={style.line} />
        </div>
      </div>
    </section>
  );
};

export default Regional;
