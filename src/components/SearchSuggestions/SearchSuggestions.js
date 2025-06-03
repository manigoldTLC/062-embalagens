'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './SearchSuggestions.module.scss';
import {
	FaShoppingBag as DefaultCategoryIcon,
	FaGift,
	FaBirthdayCake,
	FaLeaf,
	FaBookOpen
} from 'react-icons/fa';

const categoryIcons = {
	'embalagens-para-presente': <FaGift className={styles.suggestionCategoryIcon} />,
	'artigos-de-festa': <FaBirthdayCake className={styles.suggestionCategoryIcon} />,
	'higiene-limpeza': <FaLeaf className={styles.suggestionCategoryIcon} />,
	'papelaria': <FaBookOpen className={styles.suggestionCategoryIcon} />,
	'embalagens-geral': <DefaultCategoryIcon className={styles.suggestionCategoryIcon} />,
};

export default function SearchSuggestions({ suggestions, isVisible, onSuggestionClick, searchTerm }) {
	if (!isVisible) {
		return null;
	}

	const hasCategories = suggestions && suggestions.categories && suggestions.categories.length > 0;
	const hasProducts = suggestions && suggestions.products && suggestions.products.length > 0;

	if (!hasCategories && !hasProducts && searchTerm && searchTerm.length > 1) {
		return (
			<div className={styles.suggestionsDropdown}>
				<p className={styles.noResults}>Nenhum resultado para "{searchTerm}"</p>
			</div>
		);
	}

	if (!hasCategories && !hasProducts) {
		return null;
	}

	return (
		<div className={styles.suggestionsDropdown}>
			{hasCategories && (
				<div className={styles.suggestionSection}>
					<h4 className={styles.suggestionTitle}>Categorias Sugeridas</h4>
					<ul className={styles.suggestionList}>
						{suggestions.categories.map(category => (
							<li key={`cat-${category.id}`}>
								<Link href={`/categoria/${category.slug}`} className={styles.suggestionItemLink} onClick={onSuggestionClick}>
									{categoryIcons[category.slug] || <DefaultCategoryIcon className={styles.suggestionCategoryIcon} />}
									<span className={styles.categoryName}>{category.name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
			{hasProducts && (
				<div className={styles.suggestionSection}>
					<h4 className={styles.suggestionTitle}>Produtos Sugeridos</h4>
					<ul className={styles.suggestionList}>
						{suggestions.products.map(product => (
							<li key={`prod-${product.id}`}>
								<Link href={`/produtos/${product.slug}`} className={`${styles.suggestionItemLink} ${styles.productSuggestionLink}`} onClick={onSuggestionClick}>
									<div className={styles.suggestionImageWrapper}>
										<Image
											src={product.images[0]}
											alt={product.name}
											width={40}
											height={40}
											className={styles.suggestionImage}
											unoptimized={product.images[0].includes('placehold.co')}
										/>
									</div>
									<div className={styles.suggestionText}>
										<span className={styles.suggestionName}>{product.name}</span>
										<span className={styles.suggestionPrice}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(product.price))}</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};