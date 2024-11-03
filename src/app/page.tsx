'use client';

import { useEffect, useState } from 'react';
import { YoutubeResponse, YoutubeVideo } from '@/app/types';

export default function Home() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const response = await import('@/app/data/data.json');
      const data = response.default as YoutubeResponse;
      setVideos(data.items);
    }
    loadVideos();
  }, []);

  return (
    <div>
      <main>
        {videos.length > 0 ? (
          <div>
            {videos.map(video => (
              <div key={video.id.videoId}>{video.snippet.title}</div>
            ))}
          </div>
        ) : (
            <div>No videos found</div>
        )}
      </main>
    </div>
  );
}
