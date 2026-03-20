import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={isFirst}
        className="px-4 h-full rounded bg-dark hover:bg-dark/60 text-white disabled:opacity-50"
      >
        <FaArrowLeft />
      </button>

      <span className="text-dark">
        {page}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={isLast}
        className="px-4 h-full rounded bg-dark hover:bg-dark/60 text-white disabled:opacity-50"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;