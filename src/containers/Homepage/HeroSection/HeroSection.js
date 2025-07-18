'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.scss';
import ReusableCarousel from '@/components/shared/Carousel/Carousel';

const heroSlidesData = [
	{
		id: 1,
		title: "Embalagens que Falam por Você",
		subtitle: "Descubra nossa variedade de embalagens, sacolas e acessórios para presentes que encantam e surpreendem.",
		imageUrl: "/images/hero/img1.png",
		imageAlt: "Embalagens de presente criativas e sofisticadas",
		ctaText: "Explorar Embalagens",
		ctaLink: "/categoria/embalagens-para-presente",
		textPosition: "left"
	},
	{
		id: 2,
		title: "Sua Festa Inesquecível Começa Aqui!",
		subtitle: "Artigos de festa completos, de balões a descartáveis temáticos, para fazer da sua comemoração um sucesso.",
		imageUrl: "/images/hero/img2.png",
		imageAlt: "Decoração de festa vibrante com balões e artigos temáticos",
		ctaText: "Ver Artigos de Festa",
		ctaLink: "/categoria/artigos-de-festa",
		textPosition: "left"
	},
	{
		id: 3,
		title: "Papelaria Completa para Suas Ideias",
		subtitle: "Cadernos, canetas e tudo que você precisa para organizar seus estudos e trabalho com estilo e funcionalidade.",
		imageUrl: "/images/hero/img3.png",
		imageAlt: "Seleção de itens de papelaria modernos e funcionais",
		ctaText: "Conhecer Papelaria",
		ctaLink: "/categoria/papelaria",
		textPosition: "left"
	},
];

const HeroSection = () => {
	const swiperOptions = {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		pagination: { clickable: true, el: `.${styles.heroPagination}` },
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
	};

	return (
		<section className={styles.heroSectionWrapper}>
			<ReusableCarousel
				slidesPerView={swiperOptions.slidesPerView}
				spaceBetween={swiperOptions.spaceBetween}
				loop={swiperOptions.loop}
				autoplay={swiperOptions.autoplay}
				pagination={swiperOptions.pagination}
				className={styles.heroCarousel}
				slideClassName={styles.heroSlideElement}
				showNavigation={false}
				showPagination={true}
				customPaginationClass={styles.heroPagination}
			>
				{heroSlidesData.map((slide) => (
					<div key={slide.id} className={`${styles.heroSlide} ${styles[slide.textPosition === 'left' ? 'textLeft' : 'textRight']}`}>
						<div className={styles.textContentWrapper}>
							<div className={styles.heroContent}>
								<h1>{slide.title}</h1>
								<p className={styles.subheadline}>{slide.subtitle}</p>
								<Link href={slide.ctaLink} className={styles.ctaButton}>
									{slide.ctaText}
								</Link>
							</div>
						</div>
						<div className={styles.heroImageWrapper}>
							<Image
								src={slide.imageUrl}
								alt={slide.imageAlt}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className={styles.heroImage}
								priority={slide.id === 1}
							/>
						</div>
					</div>
				))}
			</ReusableCarousel>
		</section>
	);
};

export default HeroSection;