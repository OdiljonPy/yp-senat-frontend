"use client"
import React from 'react'
import HeroDetail from '@/sections/common/DetailHero'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { useApiQuery } from '@/hooks/useApi'
import { VideoResponse } from '@/types/video'
const Media = () => {
  const text = "Video Lavhalar"
  const links = [{ title: "Bosh sahifa", path: "/" }, { title: "Video Lavhalar" }];
  const { data, isLoading, error } = useApiQuery<VideoResponse>(
    "/video/",
  );
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
    <>
      <HeroDetail items={links} type={1} text={text} />
      <section className='container'>
        {data?.result.length && <VideoPlayer videos={data?.result} />}
      </section>
    </>
  )
}

export default Media
