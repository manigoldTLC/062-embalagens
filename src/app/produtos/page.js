// src/app/produtos/page.js
import Link from 'next/link'; // Certifique-se de que Link está importado
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './produtos.module.scss';
import productsData from '@/data/products.json';

// METADADOS PARA A PÁGINA DE PRODUTOS (SEO!)
// Esta metadata é para a página geral. Se uma categoria é filtrada,
// o conteúdo da página muda, mas para metadados dinâmicos baseados em searchParams
// para SSG é mais complexo. Uma página dedicada por categoria seria melhor para SEO de categoria.
export const metadata = {
	title: 'Todos os Produtos - 062 Embalagens',
	description: 'Confira nosso catálogo completo de embalagens, artigos para festa, produtos de higiene, limpeza e papelaria em Goiânia.',
	// ... (resto dos metadados como antes)
};

// Função para buscar dados (já existente, mas agora também pegamos categorias)
async function getData(selectedCategorySlug) {
	const allProducts = productsData.products || [];
	const categories = productsData.categories || [];

	let currentCategory = null;
	let filteredProducts = allProducts;

	if (selectedCategorySlug) {
		currentCategory = categories.find(cat => cat.slug === selectedCategorySlug);
		if (currentCategory) {
			// Filtra produtos que pertencem à categoria principal ou a uma de suas subcategorias
			filteredProducts = allProducts.filter(product => {
				if (product.category_id === currentCategory.id) return true;
				// Verifica se o produto pertence a uma subcategoria da categoria selecionada
				if (currentCategory.subcategories) {
					const subcategoryIds = currentCategory.subcategories.map(sub => sub.id);
					return product.subcategory_id && subcategoryIds.includes(product.subcategory_id);
				}
				return false;
			});
		} else {
			// Se o slug da categoria não for encontrado, pode mostrar todos ou uma mensagem
			// Aqui, vamos reverter para mostrar todos se a categoria for inválida,
			// ou você pode querer mostrar uma mensagem de "categoria não encontrada".
			console.warn(`Categoria com slug "${selectedCategorySlug}" não encontrada.`);
		}
	}

	return { products: filteredProducts, categories, currentCategory };
}

export default async function ProdutosPage({ searchParams }) {
	const selectedCategorySlug = searchParams?.categoria; // Pega o ?categoria=slug da URL
	const { products, categories, currentCategory } = await getData(selectedCategorySlug);

	const pageTitle = currentCategory
		? `${currentCategory.name} - 062 Embalagens`
		: 'Nosso Catálogo de Produtos';
	const pageDescription = currentCategory
		? currentCategory.description || `Confira nossos produtos da categoria ${currentCategory.name}.`
		: 'Explore nossa variedade de embalagens, artigos para festa, higiene, limpeza e papelaria.';


	return (
		<div className={styles.productsPageContainer}>
			<header className={styles.pageHeader}>
				<h1>{pageTitle}</h1>
				<p>{pageDescription}</p>
			</header>

			{/* Lista de Categorias para Filtro */}
			<nav className={styles.categoryNav} aria-label="Filtrar por categoria">
				<ul>
					<li>
						<Link href="/produtos" className={!selectedCategorySlug ? styles.activeCategory : ''}>
							Todas
						</Link>
					</li>
					{categories.map(category => (
						<li key={category.id}>
							<Link
								href={`/produtos?categoria=${category.slug}`}
								className={selectedCategorySlug === category.slug ? styles.activeCategory : ''}
							>
								{category.name}
							</Link>
							{/* Opcional: Listar subcategorias se a categoria principal estiver ativa */}
							{/* {category.subcategories && selectedCategorySlug === category.slug && (
                <ul className={styles.subCategoryList}>
                  {category.subcategories.map(sub => (
                    <li key={sub.id}>
                      <Link href={`/produtos?categoria=${currentCategory.slug}&subcategoria=${sub.slug}`}>
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )} */}
						</li>
					))}
				</ul>
			</nav>

			{(!products || products.length === 0) && currentCategory && (
				<p className={styles.noProducts}>
					Nenhum produto encontrado na categoria "{currentCategory.name}".
				</p>
			)}
			{(!products || products.length === 0) && !currentCategory && (
				<p className={styles.noProducts}>
					Nenhum produto encontrado no momento. Volte em breve!
				</p>
			)}

			{products && products.length > 0 && (
				<div className={styles.productsGrid}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}