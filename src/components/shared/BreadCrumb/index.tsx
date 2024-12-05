import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
interface IElements {
  title: string;
  path?: string;
}

interface IProps {
  items: IElements[];
  type: number // 0 yoki 1 berish kerak
}

const BreadCrumb = ({ items, type }: IProps) => {
  const t = useTranslations('Breadcrumb')

  return (
    <ul className="flex items-center space-x-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.path ? (
            <Link href={item.path} className={type === 0 ? "text-[#012F87]" : "text-[#FFFFFFB2]"}>
              {t(item.title)}
            </Link>
          ) : (
            <span className={type === 0 ? "text-[#012F87]" : "text-[#FFFFFFB2]"}>{t(item.title)}</span>
          )}
          {index < items.length - 1 && (
            <span className={type === 0 ? "text-[#012F87]" : "text-[#FFFFFFB2]"}>/</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumb;
