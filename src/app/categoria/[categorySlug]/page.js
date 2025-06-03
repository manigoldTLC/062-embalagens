import { Suspense } from 'react';
import Link from 'next/link';
import CategoryProductsClient from './CategoryProductsClient';
import styles from './categoriaPage.module.scss';
import productsData from '@/data/products.json';

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

	const breadcrumbStructuredData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Início",
				"item": siteBaseUrl
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Produtos",
				"item": `${siteBaseUrl}/produtos`
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": categoryDetails.name,
				"item": categoryUrl
			}
		]
	};

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
	const siteBaseUrl = 'https://www.062embalagens.com.br';

	if (!categoryDetails) {
		return (
			<div className={`${styles.categoryPageContainer} ${styles.notFoundContainer}`}>
				<header className={styles.pageHeader}><h1>Categoria não encontrada</h1></header>
				<p>A categoria "{decodeURIComponent(categorySlug)}" não existe ou foi removida.</p>
				<Link href="/produtos" className={styles.actionButton}>Ver todos os produtos</Link>
			</div>
		);
	}

	const breadcrumbStructuredData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{ "@type": "ListItem", "position": 1, "name": "Início", "item": siteBaseUrl },
			{ "@type": "ListItem", "position": 2, "name": "Produtos", "item": `${siteBaseUrl}/produtos` },
			{ "@type": "ListItem", "position": 3, "name": categoryDetails.name, "item": `${siteBaseUrl}/categoria/${categoryDetails.slug}` }
		]
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
				key="breadcrumb-jsonld-categorypage"
			/>
			<Suspense fallback={<div className={styles.loadingStatePage}>Carregando produtos da categoria...</div>}>
				<CategoryProductsClient categoryDetails={categoryDetails} />
			</Suspense>
		</>
	);
}