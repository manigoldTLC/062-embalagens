import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.scss';

const CategoryCard = ({ href, imgSrc, imgAlt, title, cardColor }) => {
	return (
		<Link
			href={href}
			className={styles['category-card']}
			style={{ backgroundColor: cardColor || '#f5f5f5' }}
		>
			<h3 className={styles['category-card__title']}>{title}</h3>
			<div className={styles['category-card__image-wrapper']}>
				<Image
					src={imgSrc}
					alt={imgAlt}
					fill
					sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
					className={styles['category-card__image']}
				/>
			</div>
		</Link>
	);
};

export default CategoryCard;
