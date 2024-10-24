import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <section className="mt-6 flex items-center justify-between">
            {/* Previous Button */}
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className={`flex items-center px-4 py-2 rounded-full bg-blue-600 text-white transition-all duration-300 ease-in-out ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
            >
                <AiOutlineLeft className="mr-2" /> Previous
            </button>

            {/* Page Indicator */}
            <span className="flex items-center justify-center w-full text-center text-lg font-semibold">
                <span className="text-gray-600">Page</span>
                <span className="mx-2 text-blue-600">{currentPage + 1}</span>
                <span className="text-gray-600">of</span>
                <span className="mx-2 text-blue-600">{totalPages}</span>
            </span>

            {/* Next Button */}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage >= totalPages - 1}
                className={`flex items-center px-4 py-2 rounded-full bg-blue-600 text-white transition-all duration-300 ease-in-out ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
            >
                Next <AiOutlineRight className="ml-2" />
            </button>
        </section>
    );
};

export default Pagination;
