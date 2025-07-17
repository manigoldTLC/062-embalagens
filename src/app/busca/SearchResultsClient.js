'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import productsData from '@/data/products.json';
import styles from './busca.module.scss';
import FilterBarContainer from '@/containers/BuscaPage/FilterBarContainer/FilterBarContainer';
// import PromotionalBanner from '@/components/PromotionalBanner/PromotionalBanner';


export default function SearchResultsClient() {
	const searchParams = useSearchParams();
	const query = searchParams.get('q');

	const [searchTerm, setSearchTerm] = useState('');
	const [productsToDisplay, setProductsToDisplay] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState('');
	const [sortOption, setSortOption] = useState('relevance');

	const allCategories = useMemo(() => productsData.categories || [], []);

	useEffect(() => {
		setIsLoading(true);
		const initialQuery = query || '';
		setSearchTerm(initialQuery);
		document.title = initialQuery
			? `Busca por "${initialQuery}" - 062 Embalagens`
			: "Busca de Produtos - 062 Embalagens";

		let results = productsData.products || [];

		if (initialQuery) {
			const lowerCaseQuery = initialQuery.toLowerCase();
			results = results.filter(product => {
				const matchName = product.name.toLowerCase().includes(lowerCaseQuery);
				const matchTags = product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
				const matchShortDesc = product.description_short.toLowerCase().includes(lowerCaseQuery);
				const category = allCategories.find(cat => cat.id === product.category_id);
				const matchCategoryName = category ? category.name.toLowerCase().includes(lowerCaseQuery) : false;
				return matchName || matchTags || matchShortDesc || matchCategoryName;
			});
		}

		if (selectedCategory) {
			results = results.filter(product => product.category_id === selectedCategory);
		}

		if (sortOption === 'name-asc') {
			results.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === 'name-desc') {
			results.sort((a, b) => b.name.localeCompare(a.name));
		} else if (sortOption === 'price-asc') {
			results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		} else if (sortOption === 'price-desc') {
			results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
		}

		setProductsToDisplay(results);
		setIsLoading(false);
	}, [query, selectedCategory, sortOption, allCategories]);

	// const bannerData = {
	// 	title: "Super Oferta em Embalagens Selecionadas!",
	// 	subtitle: "Descontos de até 30% para deixar seus presentes e produtos ainda mais especiais.",
	// 	ctaText: "Conferir Ofertas",
	// 	ctaLink: "/produtos?filtro=ofertas-embalagens",
	// 	imageUrl: "/images/hero/img1.png",
	// 	imageAlt: "Embalagens em promoção",
	// 	backgroundColor: "#1D3A9B",  
	// 	textColor: "#FFFFFF",
	// 	buttonTextColor: "#1A1A1A", 
	// 	buttonBackgroundColor: "#FFD200"
	// };

	if (isLoading && query) {
		return <div className={styles.loadingState}>Buscando produtos...</div>;
	}

	if (!query && !isLoading && productsToDisplay.length === 0) {
		return (
			<div className={styles.buscaPageContainer}>
				<header className={styles.pageHeader}>
					<h1>Buscar Produtos</h1>
					<p>Digite um termo na barra de busca do site para encontrar produtos.</p>
				</header>
			</div>
		);
	}

	const resultTitle = searchTerm
		? `Resultados para: "${searchTerm}"`
		: "Todos os Produtos";

	const categoryName = selectedCategory && allCategories.find(c => c.id === selectedCategory)?.name;


	return (
		<div className={styles.buscaPageContainer}>
			{/* <PromotionalBanner {...bannerData} /> */}

			<FilterBarContainer
				categories={allCategories.filter(cat => cat.id !== 'embalagens-geral')}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				sortOption={sortOption}
				onSortChange={setSortOption}
			/>

			<header className={styles.pageHeader}>
				<h1>
					{categoryName ? categoryName : resultTitle}
					{searchTerm && categoryName ? ` (em "${searchTerm}")` : ''}
				</h1>
				<p className={styles.resultsCount}>
					{productsToDisplay.length} produto(s) encontrado(s).
				</p>
			</header>

			{productsToDisplay.length > 0 ? (
				<div className={styles.productsGrid}>
					{productsToDisplay.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<div className={styles.noResults}>
					<p>Nenhum produto encontrado com os critérios selecionados.</p>
					<p>Tente palavras-chave diferentes ou ajuste os filtros.</p>
					<Link href="/produtos" className={styles.actionButton}>
						Ver todos os produtos
					</Link>
				</div>
			)}
		</div>
	);
}