import { useMemo } from 'react';
import VideoList from './VideoList';
import { YoutubeVideo } from '@/app/types';

interface SidebarProps {
  videos: YoutubeVideo[];
  selectedVideo: YoutubeVideo | null;
  currentPage: number;
  searchQuery: string;
  onVideoSelect: (video: YoutubeVideo) => void;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
}

const VIDEOS_PER_PAGE = 10;

export default function Sidebar({
  videos,
  selectedVideo,
  currentPage,
  searchQuery,
  onVideoSelect,
  onPageChange,
  onSearch,
}: SidebarProps) {
  const filteredVideos = useMemo(() => {
    return videos.filter(
      (video) =>
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.snippet.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    return filteredVideos.slice(startIndex, startIndex + VIDEOS_PER_PAGE);
  }, [filteredVideos, currentPage]);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  return (
    <div className='flex flex-col min-h-[400px] md:h-screen flex-1 md:flex-none w-full md:w-[350px] bg-white shadow-lg order-2 md:order-1'>
      <div className='p-4 md:p-5 border-b border-gray-100'>
        Searchbar Goes Here
      </div>
      <VideoList
        videos={paginatedVideos}
        selectedVideo={selectedVideo}
        searchQuery={searchQuery}
        onVideoSelect={onVideoSelect}
        setSearchQuery={onSearch}
      />
      <div className='p-3 md:p-4 border-t border-gray-100 bg-[var(--background)]'>
        Pagination Goes Here
      </div>
    </div>
  );
}
