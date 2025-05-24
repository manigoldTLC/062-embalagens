import Link from 'next/link';
import Image from 'next/image';
import styles from './produtoDetalhe.module.scss';
import productsData from '@/data/products.json';
import ProductImageGallery from '@/components/ProductImageGallery/ProductImageGallery';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import ProductActions from '@/components/ProductActions/ProductActions';


async function getProductPageData(slug) {
	const product = productsData.products.find(p => p.slug === slug);

	if (!product) {
		return { product: null, relatedProducts: [], categoryDetails: null };
	}

	let relatedProductsList = [];
	if (product.related_products && product.related_products.length > 0) {
		relatedProductsList = product.related_products
			.map(relatedId => {
				const relatedProd = productsData.products.find(p => p.id === relatedId);
				if (!relatedProd) {
					console.warn(`[getProductPageData] Produto relacionado com ID "${relatedId}" não encontrado para o produto "${product.name}".`);
				}
				return relatedProd;
			})
			.filter(p => p !== undefined);
	}

	const categoryDetails = productsData.categories.find(cat => cat.id === product.category_id);

	return { product, relatedProducts: relatedProductsList, categoryDetails };
}

export async function generateStaticParams() {
	const products = productsData.products || [];
	return products.map((product) => ({
		slug: product.slug,
	}));
}

export async function generateMetadata({ params }) {
	const { product } = await getProductPageData(params.slug);
	const siteBaseUrl = 'https://www.062embalagens.com.br';

	if (!product) {
		return {
			title: 'Produto não encontrado - 062 Embalagens',
			description: 'O produto que você está procurando não foi encontrado em nosso catálogo.',
		};
	}

	const productUrl = `${siteBaseUrl}/produtos/${product.slug}`;
	const primaryImageUrl = product.images && product.images.length > 0
		? (product.images[0].startsWith('http') ? product.images[0] : `${siteBaseUrl}${product.images[0]}`)
		: `${siteBaseUrl}/og-image.png`;

	return {
		title: `${product.name} - 062 Embalagens`,
		description: product.description_short,
		alternates: {
			canonical: productUrl,
		},
		openGraph: {
			title: `${product.name} - Compre na 062 Embalagens`,
			description: product.description_short,
			url: productUrl,
			images: [
				{
					url: primaryImageUrl,
					width: 600,
					height: 400,
					alt: product.name,
				},
			],
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			title: `${product.name} - 062 Embalagens`,
			description: product.description_short,
			images: [primaryImageUrl],
		},
	};
}

export default async function ProdutoDetalhePage({ params }) {
	const { slug } = params;
	const { product, relatedProducts, categoryDetails } = await getProductPageData(slug);
	const siteBaseUrl = 'https://www.062embalagens.com.br';

	if (!product) {
		return (
			<div className={`${styles.productDetailContainer} ${styles.notFoundContainer}`}>
				<header className={styles.pageHeader}>
					<h1>Produto não encontrado</h1>
				</header>
				<p>O produto que você está procurando não existe ou foi removido.</p>
				<Link href="/produtos" className={styles.actionButton}>
					Ver todos os produtos
				</Link>
			</div>
		);
	}

	const formattedPrice = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: product.currency || 'BRL',
	}).format(parseFloat(product.price));

	const productStructuredData = {
		"@context": "https://schema.org/",
		"@type": "Product",
		"name": product.name,
		"description": product.description_long,
		"image": product.images && product.images.length > 0
			? product.images.map(imgUrl => imgUrl.startsWith('http') ? imgUrl : `${siteBaseUrl}${imgUrl}`)
			: [`${siteBaseUrl}/og-image.png`],
		"sku": product.id,
		"brand": {
			"@type": "Brand",
			"name": "062 Embalagens"
		},
		"offers": {
			"@type": "Offer",
			"priceCurrency": product.currency || "BRL",
			"price": product.price,
			"itemCondition": "https://schema.org/NewCondition",
			"availability": product.stock_status === 'in_stock' ? "https://schema.org/InStock" :
				product.stock_status === 'out_of_stock' ? "https://schema.org/OutOfStock" :
					"https://schema.org/LimitedAvailability",
			"url": `${siteBaseUrl}/produtos/${product.slug}`,
			"seller": {
				"@type": "Organization",
				"name": "062 Embalagens"
			}
		}
	};

	const itemList = [
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
		}
	];

	if (categoryDetails) {
		itemList.push({
			"@type": "ListItem",
			"position": 3,
			"name": categoryDetails.name,
			"item": `${siteBaseUrl}/categoria/${categoryDetails.slug}`
		});
	}

	itemList.push({
		"@type": "ListItem",
		"position": categoryDetails ? 4 : 3,
		"name": product.name,
		"item": `${siteBaseUrl}/produtos/${product.slug}`
	});

	const breadcrumbStructuredData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": itemList
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
				key="product-jsonld"
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
				key="breadcrumb-jsonld-product"
			/>
			<div className={styles.productDetailContainer}>
				<div className={styles.breadcrumb}>
					<Link href="/">Início</Link> <span>&gt;</span>
					<Link href="/produtos">Produtos</Link> <span>&gt;</span>
					{categoryDetails && (
						<>
							<Link href={`/categoria/${categoryDetails.slug}`}>{categoryDetails.name}</Link> <span>&gt;</span>
						</>
					)}
					<span>{product.name}</span>
				</div>

				<article className={styles.productLayout}>
					<section className={styles.imageGallerySection}>
						<ProductImageGallery images={product.images || []} productName={product.name} />
					</section>

					<section className={styles.productInfo}>
						<h1 className={styles.productName}>{product.name}</h1>
						{product.description_short && <p className={styles.shortDescription}>{product.description_short}</p>}
						<p className={styles.price}>{formattedPrice}</p>

						{product.stock_status === 'in_stock' && (
							<p className={`${styles.stockStatus} ${styles.stockStatusIn}`}>Em estoque</p>
						)}
						{product.stock_status === 'out_of_stock' && (
							<p className={`${styles.stockStatus} ${styles.stockStatusOut}`}>Fora de estoque</p>
						)}
						{product.stock_status === 'low_stock' && (
							<p className={`${styles.stockStatus} ${styles.stockStatusLow}`}>Poucas unidades!</p>
						)}

						<ProductActions product={product} />

						{product.description_long && (
							<div className={styles.longDescription}>
								<h2>Descrição Detalhada</h2>
								{product.description_long.split('\n').map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}
							</div>
						)}

						{product.specifications && product.specifications.length > 0 && (
							<div className={styles.specifications}>
								<h2>Especificações Técnicas</h2>
								<ul>
									{product.specifications.map((spec, index) => (
										<li key={index}>
											<strong>{spec.name}:</strong> {spec.value}
										</li>
									))}
								</ul>
							</div>
						)}

						{product.tags && product.tags.length > 0 && (
							<div className={styles.tags}>
								<strong>Tags:</strong> {product.tags.join(', ')}
							</div>
						)}
					</section>
				</article>

				<RelatedProducts products={relatedProducts} />
			</div>
		</>
	);
}