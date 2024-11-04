import { useState, useEffect } from 'react';

export default function useVideoData() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);

  // Load videos from local JSON file on component mount
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
