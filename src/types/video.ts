export interface VideoItem {
    id: number
    title: string
    video: string
  }
  export interface VideoItemProps {
    videos: VideoItem[]
  }
  export interface VideoResponse {
    result: VideoItem[]
  }
  
  