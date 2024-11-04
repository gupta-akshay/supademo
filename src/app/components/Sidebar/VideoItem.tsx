import Image from 'next/image';
import { formatDistanceToNow } from '@/app/utils/date';

interface VideoItemProps {
  video: YoutubeVideo;
  isSelected: boolean;
  onSelect: (video: YoutubeVideo) => void;
}

export default function VideoItem({
  video,
  isSelected,
  onSelect,
}: VideoItemProps) {
  const handleVideoSelect = () => {
    onSelect(video);
    if (window.innerWidth < 768) {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={`p-3 md:p-4 cursor-pointer hover:bg-[var(--gray-50)] transition-colors
      ${
        isSelected
          ? 'bg-[var(--primary)]/5 border-l-4 border-[var(--primary)]'
          : 'border-l-4 border-transparent'
      }`}
      onClick={handleVideoSelect}
    >
      <div className='flex gap-3 md:gap-4'>
        <div className='relative w-24 md:w-32 h-16 md:h-20 rounded-lg overflow-hidden flex-shrink-0'>
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            fill
            sizes='(min-width: 768px) 128px, 96px'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex-1 min-w-0 space-y-1'>
          <h3 className='font-medium text-xs md:text-sm text-[var(--foreground)] line-clamp-2'>
            {video.snippet.title}
          </h3>
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <span>{video.snippet.channelTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
