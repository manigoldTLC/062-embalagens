import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './FeaturedProductsSection.module.scss';
import productsData from '@/data/products.json';

async function getFeaturedProducts() {
	const featuredIds = productsData.featuredProductIds || [];
	const allProducts = productsData.products || [];

	if (featuredIds.length === 0) {
		return [];
	}

	const featuredProductsList = featuredIds
		.map(id => allProducts.find(product => product.id === id))
		.filter(product => product !== undefined)
		.slice(0, 4);

	return featuredProductsList;
}

export default async function FeaturedProductsSection() {
	const featuredProducts = await getFeaturedProducts();

	if (featuredProducts.length === 0) {
		return null;
	}

	return (
		<section className={styles.productSection}>
			<div className={styles.container}>
				<header className={styles.sectionHeader}>
					<h2>Nossos Produtos em Destaque</h2>
					<p className={styles.subtitle}>Uma seleção especial dos itens mais procurados e amados por nossos clientes.</p>
				</header>
				<div className={styles.itemsGrid}>
					{featuredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
				<div className={styles.sectionAction}>
					<Link href="/produtos" className={styles.ctaButton}>
						Ver Todos os Produtos
					</Link>
				</div>
			</div>
		</section>
	);
}