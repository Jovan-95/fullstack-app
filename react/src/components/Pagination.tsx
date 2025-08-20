type PaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({
    currentPage,
    lastPage,
    onPageChange,
}: PaginationProps) => {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
