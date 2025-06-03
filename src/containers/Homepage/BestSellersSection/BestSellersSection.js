import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './BestSellersSection.module.scss';
import productsData from '@/data/products.json';
import Link from 'next/link';

async function getBestSellerProducts() {
	const bestSellerIds = productsData.bestSellerProductIds || [];
	const allProducts = productsData.products || [];

	if (bestSellerIds.length === 0) {
		return [];
	}

	const bestSellerProducts = bestSellerIds
		.map(id => allProducts.find(product => product.id === id))
		.filter(product => product !== undefined)
		.slice(0, 4);

	return bestSellerProducts;
}

export default async function BestSellersSection() {
	const bestSellerProducts = await getBestSellerProducts();

	if (bestSellerProducts.length === 0) {
		return null;
	}

	return (
		<section className={styles.productSection}>
			<div className={styles.container}>
				<header className={styles.sectionHeader}>
					<h2>Os Queridinhos da Galera</h2>
					<p className={styles.subtitle}>Descubra os produtos mais amados pelos nossos clientes!</p>
				</header>
				<div className={styles.itemsGrid}>
					{bestSellerProducts.map((product) => (
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