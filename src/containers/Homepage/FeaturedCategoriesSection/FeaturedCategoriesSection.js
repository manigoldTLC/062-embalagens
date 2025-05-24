import CategoryCard from '@/components/CategoryCard/CategoryCard';
import styles from './FeaturedCategoriesSection.module.scss';

const categorySlugs = {
	'Embalagens para Presente': 'embalagens-para-presente',
	'Artigos de Festa': 'artigos-de-festa',
	'Higiene e Limpeza': 'higiene-limpeza',
	'Papelaria': 'papelaria',
};

const categoriesData = [
	{
		id: 1,
		href: `/categoria/${categorySlugs['Embalagens para Presente']}`,
		imgSrc: 'https://images.unsplash.com/photo-1646182504834-712de7bdef30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVtYmFsYWdlbnMlMjBwcmVzZW50ZXN8ZW58MHx8MHx8fDA%3D',
		imgAlt: 'Embalagens para presente diversas e coloridas.',
		title: 'Embalagens para Presente',
		description: 'Valorize seus presentes com estilo e criatividade.',
	},
	{
		id: 2,
		href: `/categoria/${categorySlugs['Artigos de Festa']}`,
		imgSrc: 'https://images.unsplash.com/photo-1594142268552-e175b3e053f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsb2VzJTJDJTIwcHJhdG9zJTJDJTIwY29wb3N8ZW58MHx8MHx8fDA%3D',
		imgAlt: 'Balões, pratos, copos e decoração para festas vibrantes.',
		title: 'Artigos de Festa',
		description: 'Tudo para sua comemoração ser inesquecível!',
	},
	{
		id: 3,
		href: `/categoria/${categorySlugs['Higiene e Limpeza']}`,
		imgSrc: 'https://images.unsplash.com/photo-1616360072047-70557844db53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1dG9zJTIwbGltcGV6YXxlbnwwfHwwfHx8MA%3D%3D',
		imgAlt: 'Produtos de higiene pessoal e limpeza para casa.',
		title: 'Higiene e Limpeza',
		description: 'Cuide de você e do seu lar com produtos de qualidade.',
	},
	{
		id: 4,
		href: `/categoria/${categorySlugs['Papelaria']}`,
		imgSrc: 'https://images.unsplash.com/photo-1631173716529-fd1696a807b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZWxhcmlhfGVufDB8fDB8fHww',
		imgAlt: 'Cadernos, canetas, lápis e outros itens de papelaria.',
		title: 'Papelaria',
		description: 'Material completo para estudos e escritório.',
	},
];

const FeaturedCategoriesSection = () => {
	return (
		<section className={styles.featuredCategories}>
			<h2>Nossas Principais Categorias</h2>
			<div className={styles.categoriesGrid}>
				{categoriesData.map((category) => (
					<CategoryCard
						key={category.id}
						href={category.href}
						imgSrc={category.imgSrc}
						imgAlt={category.imgAlt}
						title={category.title}
						description={category.description}
					/>
				))}
			</div>
		</section>
	);
}

export default FeaturedCategoriesSection;