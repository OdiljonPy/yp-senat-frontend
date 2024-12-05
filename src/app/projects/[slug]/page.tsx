"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import HeroDetail from '@/sections/common/DetailHero'
import Image from 'next/image'
import { stripHtml, formatDate } from '@/lib/utils'
import { useApiQuery } from '@/hooks/useApi'

interface ProjectResponse {
  result: {
    description: string,
    name: string,
    short_description: string,
    image: string,
    file: string,
    created_at: string,
  }
}
const ProjectDetail = () => {
  const { slug } = useParams()
  const { data } = useApiQuery<ProjectResponse>(`/project/${slug}/`);
  const links = [
    { title: "mainPage", path: "/" },
    { title: 'projects', path: '/projects' },
  ];
  const text = "Yoshlar tadbirkorligini qo‘llab-quvvatlash dasturi yo'lga qo'yildi"
  return (
    <>
      <HeroDetail items={links} text={text} type={1} />
      <div className="container">
        <div className="relative top-[-112px]">
          <Image
            src={data?.result?.image || "/placeholder-image.jpg"}
            alt={data?.result?.name || "Project detail"}
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
            <div className="flex flex-col gap-9">
              <div className="flex gap-7">
                <div className="flex gap-1">
                  <Image
                    src="/icons/calendar-blue.svg"
                    alt="Calendar"
                    width={20}
                    height={20}
                  />
                  <span>{formatDate(data?.result?.created_at || "20.11.2024")}</span>
                </div>
                <div className="flex gap-1">
                  <Image
                    src="/icons/eye-blue.svg"
                    alt="Calendar"
                    width={20}
                    height={20}
                  />
                  {/* <span>{data?.result?}</span> */}
                </div>
              </div>
              <p className="text-[20px]">
                {stripHtml(data?.result?.description)}
              </p>
              <div className="flex flex-col gap-7">
                <div className="w-[80%] h-[1px] bg-[#2C2B38]"></div>
              </div>
              <div className='flex gap-9'>
                <Image
                  src={data?.result?.image || "/placeholder-image.jpg"}
                  width={560}
                  height={319}
                  className="rounded-[12px]"
                  alt={data?.result?.name || "Project detail"}
                />
                <p className="text-[20px]">
                  {stripHtml(data?.result?.short_description)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail
