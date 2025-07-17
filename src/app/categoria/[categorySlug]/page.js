import { Suspense } from 'react';
import Link from 'next/link';
import CategoryProductsClient from './CategoryProductsClient';
import styles from './categoriaPage.module.scss';
import productsData from '@/data/products.json';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';

async function getCategoryDetailsForPage(slug) {
    const category = productsData.categories.find(cat => cat.slug === slug);
    if (!category) {
        return null;
    }
    return category;
}

export async function generateStaticParams() {
    const categories = productsData.categories || [];
    return categories.map((category) => ({
        categorySlug: category.slug,
    }));
}

export async function generateMetadata({ params }) {
    const categoryDetails = await getCategoryDetailsForPage(params.categorySlug);
    const siteBaseUrl = 'https://www.062embalagens.com.br';

    if (!categoryDetails) {
        return {
            title: 'Categoria não encontrada',
            description: 'A categoria que você está procurando não foi encontrada.',
            robots: 'noindex, follow',
        };
    }

    const pageTitle = `${categoryDetails.name} - 062 Embalagens`;
    const pageDescription = categoryDetails.description || `Confira nossa seleção de ${categoryDetails.name} na 062 Embalagens.`;
    const categoryUrl = `${siteBaseUrl}/categoria/${categoryDetails.slug}`;
    const imageUrl = categoryDetails.image || `${siteBaseUrl}/og-image.png`;

    return {
        title: pageTitle,
        description: pageDescription,
        alternates: {
            canonical: categoryUrl,
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: categoryUrl,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Produtos da categoria ${categoryDetails.name}`,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [imageUrl],
        },
    };
}

export default async function CategoriaPage({ params }) {
    const { categorySlug } = params;
    const categoryDetails = await getCategoryDetailsForPage(categorySlug);
    
    if (!categoryDetails) {
        return (
            <div className={`${styles.categoryPageContainer || styles['product-listing__container']} ${styles.notFoundContainer || styles['product-listing__no-results']}`}>
                <header className={styles.pageHeader || styles['product-listing__header']}><h1>Categoria não encontrada</h1></header>
                <p>A categoria &quot;{decodeURIComponent(categorySlug)}&ldquot; não existe ou foi removida.</p>
                <Link href="/produtos" className={styles.actionButton || styles['product-listing__action-button']}>Ver todos os produtos</Link>
            </div>
        );
    }

    const breadcrumbCrumbs = [
        { label: "Início", href: "/" },
        { label: "Produtos", href: "/produtos" },
        { label: categoryDetails.name }
    ];

    return (
        <Suspense fallback={<div className={styles.loadingStatePage}>Carregando produtos da categoria...</div>}>
            <CategoryProductsClient categoryDetails={categoryDetails} breadcrumbs={breadcrumbCrumbs} />
        </Suspense>
    );
}