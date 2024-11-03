import VideoItem from './VideoItem';
import type { YoutubeVideo } from '@/app/types';

interface VideoListProps {
  videos: YoutubeVideo[];
  selectedVideo: YoutubeVideo | null;
  searchQuery: string;
  onVideoSelect: (video: YoutubeVideo) => void;
  setSearchQuery: (query: string) => void;
}

export default function VideoList({
  videos,
  selectedVideo,
  searchQuery,
  onVideoSelect,
  setSearchQuery,
}: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
        Clear Search Results
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto'>
      {videos.map((video) => (
        <VideoItem
          key={video.id.videoId}
          video={video}
          isSelected={video.id.videoId === selectedVideo?.id.videoId}
          onSelect={onVideoSelect}
        />
      ))}
    </div>
  );
}
