import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './categoriaPage.module.scss';
import productsData from '@/data/products.json';

async function getCategoryData(slug) {
	const category = productsData.categories.find(cat => cat.slug === slug);
	if (!category) return null;
	const subcategoryIds = category.subcategories ? category.subcategories.map(sub => sub.id) : [];
	const productsInCategory = productsData.products.filter(product =>
		product.category_id === category.id ||
		(product.subcategory_id && subcategoryIds.includes(product.subcategory_id))
	);
	return { categoryDetails: category, products: productsInCategory };
}

export async function generateStaticParams() {
	const categories = productsData.categories || [];
	return categories.map((category) => ({
		categorySlug: category.slug,
	}));
}

export async function generateMetadata({ params }) {
	const data = await getCategoryData(params.categorySlug);
	const siteBaseUrl = 'https://www.062embalagens.com.br';

	if (!data || !data.categoryDetails) {
		return {
			title: 'Categoria não encontrada',
			description: 'A categoria que você está procurando não foi encontrada.',
		};
	}

	const { categoryDetails } = data;
	const title = `${categoryDetails.name} - 062 Embalagens`;
	const description = categoryDetails.description || `Confira nossa seleção de ${categoryDetails.name} na 062 Embalagens.`;
	const categoryUrl = `${siteBaseUrl}/categoria/${categoryDetails.slug}`;
	const imageUrl = categoryDetails.image || `${siteBaseUrl}/og-image.png`;

	return {
		title: title,
		description: description,
		alternates: {
			canonical: categoryUrl,
		},
		openGraph: {
			title: title,
			description: description,
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
			title: title,
			description: description,
			images: [imageUrl],
		},
	};
}

export default async function CategoriaPage({ params }) {
	const { categorySlug } = params;
	const data = await getCategoryData(categorySlug);
	const siteBaseUrl = 'https://www.062embalagens.com.br';

	if (!data || !data.categoryDetails) {
		return (
			<div className={`${styles.categoryPageContainer} ${styles.notFoundContainer}`}>
				<header className={styles.pageHeader}>
					<h1>Categoria não encontrada</h1>
				</header>
				<p>A categoria "{decodeURIComponent(categorySlug)}" não existe ou foi removida.</p>
				<Link href="/produtos" className={styles.actionButton}>Ver todos os produtos</Link>
			</div>
		);
	}

	const { categoryDetails, products } = data;

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
				"item": `${siteBaseUrl}/categoria/${categoryDetails.slug}`
			}
		]
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
				key="breadcrumb-jsonld-category"
			/>
			<div className={styles.categoryPageContainer}>
				<div className={styles.breadcrumb}>
					<Link href="/">Início</Link> <span>&gt;</span>
					<Link href="/produtos">Produtos</Link> <span>&gt;</span>
					<span>{categoryDetails.name}</span>
				</div>

				<header className={styles.pageHeader}>
					<h1>{categoryDetails.name}</h1>
					{categoryDetails.description && <p>{categoryDetails.description}</p>}
				</header>

				{categoryDetails.subcategories && categoryDetails.subcategories.length > 0 && (
					<nav className={styles.subCategoryNav} aria-label="Subcategorias">
						<ul>
							{categoryDetails.subcategories.map(sub => (
								<li key={sub.id}>
									<span>{sub.name}</span>
								</li>
							))}
						</ul>
					</nav>
				)}

				{products && products.length > 0 ? (
					<div className={styles.productsGrid}>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<p className={styles.noProducts}>
						Nenhum produto encontrado nesta categoria no momento.
					</p>
				)}
			</div>
		</>
	);
}