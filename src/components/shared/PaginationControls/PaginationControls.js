'use client';

import styles from './PaginationControls.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PaginationControls({
	currentPage,
	totalPages,
	onPageChange,
	itemsPerPage,
	totalItems
}) {
	if (totalPages <= 1) {
		return null;
	}

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxPagesToShow = 5; // Máximo de números de página visíveis (ex: 1 ... 4 5 6 ... 10)
		const halfPagesToShow = Math.floor(maxPagesToShow / 2);

		if (totalPages <= maxPagesToShow) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			if (currentPage <= halfPagesToShow + 1) {
				for (let i = 1; i <= maxPagesToShow - 1; i++) {
					pageNumbers.push(i);
				}
				pageNumbers.push('...');
				pageNumbers.push(totalPages);
			} else if (currentPage >= totalPages - halfPagesToShow) {
				pageNumbers.push(1);
				pageNumbers.push('...');
				for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
					pageNumbers.push(i);
				}
			} else {
				pageNumbers.push(1);
				pageNumbers.push('...');
				for (let i = currentPage - Math.floor((maxPagesToShow - 2) / 2); i <= currentPage + Math.ceil((maxPagesToShow - 2) / 2) - 1; i++) {
					pageNumbers.push(i);
				}
				pageNumbers.push('...');
				pageNumbers.push(totalPages);
			}
		}
		return pageNumbers;
	};

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<nav className={styles.paginationContainer} aria-label="Navegação de páginas">
			<div className={styles.paginationInfo}>
				Mostrando {startItem}-{endItem} de {totalItems} produtos
			</div>
			<ul className={styles.paginationList}>
				<li>
					<button
						onClick={handlePrevious}
						disabled={currentPage === 1}
						className={`${styles.pageButton} ${styles.prevNextButton}`}
						aria-label="Página anterior"
					>
						<FaChevronLeft /> Anterior
					</button>
				</li>
				{getPageNumbers().map((page, index) => (
					<li key={index}>
						{typeof page === 'number' ? (
							<button
								onClick={() => onPageChange(page)}
								className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
								aria-current={currentPage === page ? 'page' : undefined}
								aria-label={`Ir para página ${page}`}
							>
								{page}
							</button>
						) : (
							<span className={styles.ellipsis}>...</span>
						)}
					</li>
				))}
				<li>
					<button
						onClick={handleNext}
						disabled={currentPage === totalPages}
						className={`${styles.pageButton} ${styles.prevNextButton}`}
						aria-label="Próxima página"
					>
						Próximo <FaChevronRight />
					</button>
				</li>
			</ul>
		</nav>
	);
}