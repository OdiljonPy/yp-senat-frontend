"use client";
import React, { useState, useTransition } from "react";
import MenuLink from "@/components/shared/MenuLink";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/constants";

import { setUserLocale } from "@/lib/locale";
import { Locale } from "@/i18n/config";
import { useApiQuery } from "@/hooks/useApi";
import { ProjectsResponse } from "@/types";
import { get } from "lodash";
import { useAccessibility } from "@/contexts/accessibility-context";
import style from "./style.module.scss";

const langs = ["UZ", "RU", "EN"]

const Header = () => {
  const t = useTranslations("Header")
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isApplicationPage = pathname === "/appeal" || pathname === "/about";
  const { data } = useApiQuery<ProjectsResponse>(
    "/base/contact/",
  );

  const { isOpenWidget, setIsOpenWidget } = useAccessibility()
  const [langDropdown, setLangDropdown] = useState(false)
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeMenu = () => {
    setOpenMenuIndex(null);
    setIsMenuOpen(false);
  };

  const toggleLangDropdown = () => {
    setLangDropdown(!langDropdown);
  };

  function onChangeLang(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
    setLangDropdown(false)
  }

  return (
    <>
      <header className="container relative z-[49] items-center justify-between sm:grid sm:grid-cols-4 flex sm:py-0 py-2">
        <Link className="col-span-1" href="/">
          <Image
            src={isApplicationPage ? "/images/logo.png" : "/images/logo-white.png"}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="sm:w-[170px] sm:h-[95px] w-[80px] h-[44px]"
            width={170}
            height={95}
            priority
          />
        </Link>
        <div className="col-span-3 sm:block hidden">
          <div className="text-sm flex items-center justify-between pr-12 py-3 border-b">
            <div className="flex gap-4">
              <b className="primary-light">{t("tel")}:</b>
              <Link
                className={clsx(
                  isApplicationPage ? "text-white-500" : "text-white-700"
                )}
                href={`tel:${get(data?.result, "phone_number", "")}`}
              >
                {get(data?.result, "phone_number", "")}
              </Link>
            </div>
            <div className="flex gap-4">
              <b className="primary-light">{t("address")}</b>
              <Link
                className={clsx(
                  isApplicationPage ? "text-white-500" : "text-white-700"
                )}
                href=""
              >
                {get(data?.result, "address", "")}
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" type="button"
                  className={clsx(
                    " cursor-pointer",
                    isApplicationPage ? "text-white-500" : "text-white-700",
                    isPending && 'pointer-events-none opacity-60'
                  )}
                  onClick={toggleLangDropdown}
                >
                  {locale.toLocaleUpperCase()}
                </button>
                {langDropdown && (
                  <div
                    id="dropdown"
                    className={style.dropdownList}
                  >
                    {
                      langs.filter(item => item !== locale.toLocaleUpperCase()).map(lang => (
                        <div
                          key={lang}
                          onClick={() => {
                            onChangeLang(lang.toLocaleLowerCase())
                          }}
                          className={style.dropdownItem}
                        >
                          {lang.toLocaleUpperCase()}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
              <Image
                className="cursor-pointer"
                width={24}
                height={24}
                onClick={() => setIsOpenWidget(!isOpenWidget)}
                src={
                  isApplicationPage ? "/icons/glass-gray.svg" : "/icons/glass.svg"
                }
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center justify-between pr-12 py-5">
            <ul className="flex items-center lg:gap-10 gap-4">
              {menuItems.map((menu, index) => (
                <MenuLink
                  key={menu.title + index}
                  isOpen={openMenuIndex === index}
                  onClick={() => handleMenuToggle(index)}
                  {...menu}
                  onClose={closeMenu}
                />
              ))}
            </ul>
          </div>
        </div>

        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden block cursor-pointer">
          <Image src={isApplicationPage ? "/icons/burger.svg" : "/icons/burger-white.svg"} alt="Burger" width={24} height={24} />
        </div>
      </header>
      <div
        className={clsx(style.mobileMenu, isMenuOpen && style.open)}
      >
        <div className={style.top}>
          <Link onClick={() => setIsMenuOpen(false)} href="/">
            <Image
              src={"/images/logo-white.png"}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="sm:w-[170px] sm:h-[95px] w-[80px] h-[44px]"
              width={170}
              height={95}
              priority
            />
          </Link>
          <Image
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => {
              setIsOpenWidget(!isOpenWidget)
              setIsMenuOpen(false)
            }}
            src={"/icons/glass.svg"}
            alt=""
          />
        </div>
        <div className={style.langs}>
          {langs.map((lang, index) => (
            <div
              key={lang + index}
              onClick={() => {
                setIsMenuOpen(false)
                onChangeLang(lang.toLocaleLowerCase())
              }}
              className={clsx(style.lang, lang === locale.toLocaleUpperCase() && style.active)}
            >
              {lang.toLocaleUpperCase()}
            </div>
          ))}
        </div>
        <nav>
          <ul className={style.menus}>
            {menuItems.map((menu, index) => (
              <MenuLink
                key={menu.title + index}
                isOpen={openMenuIndex === index}
                onClick={() => {
                  handleMenuToggle(index)
                }}
                {...menu}
                onClose={closeMenu}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
