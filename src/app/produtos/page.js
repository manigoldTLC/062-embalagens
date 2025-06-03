import { Suspense } from 'react';
import ProductListClient from './ProductListClient';
import styles from './produtos.module.scss';

export const metadata = {
	title: 'Nossos Produtos - 062 Embalagens',
	description: 'Explore o catálogo completo de produtos da 062 Embalagens. Encontre embalagens, artigos para festa, itens de papelaria e muito mais em Goiânia.',
	alternates: {
		canonical: 'https://www.062embalagens.com.br/produtos', // ATUALIZE
	},
};

export default function ProdutosPageWrapper() {
	return (
		<Suspense fallback={<div className={styles.loadingStatePage}>Carregando todos os produtos...</div>}>
			<ProductListClient />
		</Suspense>
	);
}