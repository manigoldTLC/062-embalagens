import Link from 'next/link';
import Image from 'next/image';
import styles from './PromotionalBanner.module.scss';

export default function PromotionalBanner({
	title,
	subtitle,
	ctaText,
	ctaLink,
	imageUrl,
	imageAlt,
	backgroundColor = '#f8f9fa', // Cor de fundo padrão (cinza claro)
	textColor = '#212529', // Cor de texto padrão (escuro)
	buttonTextColor = '#ffffff',
	buttonBackgroundColor = '#007bff' // Cor de botão padrão (azul)
}) {
	return (
		<section className={styles.bannerWrapper} style={{ backgroundColor: backgroundColor }}>
			<div className={styles.bannerGrid}>
				<div className={styles.textContent}>
					<h2 className={styles.title} style={{ color: textColor }}>{title}</h2>
					{subtitle && <p className={styles.subtitle} style={{ color: textColor }}>{subtitle}</p>}
					{ctaText && ctaLink && (
						<Link href={ctaLink} className={styles.ctaButton} style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}>
							{ctaText}
						</Link>
					)}
				</div>
				{imageUrl && (
					<div className={styles.imageContent}>
						<Image
							src={imageUrl}
							alt={imageAlt || title}
							width={300} // Ajuste conforme a proporção da sua imagem
							height={250} // Ajuste conforme a proporção da sua imagem
							className={styles.bannerImage}
							objectFit="contain" // Ou "cover", dependendo da imagem
						/>
					</div>
				)}
			</div>
		</section>
	);
}