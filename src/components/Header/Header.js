"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '@/lib/store/features/cart/cartSlice';
import styles from './Header.module.scss';


const MenuIcon = () => <span className={styles.menuIcon}>&#9776;</span>;
const CloseIcon = () => <span className={styles.menuIcon}>&times;</span>;

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const itemCount = useSelector(selectCartItemCount);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
					<Image
						src="/images/logo-062-embalagens-branca.png" // CRIE ESTE LOGO (fundo transparente, letras brancas/amarelas)
						alt="062 Embalagens - Página Inicial"
						width={80}
						height={40}
						priority
					/>
				</Link>

				<button
					className={styles.mobileMenuButton}
					onClick={toggleMobileMenu}
					aria-expanded={isMobileMenuOpen}
					aria-controls="main-navigation"
					aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
				>
					{isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
				</button>

				<nav
					id="main-navigation"
					className={`${styles.navigation} ${isMobileMenuOpen ? styles.isOpen : ''}`}
					aria-label="Navegação principal"
				>
					<ul>
						<li><Link href="/" onClick={closeMobileMenu}>Início</Link></li>
						<li><Link href="/produtos" onClick={closeMobileMenu}>Produtos</Link></li>
						<li><Link href="/sobre" onClick={closeMobileMenu}>Sobre Nós</Link></li>
						<li><Link href="/contato" onClick={closeMobileMenu}>Contato</Link></li>
						<li>
							<Link href="/meu-pedido" className={styles.cartLink} onClick={closeMobileMenu}>
								Minha Lista
								{itemCount > 0 && (
									<span className={styles.itemCountBadge}>
										{itemCount}
									</span>
								)}
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}