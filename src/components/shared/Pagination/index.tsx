import clsx from 'clsx'
import Image from 'next/image'
import styles from './style.module.scss'
import { useTranslations } from 'next-intl'
interface PaginationProps {
    totalPages: number,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    onPageChange?: (page: number) => void,
    className?: string
}

export default function Pagination({ totalPages = 10, onPageChange, className, currentPage, setCurrentPage }: PaginationProps) {
    const t = useTranslations("Global")

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
        onPageChange?.(page)
    }
    const renderPageNumbers = () => {
        const pages = [];

        pages.push(
            <div
                key={1}
                className={`${styles.pageItem} ${currentPage === 1 ? styles.active : ''}`}
                onClick={() => handlePageChange(1)}
            >
                1
            </div>
        );

        if (totalPages > 5) {
            if (currentPage > 3) {
                pages.push(
                    <div key="ellipsis1" className={`${styles.pageItem} ${styles.ellipsis}`}>
                        ...
                    </div>
                );
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(
                    <div
                        key={i}
                        className={`${styles.pageItem} ${currentPage === i ? styles.active : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </div>
                );
            }

            if (currentPage < totalPages - 2) {
                pages.push(
                    <div key="ellipsis2" className={`${styles.pageItem} ${styles.ellipsis}`}>
                        ...
                    </div>
                );
            }
        } else {
            for (let i = 2; i < totalPages; i++) {
                pages.push(
                    <div
                        key={i}
                        className={`${styles.pageItem} ${currentPage === i ? styles.active : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </div>
                );
            }
        }

        if (totalPages > 1) {
            pages.push(
                <div
                    key={totalPages}
                    className={`${styles.pageItem} ${currentPage === totalPages ? styles.active : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </div>
            );
        }

        return pages;
    };


    return (
        <nav className={clsx(styles.pagination, className)} aria-label="Pagination">
            <button
                className={`${styles.pageItem} ${styles.arrow} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Image src="/icons/arrow-left-black.svg" alt="arrow" width={20} height={20} />
                {t('prev')}
            </button>

            {renderPageNumbers()}

            <button
                className={`${styles.pageItem} ${styles.arrow} ${currentPage === totalPages ? styles.disabled : ''
                    }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t('next')}
                <Image src="/icons/arrow-right-black.svg" alt="arrow" width={20} height={20} />
            </button>
        </nav>
    )
}

