interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearch }: SearchBarProps) {
  return (
    <div className='p-4 md:p-5 border-b border-gray-100'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search videos...'
          className='w-full px-4 py-2.5 pl-10 bg-[var(--background)] border border-[var(--gray-200)] rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 
                   text-sm transition-all duration-200 shadow-sm
                   text-[var(--foreground)] placeholder-[var(--gray-500)]'
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)] w-4 h-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </div>
  );
}
