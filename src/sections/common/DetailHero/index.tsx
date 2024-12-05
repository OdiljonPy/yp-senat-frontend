"use client";
import React from "react";
import clsx from "clsx";
import style from "./style.module.scss";
import BreadCrumb from "@/components/shared/BreadCrumb";
interface IElements {
  title: string;
  path?: string;
}

interface IProps {
  items: IElements[];
  type: number,
  text: string
}
const HeroDetail = (props:IProps) => {
  const {items,type,text} = props
  const url = "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2069&auto=format&fit=crop"
  return (
    <section className={style.hero}>
       <div
          className={clsx(style.item)}
          style={{
            background: `linear-gradient(180deg, #2c2b38 0%, rgba(44, 43, 56, 0) 100%), url(${url})`,
          }}
        >
          <div className={clsx("container", style.content)}>
            <BreadCrumb items={items} type={type}/>
            <h1>{text}</h1>
          </div>
        </div>
    </section>
  );
};

export default HeroDetail;
