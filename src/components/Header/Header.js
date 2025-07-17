'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '@/lib/store/features/cart/cartSlice';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.scss';
import { FaWhatsapp, FaBars, FaTimes, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { BsBag } from 'react-icons/bs';
import productsData from '@/data/products.json';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

const NavLink = ({ href, children, onClick, exact = false, className = '' }) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);
	const handleClick = () => { if (onClick) onClick(); };
	return <Link href={href} className={`${styles.navLink} ${className} ${isActive ? styles.activeLink : ''}`} onClick={handleClick}>{children}</Link>;
};

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState({ categories: [], products: [] });
	const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

	const router = useRouter();
	const searchWrapperRef = useRef(null);
	const itemCount = useSelector(selectCartItemCount);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 992 && isMobileMenuOpen) setIsMobileMenuOpen(false);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isMobileMenuOpen]);

	const whatsappNumber = "5562000000000";
	const phoneNumber = "(62) 3000-0000";

	const filterData = (term) => {
		if (!term || term.trim() === '') {
			const popularCategories = productsData.categories.slice(0, 4);
			setSuggestions({ categories: popularCategories, products: [] });
			setIsSuggestionsVisible(true);
			return;
		}

		const lowerCaseTerm = term.toLowerCase();
		const filteredCategories = productsData.categories.filter(category =>
			category.name.toLowerCase().includes(lowerCaseTerm)
		).slice(0, 3);

		const filteredProducts = productsData.products.filter(product =>
			product.name.toLowerCase().includes(lowerCaseTerm) ||
			(product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseTerm)))
		).slice(0, 4);

		setSuggestions({ categories: filteredCategories, products: filteredProducts });
		setIsSuggestionsVisible(true);
	};

	const handleSearchChange = (e) => {
		const currentTerm = e.target.value;
		setSearchTerm(currentTerm);

		if (currentTerm.length > 1) {
			filterData(currentTerm);
		} else if (currentTerm.length === 0) {
			filterData('');
		} else {
			setSuggestions({ categories: [], products: [] });
			setIsSuggestionsVisible(false);
		}
	};

	const handleSearchFocus = () => {
		filterData(searchTerm);
		setIsSuggestionsVisible(true);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			setIsSuggestionsVisible(false);
			router.push(`/busca?q=${encodeURIComponent(searchTerm.trim())}`);
		}
	};

	const closeSuggestions = () => {
		setIsSuggestionsVisible(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
				closeSuggestions();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
			<div className={styles.topBar}>
				<div className={`${styles.container} ${styles.topBarContainer}`}>
					<div className={styles.topBarLeft}>
						<a href={`https://wa.me/${whatsappNumber}?text=Olá!`} target="_blank" rel="noopener noreferrer" className={styles.topBarLink}>
							<FaWhatsapp />
							<span>{phoneNumber} (WhatsApp)</span>
						</a>
					</div>
					<div className={styles.topBarCenter}>
						<p>Embalagens e artigos para festa em Goiânia!</p>
					</div>
					<div className={styles.topBarRight}>
						<Link href="/contato" className={styles.topBarLink}>
							<FaMapMarkerAlt />
							<span>Como Chegar</span>
						</Link>
					</div>
				</div>
			</div>

			<div className={styles.mainNavWrapper}>
				<div className={`${styles.container} ${styles.mainNavContainer}`}>
					<Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
						<Image src="/images/logo-062-embalagens-branca.png" alt="062 Embalagens" width={140} height={45} priority />
					</Link>

					<nav id="main-navigation" className={`${styles.navigation} ${isMobileMenuOpen ? styles.isOpen : ''}`}>
						<ul>
							<li><NavLink href="/" onClick={closeMobileMenu} exact={true}>Início</NavLink></li>
							<li><NavLink href="/produtos" onClick={closeMobileMenu}>Produtos</NavLink></li>
							<li><NavLink href="/sobre" onClick={closeMobileMenu}>Sobre Nós</NavLink></li>
							<li><NavLink href="/contato" onClick={closeMobileMenu}>Contato</NavLink></li>
						</ul>
					</nav>

					<div className={styles.rightControls}>
						<div className={styles.searchContainer} ref={searchWrapperRef}>
							<form onSubmit={handleSearchSubmit} className={styles.searchForm}>
								<input
									type="search"
									className={styles.searchInput}
									value={searchTerm}
									onChange={handleSearchChange}
									onFocus={handleSearchFocus}
									placeholder="Buscar produtos..."
								/>
								<button type="submit" className={styles.searchButton} aria-label="Pesquisar">
									<FaSearch />
								</button>
							</form>
							<SearchSuggestions
								suggestions={suggestions}
								isVisible={isSuggestionsVisible}
								onSuggestionClick={closeSuggestions}
								searchTerm={searchTerm}
							/>
						</div>

						<div className={styles.headerActions}>
							<Link href="/meu-pedido" className={`${styles.actionButton} ${styles.cartLink}`}>
								<span className={styles.cartIconWrapper}><BsBag />{itemCount > 0 && <span className={styles.itemCountBadge}>{itemCount}</span>}</span>
							</Link>
						</div>
					</div>

					<button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-expanded={isMobileMenuOpen} aria-controls="main-navigation">
						{isMobileMenuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>
		</header>
	);
}