'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import VideoPlayer from '@/app/components/VideoPlayer';
import { useVideoData } from '@/app/hooks/video';
import { useSearch } from '@/app/hooks/search';
import { usePagination } from '@/app/hooks/pagination';

export default function Home() {
  const { videos, selectedVideo, setSelectedVideo } = useVideoData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { filteredVideos } = useSearch(videos, searchQuery);
  const { paginatedVideos, totalPages } = usePagination(
    filteredVideos,
    currentPage
  );

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      <main className='flex-1 md:flex md:items-center md:justify-center order-1 md:order-2'>
        {selectedVideo ? (
          <div className='w-full max-w-5xl p-4 md:p-8'>
            <VideoPlayer videoData={selectedVideo} />
          </div>
        ) : (
          <div className='text-gray-500 p-4'>
            <p>Select a video to get started</p>
          </div>
        )}
      </main>
      <Sidebar
        videos={paginatedVideos}
        selectedVideo={selectedVideo}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
        onVideoSelect={setSelectedVideo}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
      />
    </div>
  );
}
