'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay } from 'swiper/modules'; // Adicionado Autoplay aqui

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/free-mode';
import 'swiper/scss/autoplay'; // Importar SCSS do Autoplay

import styles from './Carousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReusableCarousel = ({
	children,
	slidesPerView = 'auto',
	spaceBetween = 16,
	freeMode = false,
	pagination = false, // Desabilitado por padrão, será controlado por prop
	navigation = false, // Desabilitado por padrão, será controlado por prop
	scrollbar = false,
	loop = false,
	autoplay = false, // Nova prop para autoplay
	breakpoints = {},
	className = '',
	slideClassName = '',
	showNavigation = false, // Mantido para controle externo dos botões DOM
	showPagination = false, // Mantido para controle externo do elemento DOM de paginação
	customPaginationClass = '', // Para o 'el' da paginação
	customPrevButtonClass = '', // Para o 'prevEl' da navegação
	customNextButtonClass = ''  // Para o 'nextEl' da navegação
}) => {
	const swiperModules = [A11y];
	if (navigation || showNavigation) swiperModules.push(Navigation);
	if (pagination || showPagination) swiperModules.push(Pagination);
	if (scrollbar) swiperModules.push(Scrollbar);
	if (freeMode) swiperModules.push(FreeMode);
	if (autoplay) swiperModules.push(Autoplay); // Adiciona Autoplay se a prop estiver definida

	const paginationOptions = showPagination && pagination
		? (typeof pagination === 'object' ? pagination : { clickable: true, el: customPaginationClass || `.${styles.swiperPaginationCustom}` })
		: false;

	const navigationOptions = showNavigation && navigation
		? (typeof navigation === 'object' ? navigation : { prevEl: customPrevButtonClass || `.${styles.swiperButtonPrevCustom}`, nextEl: customNextButtonClass || `.${styles.swiperButtonNextCustom}` })
		: false;


	return (
		<div className={`${styles.carouselWrapperOuter} ${className}`}>
			<Swiper
				modules={swiperModules}
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				freeMode={freeMode}
				pagination={paginationOptions}
				navigation={navigationOptions}
				scrollbar={scrollbar ? { draggable: true, hide: true } : false}
				loop={loop}
				autoplay={autoplay ? (typeof autoplay === 'object' ? autoplay : { delay: 3000, disableOnInteraction: false }) : false}
				breakpoints={breakpoints}
				grabCursor={true}
			>
				{React.Children.map(children, (child, index) => (
					<SwiperSlide key={index} className={`${styles.carouselSlide} ${slideClassName}`}>
						{child}
					</SwiperSlide>
				))}
			</Swiper>

			{showNavigation && typeof navigationOptions !== 'boolean' && ( // Renderiza botões custom se 'navigation' for um objeto de seletores
				<>
					<button className={`swiper-button-prev ${styles.swiperButtonPrevCustom} ${customPrevButtonClass ? customPrevButtonClass.substring(1) : ''}`} aria-label="Slide anterior">
						<FaChevronLeft />
					</button>
					<button className={`swiper-button-next ${styles.swiperButtonNextCustom} ${customNextButtonClass ? customNextButtonClass.substring(1) : ''}`} aria-label="Próximo slide">
						<FaChevronRight />
					</button>
				</>
			)}
			{showPagination && typeof paginationOptions !== 'boolean' && (
				<div className={`swiper-pagination ${styles.swiperPaginationCustom} ${customPaginationClass ? customPaginationClass.substring(1) : ''}`}></div>
			)}
		</div>
	);
};

export default ReusableCarousel;