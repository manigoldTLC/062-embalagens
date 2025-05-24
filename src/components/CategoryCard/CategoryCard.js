import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.scss';

const CategoryCard = ({ href, imgSrc, imgAlt, title, description }) => {
	return (
		<Link href={href} className={styles.card}>
			<div className={styles.imageContainer}>
				<Image src={imgSrc} alt={imgAlt} fill className={styles.image} />
			</div>
			<div className={styles.content}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</Link>
	);
};

export default CategoryCard;
