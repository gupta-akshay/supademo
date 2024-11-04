import { useMemo } from 'react';

export default function useSearch(videos: YoutubeVideo[], searchQuery: string) {
  const filteredVideos = useMemo(() => {
    return videos.filter(
      (video) =>
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.snippet.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  return { filteredVideos };
}
