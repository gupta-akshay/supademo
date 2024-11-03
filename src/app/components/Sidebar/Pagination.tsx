interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='p-3 md:p-4 border-t border-[var(--gray-100)] bg-[var(--background)]'>
      <div className='flex justify-between items-center gap-2 md:gap-4'>
        <button
          className='px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   bg-gray-100 text-gray-700 hover:bg-gray-200]'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='text-xs md:text-sm text-gray-600] font-medium'>
          {currentPage} / {totalPages}
        </span>
        <button
          className='px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   bg-gray-100] text-gray-700 hover:bg-gray-200'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
