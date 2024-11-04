import VideoList from './VideoList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

interface SidebarProps {
  videos: YoutubeVideo[];
  selectedVideo: YoutubeVideo | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onVideoSelect: (video: YoutubeVideo) => void;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
}

export default function Sidebar({
  videos,
  selectedVideo,
  currentPage,
  totalPages,
  searchQuery,
  onVideoSelect,
  onPageChange,
  onSearch,
}: SidebarProps) {
  return (
    <div className='flex flex-col min-h-[400px] md:h-screen flex-1 md:flex-none w-full md:w-[350px] bg-white shadow-lg order-2 md:order-1'>
      <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
      <VideoList
        videos={videos}
        selectedVideo={selectedVideo}
        searchQuery={searchQuery}
        onVideoSelect={onVideoSelect}
        onSearch={onSearch}
      />
      {videos.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}
