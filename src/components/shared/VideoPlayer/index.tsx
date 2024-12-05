"use client"

import { useRef, useState, useEffect } from "react"
import { SkipBack, SkipForward, Play, Pause } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { VideoItemProps } from "@/types/video"
import Image from "next/image"
import YouTube from 'react-youtube'

export default function VideoPlayer({ videos }: VideoItemProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverTime, setHoverTime] = useState(0)
  const [hoverPosition, setHoverPosition] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubeRef = useRef<YouTube>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const currentVideo = videos[currentVideoIndex]

  useEffect(() => {
    if (isYouTubeVideo(currentVideo.video)) {
      // Reset state for YouTube videos
      setCurrentTime(0)
      setDuration(0)
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, currentVideo])

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    return `${hours ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleVideoProgress = (value: number[]) => {
    const time = value[0]
    if (isYouTubeVideo(currentVideo.video)) {
      youtubeRef.current?.internalPlayer.seekTo(time)
    } else if (videoRef.current) {
      videoRef.current.currentTime = time
    }
    setCurrentTime(time)
  }

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1))
  }

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0))
  }

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const percentage = x / width
      const time = percentage * duration
      setHoverTime(time)
      setHoverPosition(x)
    }
  }

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const onYouTubeReady = (event: { target: any }) => {
    setDuration(event.target.getDuration())
  }

  const onYouTubeStateChange = (event: { target: any, data: number }) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true)
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false)
    }
  }

  const onYouTubePlayPause = () => {
    if (isPlaying) {
      youtubeRef.current?.internalPlayer.pauseVideo()
    } else {
      youtubeRef.current?.internalPlayer.playVideo()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="w-full">
      <div className="relative aspect-video bg-black rounded-3xl overflow-hidden">
        {isYouTubeVideo(currentVideo.video) ? (
          <YouTube
            videoId={getYouTubeVideoId(currentVideo.video)}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                controls: 0,
                showinfo: 0,
                rel: 0
              },
            }}
            onReady={onYouTubeReady}
            onStateChange={onYouTubeStateChange}
            className="w-full h-full"
            ref={youtubeRef}
          />
        ) : (
          <video
            ref={videoRef}
            src={currentVideo.video}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}

        {/* Custom Controls Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-6"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="space-y-3">
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className={cn(
                "relative transition-all duration-200",
                isHovering ? "opacity-100" : "opacity-80"
              )}
              onMouseMove={handleProgressHover}
            >
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleVideoProgress}
                className="relative z-10"
              />
              {isHovering && (
                <div 
                  className="absolute bottom-full left-0 bg-black/90 text-[#fff] text-xs py-1 px-2 rounded transform -translate-x-1/2 mb-2"
                  style={{ left: `${hoverPosition}px` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevVideo}
                  className="text-[#fff] hover:bg-white/10 h-8 w-8"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isYouTubeVideo(currentVideo.video) ? onYouTubePlayPause : () => setIsPlaying(!isPlaying)}
                  className="text-[#fff] hover:bg-white/10 h-8 w-8"
                >
                  {isPlaying ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4" />
                  }
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextVideo}
                  className="text-[#fff] hover:bg-white/10 h-8 w-8"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <span className="text-[#fff] text-sm ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#fff] text-sm font-medium line-clamp-1">
                  {currentVideo.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setCurrentVideoIndex(index)}
            className={cn(
              "relative aspect-video rounded-3xl overflow-hidden transition-all",
              currentVideoIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Play className="w-8 h-8 text-[#fff]/80" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

