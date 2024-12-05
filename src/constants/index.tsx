import { MenuItem, Slide } from "@/types";

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "about",
    href: "/about",
  },
  {
    id: 2,
    title: "commissions",
    href: "/commissions",
    submenu: [
      {
        id: 1,
        title:
          "alwaysCommissions",
        href: "/commissions",
        icon: "/icons/ball.svg",
      },
      {
        id: 2,
        title: "regionalCommissions",
        href: "/parliament",
        icon: "/icons/scales.svg",
      }
    ],
  },
  {
    id: 4,
    title: "news",
    href: "/news",
  },
  {
    id: 5,
    title: "appeal",
    href: "/appeal",
  },
  {
    id: 6,
    title: "surveys",
    href: "/surveys",
  }
];

const slides: Slide[] = [
  {
    id: 1,
    title: "Yoshlar tadbirkorligini qo'llab-quvvatlash va yo'lga qo'yish",
    image:
      "/images/hero.png",
    date: "18.06.2024",
    startDate: "July 14 , 2022",
  },
  {
    id: 2,
    title: "Yoshlar parlamentining navbatdagi yig'ilishi",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    date: "20.06.2024",
    startDate: "July 14 , 2022",
  },
  {
    id: 3,
    title: "Xalqaro hamkorlik aloqalari",
    image:
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2069&auto=format&fit=crop",
    date: "22.06.2024",
    startDate: "July 14 , 2022",
  },
];



export enum Regions {
  ANDIJON_VILOYATI = 1,
  BUXORO_VILOYATI = 2,
  FARGONA_VILOYATI = 3,
  JIZZAX_VILOYATI = 4,
  QASHQADARYO_VILOYATI = 5,
  NAMANGAN_VILOYATI = 6,
  NAVOIY_VILOYATI = 7,
  SAMARQAND_VILOYATI = 8,
  SIRDARYO_VILOYATI = 9,
  SURXONDARYO_VILOYATI = 10,
  TOSHKENT_SHAHAR = 11,
  TOSHKENT_VILOYATI = 12,
  XORAZM_VILOYATI = 13,
  QORAQALPOGISTON_RESPUBLIKASI = 14,
}


export { menuItems, slides };
