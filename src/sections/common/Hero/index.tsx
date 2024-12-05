"use client";
import React, { useState, useCallback, useEffect } from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Title from "@/components/shared/Title";
import clsx from "clsx";
import Image from "next/image";
import useStore from "@/stores/useStore";
import { CommissionResponse, MandatResponse, Region } from "@/types";

import style from "./style.module.scss";
import { isEmpty } from "lodash";
interface Props {
  title: string;
  surveys?: boolean;
  categories?: CommissionResponse | MandatResponse,
  search?: string,
  setSearch?: (q: string) => void,
  breadcrumbItems?: { title: string; path: string }[];
}

const HeroCommissions = ({ surveys = false, categories, search, setSearch, title, breadcrumbItems }: Props) => {
  const { selectedCommission, setSelectedCommission } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategory = selectedCommission.index !== null ? categories?.result[selectedCommission.index] : null;

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const onSelect = (index: number, id: number) => {
    setSelectedCommission(0, index, id);
    setIsOpen(false);
  }

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCommission(0, 0, selectedCategory.id)
    }
  }, [])

  return (
    <section className={clsx(style.hero, surveys && style.surveys)}>
      <div className="container">
        <div
          className={style.content}
          style={{
            background: 'linear-gradient(180deg, rgba(44, 43, 56, 0.7) 0%, rgba(44, 43, 56, 0.7) 100%), url("/images/commissions-hero.png")',
          }}
        >
          <BreadCrumb
            items={breadcrumbItems || []}
            type={1}
          />
          <Title className={style.title}>
            {title}
          </Title>
          <div className={clsx("container", style.filters)}>
            <div className={style.searchWrapper}>
              <Image
                src="/icons/search-gray.svg"
                alt=""
                className={style.searchIcon}
                width={24}
                height={24}
              />
              <input
                type="text"
                className={style.searchInput}
                placeholder={
                  surveys
                    ? "So‘rovnoma nomi"
                    : "Komissiyalar bo'ylab izlash"
                }
                value={search}
                onChange={(e) => setSearch && setSearch(e.target.value)}
              />
            </div>

            <div className={style.dropdownWrapper}>
              <button
                className={style.dropdownButton}
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span>{!isEmpty(selectedCategory) ? selectedCategory.name : "Doimiy kommissiyalar"}</span>
                <Image
                  src="/icons/chevron.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>

              {isOpen && (
                <div className={style.dropdownList} role="listbox">
                  {
                    categories?.result.map((item: any, index: number) => (
                      <div
                        key={item.id}
                        className={clsx(
                          style.dropdownItem,
                          selectedCommission.index === index &&
                          style.selected
                        )}
                        onClick={() => onSelect(index, item.id)}
                        role="option"
                        aria-selected={selectedCommission.index === index}
                      >
                        {item.name}
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCommissions;
