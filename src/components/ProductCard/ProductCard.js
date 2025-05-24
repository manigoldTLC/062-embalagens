'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cart/cartSlice';
import styles from './ProductCard.module.scss';
import { useState, useEffect } from 'react';

export default function ProductCard({ product }) {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(product.default_color || (product.available_colors && product.available_colors[0]) || null);
	const [feedbackMessage, setFeedbackMessage] = useState('');

	const primaryImage = product.images && product.images.length > 0
		? product.images[0]
		: 'https://placehold.co/600x400/E0E0E0/333333?text=Sem+Imagem';

	const formattedPrice = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: product.currency || 'BRL',
	}).format(parseFloat(product.price));

	const handleAddItem = () => {
		const productToAdd = {
			id: product.id,
			name: product.name,
			price: product.price,
			slug: product.slug,
			image: primaryImage,
		};
		dispatch(addItem({ product: productToAdd, quantity, selectedColor }));
		setFeedbackMessage('Adicionado ✓');
		setQuantity(1);
		setTimeout(() => setFeedbackMessage(''), 2000);
	};

	return (
		<div className={styles.productCard}>
			<Link href={`/produtos/${product.slug}`} className={styles.imageLink}>
				<div className={styles.imageWrapper}>
					<Image
						src={primaryImage}
						alt={product.name}
						layout="fill"
						objectFit="cover"
						unoptimized={primaryImage.includes('placehold.co')}
					/>
				</div>
			</Link>
			<div className={styles.content}>
				<h3 className={styles.name}>
					<Link href={`/produtos/${product.slug}`}>
						{product.name}
						{selectedColor && product.available_colors && <span className={styles.selectedColorName}> ({selectedColor})</span>}
					</Link>
				</h3>
				<p className={styles.price}>{formattedPrice}</p>

				{product.available_colors && product.available_colors.length > 0 && (
					<div className={styles.colorSelector}>
						<span className={styles.selectorLabel}>Cor:</span>
						{product.available_colors.map(color => (
							<button
								key={color}
								type="button"
								className={`${styles.colorOption} ${selectedColor === color ? styles.activeColor : ''}`}
								style={{ backgroundColor: color.toLowerCase() }}
								onClick={() => setSelectedColor(color)}
								aria-label={`Selecionar cor ${color}`}
								title={color}
							/>
						))}
					</div>
				)}

				{product.description_short && <p className={styles.descriptionShort}>{product.description_short}</p>}

				<div className={styles.quantityAndActions}>
					<div className={styles.quantitySelectorCard}>
						<label htmlFor={`qty-card-${product.id}`} className="visually-hidden">Quantidade</label>
						<button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuir quantidade">-</button>
						<input
							type="number"
							id={`qty-card-${product.id}`}
							value={quantity}
							min="1"
							onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
							aria-label="Quantidade do produto"
						/>
						<button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar quantidade">+</button>
					</div>
					<button
						type="button"
						onClick={handleAddItem}
						className={styles.addToListButton}
						disabled={!!feedbackMessage}
					>
						{feedbackMessage || 'Adicionar à Lista'}
					</button>
				</div>
				<Link href={`/produtos/${product.slug}`} className={styles.detailsButton}>
					Ver Detalhes
				</Link>
			</div>
		</div>
	);
}