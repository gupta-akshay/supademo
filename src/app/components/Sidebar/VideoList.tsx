import VideoItem from './VideoItem';

interface VideoListProps {
  videos: YoutubeVideo[];
  selectedVideo: YoutubeVideo | null;
  searchQuery: string;
  onVideoSelect: (video: YoutubeVideo) => void;
  onSearch: (query: string) => void;
}

export default function VideoList({
  videos,
  selectedVideo,
  searchQuery,
  onVideoSelect,
  onSearch,
}: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
        <svg
          className='w-16 h-16 text-[var(--gray-300)] mb-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <p className='text-[var(--gray-600)] text-base mb-2'>
          No videos found for "
          <span className='font-medium'>{searchQuery}</span>"
        </p>
        <button
          onClick={() => onSearch('')}
          className='px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] 
                   hover:bg-[var(--primary-hover)] rounded-lg transition-colors'
        >
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto'>
      {videos.map((video) => (
        <VideoItem
          key={`${video.id.videoId}-${video.snippet.title}`}
          video={video}
          isSelected={video.id.videoId === selectedVideo?.id.videoId}
          onSelect={onVideoSelect}
        />
      ))}
    </div>
  );
}
