'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import productsData from '@/data/products.json';
import styles from './produtos.module.scss';
import FilterBarContainer from '@/containers/BuscaPage/FilterBarContainer/FilterBarContainer';
import PaginationControls from '@/components/shared/PaginationControls/PaginationControls';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';

const ITEMS_PER_PAGE = 8;

export default function ProductListClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [allProducts, setAllProducts] = useState([]);
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const initialCategorySlug = searchParams.get('categoria') || '';
    const initialSort = searchParams.get('ordenar') || 'relevance';
    const initialPage = parseInt(searchParams.get('pagina') || '1', 10);

    const [selectedCategorySlug, setSelectedCategorySlug] = useState(initialCategorySlug);
    const [sortOption, setSortOption] = useState(initialSort);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    const displayCategories = useMemo(() =>
        productsData.categories.filter(cat => cat.id !== 'embalagens-geral') || [],
        []);

    const currentCategoryObject = useMemo(() =>
        displayCategories.find(cat => cat.slug === selectedCategorySlug),
        [displayCategories, selectedCategorySlug]);

    const updateURLParams = useCallback((newParams, replace = false) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') current.set(key, String(value));
            else current.delete(key);
        });
        const search = current.toString();
        const query = search ? `?${search}` : "";
        if (replace) router.replace(`${pathname}${query}`);
        else router.push(`${pathname}${query}`);
    }, [searchParams, router, pathname]);

    useEffect(() => {
        setAllProducts(productsData.products || []);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        let results = [...allProducts];
        let categoryToFilter = currentCategoryObject;

        if (categoryToFilter) {
            const subcategoryIds = categoryToFilter.subcategories?.map(sub => sub.id) || [];
            results = results.filter(product =>
                product.category_id === categoryToFilter.id ||
                (product.subcategory_id && subcategoryIds.includes(product.subcategory_id))
            );
        }

        if (sortOption === 'name-asc') results.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortOption === 'name-desc') results.sort((a, b) => b.name.localeCompare(a.name));
        else if (sortOption === 'price-asc') results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        else if (sortOption === 'price-desc') results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

        const calculatedTotalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
        const newTotalPages = calculatedTotalPages > 0 ? calculatedTotalPages : 1;
        setTotalPages(newTotalPages);

        const pageToUse = Math.min(currentPage, newTotalPages);
        if (currentPage !== pageToUse && results.length > 0) setCurrentPage(pageToUse);

        const startIndex = (pageToUse - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setProductsToDisplay(results.slice(startIndex, endIndex));

        setIsLoading(false);
    }, [allProducts, selectedCategorySlug, sortOption, currentPage, currentCategoryObject]);

    useEffect(() => {
        const categoryFromUrl = searchParams.get('categoria') || '';
        const sortFromUrl = searchParams.get('ordenar') || 'relevance';
        const pageFromUrl = parseInt(searchParams.get('pagina') || '1', 10);

        if (categoryFromUrl !== selectedCategorySlug) setSelectedCategorySlug(categoryFromUrl);
        if (sortFromUrl !== sortOption) setSortOption(sortFromUrl);
        if (pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);
    }, [searchParams]);

    const handleCategoryTabClick = (categorySlug) => {
        updateURLParams({ categoria: categorySlug, pagina: undefined, ordenar: sortOption }, true);
    };

    const handleSortChange = (sortValue) => {
        updateURLParams({ ordenar: sortValue, pagina: undefined, categoria: selectedCategorySlug }, true);
    };

    const handlePageChange = (pageNumber) => {
        updateURLParams({ pagina: pageNumber > 1 ? pageNumber : undefined }, false);
    };

    const pageTitle = currentCategoryObject ? currentCategoryObject.name : "Todos os Produtos";
    const pageDescription = currentCategoryObject
        ? currentCategoryObject.description
        : "Navegue por nossa coleção completa. Na 062 Embalagens, você encontrará tudo para suas festas, presentes e necessidades do dia a dia com qualidade e variedade.";

    useEffect(() => {
        document.title = `${pageTitle} - 062 Embalagens`;
    }, [pageTitle]);

    const totalItemsInCurrentFilter = allProducts.filter(p => !selectedCategorySlug || (currentCategoryObject && (p.category_id === currentCategoryObject.id || (currentCategoryObject.subcategories?.map(s => s.id).includes(p.subcategory_id))))).length;

    const breadcrumbCrumbs = useMemo(() => {
        const crumbs = [
            { label: 'Início', href: '/' },
            { label: 'Produtos', href: '/produtos' }
        ];
        if (currentCategoryObject) {
            crumbs.push({ label: currentCategoryObject.name });
        }
        return crumbs;
    }, [currentCategoryObject]);

    if (isLoading && allProducts.length === 0) {
        return <div className={styles.loadingState}>Carregando produtos...</div>;
    }

    return (
        <div className={styles['product-listing']}>
            <div className={styles['product-listing__container']}>
                <Breadcrumbs crumbs={breadcrumbCrumbs} />

                <header className={styles['product-listing__header']}>
                    <h1 className={styles['product-listing__title']}>{pageTitle}</h1>
                    {pageDescription && <p className={styles['product-listing__description']}>{pageDescription}</p>}
                </header>

                <nav className={styles['category-tabs-nav']} aria-label="Filtrar por tipo de produto">
                    <ul className={styles['category-tabs-nav__list']}>
                        <li className={styles['category-tabs-nav__item']}>
                            <button
                                onClick={() => handleCategoryTabClick('')}
                                className={`${styles['category-tabs-nav__button']} ${selectedCategorySlug === '' ? styles['category-tabs-nav__button--active'] : ''}`}
                            >
                                Todos os Produtos
                            </button>
                        </li>
                        {displayCategories.map(cat => (
                            <li key={cat.id} className={styles['category-tabs-nav__item']}>
                                <button
                                    onClick={() => handleCategoryTabClick(cat.slug)}
                                    className={`${styles['category-tabs-nav__button']} ${selectedCategorySlug === cat.slug ? styles['category-tabs-nav__button--active'] : ''}`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <FilterBarContainer
                    categories={currentCategoryObject?.subcategories || []}
                    selectedCategory={searchParams.get('subcategoria') || ''}
                    onCategoryChange={(subcatId) => {
                        updateURLParams({ subcategoria: subcatId, pagina: undefined });
                    }}
                    categoryFilterLabel="Subcategoria"
                    showMainCategoryFilter={!!(currentCategoryObject && currentCategoryObject.subcategories)}
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                />

                <div className={styles['product-listing__results-info']}>
                    <p className={styles['product-listing__results-count']}>
                        Exibindo {productsToDisplay.length} de {totalItemsInCurrentFilter} produto(s)
                    </p>
                </div>

                {isLoading && productsToDisplay.length === 0 ? (
                    <div className={styles['product-listing__loading']}>Carregando produtos...</div>
                ) : productsToDisplay.length > 0 ? (
                    <>
                        <div className={styles['product-listing__grid']}>
                            {productsToDisplay.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            itemsPerPage={ITEMS_PER_PAGE}
                            totalItems={totalItemsInCurrentFilter}
                        />
                    </>
                ) : (
                    <div className={styles['product-listing__no-results']}>
                        <p>Nenhum produto encontrado com os critérios selecionados.</p>
                        {selectedCategorySlug && (
                            <button onClick={() => handleCategoryTabClick('')} className={styles['product-listing__action-button']}>
                                Ver Todos os Produtos
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}