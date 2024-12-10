"use client"

import { useState } from "react"
import ReactPlayer from 'react-player';
import clsx from "clsx"
import { Play } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { VideoItemProps } from "@/types/video"

import style from './style.module.scss'

export default function VideoPlayer({ videos }: VideoItemProps) {
  const [currentVideo, setCurrentVideo] = useState(videos[0])
  const [isPlaying, setIsPlaying] = useState(false)

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const getYouTubeVideoId = (url: string) => {
    const parts = url.split('/');
    const lastPart = parts.length > 0 ? parts.pop() : '';
    if (lastPart) {
      const youtubeId = lastPart.split('?')[0];
      return youtubeId;
    }
  }

  return (
    <div className="w-full">
      <div className={style.playerWrapper}>
        <ReactPlayer
          url={isYouTubeVideo(currentVideo.video) ? `https://www.youtube.com/watch?v=${getYouTubeVideoId(currentVideo.video)}` : currentVideo.video}
          controls
          width="100%"
          height="100%"
          className={style.player}
          playing={isPlaying}
        />

        <div onClick={() => setIsPlaying(!isPlaying)} className={clsx(style.overlay, isPlaying && style.playing)}></div>
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => {
              setCurrentVideo(video)
              setIsPlaying(false)
            }}
            className={cn(
              "relative aspect-video rounded-3xl overflow-hidden transition-all",
              currentVideo.id === video.id ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.video)}/0.jpg`}
                alt={video.title}
                width={300}
                height={100}
                objectFit="cover"
                className="rounded-3xl w-full h-full object-cover absolute inset-0"

              />
              <Play className="relative z-20 w-8 h-8 text-[#fff]/80" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}