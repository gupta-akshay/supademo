'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';

export default function Home() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadVideos = async () => {
      const response = await import('@/app/data/data.json');
      const data = response.default as YoutubeResponse;
      setVideos(data.items);
    };
    loadVideos();
  }, []);

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      <main className='fflex-1 md:flex md:items-center md:justify-center order-1 md:order-2'>
        {selectedVideo ? (
          <div className='w-full max-w-5xl p-4 md:p-8'>Selected Video</div>
        ) : (
          <div className='text-gray-500 p-4'>
            <p>Select a video to get started</p>
          </div>
        )}
      </main>
      <Sidebar
        videos={videos}
        selectedVideo={selectedVideo}
        currentPage={currentPage}
        searchQuery={searchQuery}
        onVideoSelect={setSelectedVideo}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
      />
    </div>
  );
}
