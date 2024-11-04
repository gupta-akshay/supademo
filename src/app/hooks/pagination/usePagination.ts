import { useMemo } from 'react';
import { VIDEOS_PER_PAGE } from '@/app/constants/pagination';

export default function usePagination(
  filteredVideos: YoutubeVideo[],
  currentPage: number
) {
  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    return filteredVideos.slice(startIndex, startIndex + VIDEOS_PER_PAGE);
  }, [filteredVideos, currentPage]);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  return { paginatedVideos, totalPages };
}
