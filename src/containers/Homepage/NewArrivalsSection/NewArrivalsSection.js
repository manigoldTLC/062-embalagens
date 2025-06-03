import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './NewArrivalsSection.module.scss';
import productsData from '@/data/products.json';
import Link from 'next/link';

async function getNewArrivalProducts() {
	const newArrivalIds = productsData.newArrivalProductIds || [];
	const allProducts = productsData.products || [];

	if (newArrivalIds.length === 0) {
		return [];
	}

	const newArrivalProducts = newArrivalIds
		.map(id => allProducts.find(product => product.id === id))
		.filter(product => product !== undefined)
		.slice(0, 4);

	return newArrivalProducts;
}

export default async function NewArrivalsSection() {
	const newArrivalProducts = await getNewArrivalProducts();

	if (newArrivalProducts.length === 0) {
		return null;
	}

	return (
		<section className={styles.productSection}>
			<div className={styles.container}>
				<header className={styles.sectionHeader}>
					<h2>Novidades</h2>
					<p className={styles.subtitle}>Descubra os lançamentos mais recentes e as novidades imperdíveis da nossa loja.</p>
				</header>
				<div className={styles.itemsGrid}>
					{newArrivalProducts.map((product) => (
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