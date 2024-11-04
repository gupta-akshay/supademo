import { useState, useEffect } from 'react';

export default function useVideoData() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      const response = await import('@/app/data/data.json');
      const data = response.default as YoutubeResponse;
      setVideos(data.items);
    };
    loadVideos();
  }, []);

  return {
    videos,
    selectedVideo,
    setSelectedVideo,
  };
}