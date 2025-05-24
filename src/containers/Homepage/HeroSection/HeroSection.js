import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroContent}>
				<h1>062 Embalagens: Tudo para sua Festa, Casa e Presente em Goiânia!</h1>
				<p className={styles.subheadline}>
					Desde embalagens criativas até os essenciais do dia a dia, encontre qualidade e variedade em um só lugar.
				</p>
				<Link href="/produtos" className={styles.ctaButton}>
					Conheça Nossos Produtos
				</Link>
			</div>
		</section>
	);
}

export default HeroSection;