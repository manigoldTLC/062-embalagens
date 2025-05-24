import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './RelatedProducts.module.scss';

export default function RelatedProducts({ products }) {
	if (!products || products.length === 0) {
		return null;
	}

	const displayedProducts = products.slice(0, 4);

	return (
		<section className={styles.relatedProductsSection}>
			<h2 className={styles.sectionTitle}>
				Você também pode gostar (Produtos: {displayedProducts.length})
			</h2>
			{displayedProducts.length > 0 ? (
				<div className={styles.relatedProductsGrid}>
					{displayedProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<p>Nenhum produto relacionado para mostrar.</p>
			)}
		</section>
	);
}