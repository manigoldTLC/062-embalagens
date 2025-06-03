// src/app/categoria/[categorySlug]/CategoryProductsClient.js
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import productsData from '@/data/products.json';
import styles from './categoriaPage.module.scss'; // Reutilizar o SCSS da página de categoria
import FilterBarContainer from '@/containers/BuscaPage/FilterBarContainer/FilterBarContainer';
import PaginationControls from '@/components/shared/PaginationControls/PaginationControls';

const ITEMS_PER_PAGE = 8;

export default function CategoryProductsClient({ categoryDetails }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [allProductsForThisCategory, setAllProductsForThisCategory] = useState([]);
	const [productsToDisplay, setProductsToDisplay] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Para filtros DENTRO da categoria (ex: subcategoria, tags específicas) e ordenação
	const initialSubCategory = searchParams.get('subcategoria') || ''; // Exemplo de filtro adicional
	const initialSort = searchParams.get('ordenar') || 'relevance';
	const initialPage = parseInt(searchParams.get('pagina') || '1', 10);

	const [selectedSubCategory, setSelectedSubCategory] = useState(initialSubCategory);
	const [sortOption, setSortOption] = useState(initialSort);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(1);

	const subCategoryOptions = useMemo(() => {
		if (!categoryDetails || !categoryDetails.subcategories) return [];
		return [
			{ value: "", label: "Todas Subcategorias" },
			...categoryDetails.subcategories.map(sub => ({ value: sub.id, label: sub.name }))
		];
	}, [categoryDetails]);

	const updateURLParams = useCallback((newParams) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		Object.entries(newParams).forEach(([key, value]) => {
			if (value) current.set(key, String(value));
			else current.delete(key);
		});
		const search = current.toString();
		const query = search ? `?${search}` : "";
		router.push(`${pathname}${query}`);
	}, [searchParams, router, pathname]);

	useEffect(() => {
		if (categoryDetails) {
			const subcategoryIds = categoryDetails.subcategories ? categoryDetails.subcategories.map(sub => sub.id) : [];
			const initialProducts = productsData.products.filter(product =>
				product.category_id === categoryDetails.id ||
				(product.subcategory_id && subcategoryIds.includes(product.subcategory_id))
			);
			setAllProductsForThisCategory(initialProducts);
		}
	}, [categoryDetails]);

	useEffect(() => {
		setIsLoading(true);
		let results = [...allProductsForThisCategory];

		if (selectedSubCategory) {
			results = results.filter(product => product.subcategory_id === selectedSubCategory);
		}

		if (sortOption === 'name-asc') results.sort((a, b) => a.name.localeCompare(b.name));
		else if (sortOption === 'name-desc') results.sort((a, b) => b.name.localeCompare(a.name));
		else if (sortOption === 'price-asc') results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		else if (sortOption === 'price-desc') results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

		const calculatedTotalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
		setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);

		const newCurrentPage = Math.min(currentPage, calculatedTotalPages > 0 ? calculatedTotalPages : 1);
		if (currentPage !== newCurrentPage && results.length > 0) { // Só atualiza se houver resultados
			setCurrentPage(newCurrentPage);
			updateURLParams({ pagina: newCurrentPage > 1 ? newCurrentPage : undefined });
		}

		const startIndex = (newCurrentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		setProductsToDisplay(results.slice(startIndex, endIndex));

		setIsLoading(false);
	}, [allProductsForThisCategory, selectedSubCategory, sortOption, currentPage, updateURLParams]);

	useEffect(() => {
		const subCatFromUrl = searchParams.get('subcategoria') || '';
		const sortFromUrl = searchParams.get('ordenar') || 'relevance';
		const pageFromUrl = parseInt(searchParams.get('pagina') || '1', 10);

		if (subCatFromUrl !== selectedSubCategory) setSelectedSubCategory(subCatFromUrl);
		if (sortFromUrl !== sortOption) setSortOption(sortFromUrl);
		if (pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);
	}, [searchParams, selectedSubCategory, sortOption, currentPage]);

	const handleSubCategoryChange = (subCategoryId) => {
		setCurrentPage(1);
		setSelectedSubCategory(subCategoryId);
		updateURLParams({ subcategoria: subCategoryId, pagina: undefined });
	};

	const handleSortChange = (sortValue) => {
		setCurrentPage(1);
		setSortOption(sortValue);
		updateURLParams({ ordenar: sortValue, pagina: undefined });
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		updateURLParams({ pagina: pageNumber > 1 ? pageNumber : undefined });
	};

	if (!categoryDetails) {
		return <div className={styles.loadingState}>Carregando categoria...</div>; // Ou uma mensagem de erro melhor
	}
	if (isLoading && allProductsForThisCategory.length === 0 && categoryDetails) {
		// Ainda carregando os produtos iniciais da categoria
		return <div className={styles.loadingState}>Carregando produtos da categoria...</div>;
	}


	return (
		<div className={styles.categoryPageContainer}>
			<div className={styles.breadcrumb}>
				<Link href="/">Início</Link> <span>&gt;</span>
				<Link href="/produtos">Produtos</Link> <span>&gt;</span>
				<span>{categoryDetails.name}</span>
			</div>

			<header className={styles.pageHeader}>
				<h1>{categoryDetails.name}</h1>
				{categoryDetails.description && <p className={styles.pageSubtitle}>{categoryDetails.description}</p>}
			</header>

			{/* Passando apenas o filtro de subcategoria se existir */}
			<FilterBarContainer
				categories={subCategoryOptions} // Passa as subcategorias como opções de filtro
				selectedCategory={selectedSubCategory} // Estado da subcategoria selecionada
				onCategoryChange={handleSubCategoryChange} // Handler para subcategoria
				categoryFilterLabel="Filtrar por Subcategoria" // Label customizado
				sortOption={sortOption}
				onSortChange={handleSortChange}
				showMainCategoryFilter={false} // Para não mostrar o filtro de "Categoria" principal aqui
			/>

			{productsToDisplay.length > 0 ? (
				<>
					<p className={styles.resultsCount}>
						Mostrando {productsToDisplay.length} de {allProductsForThisCategory.filter(p => !selectedSubCategory || p.subcategory_id === selectedSubCategory).length} produto(s)
					</p>
					<div className={styles.productsGrid}>
						{productsToDisplay.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
						itemsPerPage={ITEMS_PER_PAGE}
						totalItems={allProductsForThisCategory.filter(p => !selectedSubCategory || p.subcategory_id === selectedSubCategory).length}
					/>
				</>
			) : (
				<div className={styles.noResults}>
					<p>Nenhum produto encontrado com os critérios selecionados nesta categoria.</p>
					{selectedSubCategory && (
						<button onClick={() => handleSubCategoryChange('')} className={styles.actionButton}>
							Ver todos em {categoryDetails.name}
						</button>
					)}
				</div>
			)}
		</div>
	);
}