'use client';

import styles from './FilterBarContainer.module.scss';
import FilterDropdownButton from '@/components/shared/FilterDropdownButton/FilterDropdownButton';

const FilterBarContainer = ({
	categories,
	selectedCategory,
	onCategoryChange,
	categoryFilterLabel = "Categoria",
	showMainCategoryFilter = true,
	sortOption,
	onSortChange,
}) => {
	const categoryOptions = showMainCategoryFilter && categories
		? [
			{ value: "", label: `Todas ${categoryFilterLabel === "Categoria" ? "as Categorias" : "as Subcategorias"}` },
			...categories.map(cat => ({ value: cat.id, label: cat.name }))
		]
		: [];

	const sortOptions = [
		{ value: "relevance", label: "Relevância" },
		{ value: "name-asc", label: "Nome (A-Z)" },
		{ value: "name-desc", label: "Nome (Z-A)" },
		{ value: "price-asc", label: "Preço (Menor)" },
		{ value: "price-desc", label: "Preço (Maior)" }
	];

	const placeholderFilterOptions = [
		{ value: "", label: "Todos" },
		{ value: "option1", label: "Opção 1" },
	];

	return (
		<div className={styles.filterBar}>
			<div className={styles.filtersGroup}>
				{showMainCategoryFilter && categoryOptions.length > 0 && (
					<FilterDropdownButton
						label={categoryFilterLabel}
						options={categoryOptions}
						selectedValue={selectedCategory}
						onValueChange={onCategoryChange}
						defaultLabel={`Todas ${categoryFilterLabel === "Categoria" ? "as Categorias" : "as Subcategorias"}`}
					/>
				)}
				<FilterDropdownButton
					label="Preço"
					options={placeholderFilterOptions}
					selectedValue=""
					onValueChange={() => { }}
					defaultLabel="Todos"
				/>
				<FilterDropdownButton
					label="Cor"
					options={placeholderFilterOptions}
					selectedValue=""
					onValueChange={() => { }}
					defaultLabel="Todas"
				/>
			</div>
			<div className={styles.sortContainer}>
				<FilterDropdownButton
					label="Ordenar por"
					options={sortOptions}
					selectedValue={sortOption}
					onValueChange={onSortChange}
					defaultLabel="Relevância"
				/>
			</div>
		</div>
	);
};

export default FilterBarContainer;