import CategoryCard from '@/components/CategoryCard/CategoryCard';
import ReusableCarousel from '@/components/shared/Carousel/Carousel';
import styles from './FeaturedCategoriesSection.module.scss';

const categorySlugs = {
    'Embalagens': 'embalagens-para-presente',
    'Festas': 'artigos-de-festa',
    'Higiene': 'higiene-limpeza',
    'Papelaria': 'papelaria',
    'Utilidades': 'utilidades',
};

const categoriesData = [
    {
        id: 1,
        href: `/categoria/${categorySlugs['Embalagens']}`,
        imgSrc: '/images/categorias/img1.png',
        imgAlt: 'Embalagens para presente diversas e coloridas.',
        title: 'Embalagens',
        cardColor: '#1D3A9B',
    },
    {
        id: 2,
        href: `/categoria/${categorySlugs['Festas']}`,
        imgSrc: '/images/categorias/img2.png',
        imgAlt: 'Artigos coloridos para festas.',
        title: 'Festas',
        cardColor: '#1D3A9B',
    },
    {
        id: 3,
        href: `/categoria/${categorySlugs['Higiene']}`,
        imgSrc: '/images/categorias/img3.png',
        imgAlt: 'Produtos de higiene e limpeza.',
        title: 'Higiene',
        cardColor: '#1D3A9B',
    },
    {
        id: 4,
        href: `/categoria/${categorySlugs['Papelaria']}`,
        imgSrc: '/images/categorias/img4.png',
        imgAlt: 'Itens diversos de papelaria.',
        title: 'Papelaria',
        cardColor: '#1D3A9B',
    },
];

const FeaturedCategoriesSection = () => {
    if (categoriesData.length === 0) {
        return null;
    }

    return (
        <section className={styles['featured-categories']}>
            <div className={styles['featured-categories__container']}>
                <header className={styles['featured-categories__header']}>
                    <h2>Navegue por Nossas Top Categorias</h2>
                    <p className={styles['featured-categories__subtitle']}>
                        Encontre tudo o que você precisa, organizado para facilitar sua busca.
                    </p>
                </header>
                <div className={styles['featured-categories__grid']}>
                    {categoriesData.map((category) => (
                        <CategoryCard
                            key={category.id}
                            href={category.href}
                            imgSrc={category.imgSrc}
                            imgAlt={category.imgAlt}
                            title={category.title}
                            cardColor={category.cardColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedCategoriesSection;