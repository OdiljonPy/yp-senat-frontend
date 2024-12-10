"use client"
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import Title from '@/components/shared/Title'
import Image from 'next/image'
import Pagination from '@/components/shared/Pagination'
import { CommissionRes, MandatResponse } from '@/types'
import style from './style.module.scss'

interface Props {
  commissions: CommissionRes | [],
  currentPage: number,
  setCurrentPage: (page: number) => void,
  mandat?: MandatResponse | null,
  setSelectedMandat: (i: number) => void,
  selectedMandat: number,
  title: string,
  isParliament?: boolean
}

const YouthCommissions: React.FC<Props> = ({
  commissions,
  currentPage,
  setCurrentPage,
  mandat,
  setSelectedMandat,
  selectedMandat,
  title,
  isParliament = false
}) => {
  const defaultCommissions = {
    result: {
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0,
      numberOfElements: 0,
      first: false,
      last: false,
      empty: true,
      content: [],
    },
    ok: true,
  };


  const data = Array.isArray(commissions) ? defaultCommissions : commissions;

  return (
    <section className={clsx("container", style.commissions)}>
      <div className={style.header}>
        <Title size='sm'>{title}</Title>
        <p className={style.description}>{data.result.totalElements} tadan {data.result.numberOfElements} tasi koʻrsatilmoqda</p>
      </div>

      <ul className="flex">
        {mandat?.result.map((item, i) => (
          <li
            key={item.id}
            className={
              i === selectedMandat
                ? "text-[#2C2B38] font-bold text-[24px] cursor-pointer border-l-4 border-[black] px-4"
                : "cursor-pointer text-[24px] text-[#2C2B38B2] font-medium px-4"
            }
            onClick={() => {
              setSelectedMandat(i)
              setCurrentPage(1)
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {
        isParliament && (
          <div className={style.parliamentList}>
            {
              data?.result.content.map((item) => (
                <div className={style.parliamentItem} key={item.id}>
                  <Image src={item.image} alt={item.full_name} width={172} height={172} className={style.image} />
                  <div className={style.cardContent}>
                    <b className={style.name}>{item.full_name}</b>
                    <p className={style.description}>{item.description}</p>
                    <p className={style.phone}>Telefon: {item.phone_number}</p>
                    <div className={style.socials}>
                      <Link href={item.facebook}>
                        <Image src="/icons/facebook.svg" alt="facebook" width={32} height={32} />
                      </Link>
                      <Link href={item.linkedin}>
                        <Image src="/icons/linkedin.svg" alt="linkedin" width={32} height={32} />
                      </Link>
                      <Link href={item.twitter}>
                        <Image src="/icons/twitter.svg" alt="twitter" width={32} height={32} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
      {
        !isParliament && (
          <div className={style.commissionsList}>
            {
              data?.result.content.map((item) => (
                <div className={style.commission} key={item.id}>
                  <Image src={item.image} alt={item.full_name} width={172} height={172} className={style.image} />
                  <div className={style.cardContent}>
                    <b>{item.full_name}</b>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }

      <Pagination
        className={style.pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalPages={data.result.totalPages}
      />
    </section>
  )
}

export default YouthCommissions