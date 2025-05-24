'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cart/cartSlice';
import styles from './ProductActions.module.scss';

export default function ProductActions({ product }) {
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(product?.default_color || (product?.available_colors && product.available_colors[0]) || null);
	const [feedbackMessage, setFeedbackMessage] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		setSelectedColor(product?.default_color || (product?.available_colors && product.available_colors[0]) || null);
		setQuantity(1);
		setFeedbackMessage('');
	}, [product]);


	const handleQuantityChange = (e) => { /* ... como antes ... */ };
	const handleQuantityIncrement = () => setQuantity(prev => prev + 1);
	const handleQuantityDecrement = () => setQuantity(prev => Math.max(1, prev - 1));


	const handleAddToCart = () => {
		if (!product) return;
		const itemToAdd = {
			id: product.id,
			name: product.name,
			price: product.price,
			slug: product.slug,
			image: product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/100x75/E0E0E0/333333?text=Sem+Img',
		};
		dispatch(addItem({ product: itemToAdd, quantity, selectedColor }));
		setFeedbackMessage('Adicionado à lista ✓');
		// setQuantity(1); // Opcional: resetar quantidade após adicionar
		setTimeout(() => setFeedbackMessage(''), 2500);
	};

	if (!product) {
		return <p>Informações do produto indisponíveis.</p>;
	}

	return (
		<div className={styles.actionsContainer}>
			{product.available_colors && product.available_colors.length > 0 && (
				<div className={styles.colorSelectorDetail}>
					<span className={styles.selectorLabel}>Cor:</span>
					<div className={styles.colorOptionsWrapper}>
						{product.available_colors.map(color => (
							<button
								key={color}
								type="button"
								className={`${styles.colorOptionDetail} ${selectedColor === color ? styles.activeColorDetail : ''}`}
								style={{ backgroundColor: color.toLowerCase() }} // Simples, pode precisar de mapeamento para HEX
								onClick={() => setSelectedColor(color)}
								aria-label={`Selecionar cor ${color}`}
								title={color}
							/>
						))}
					</div>
				</div>
			)}

			<div className={styles.quantitySelector}>
				<label htmlFor={`quantity-detail-${product.id}`} className={styles.quantityLabel}>Quantidade:</label>
				<div className={styles.quantityInputWrapper}>
					<button type="button" onClick={handleQuantityDecrement} aria-label="Diminuir quantidade">-</button>
					<input
						type="number"
						id={`quantity-detail-${product.id}`}
						value={quantity}
						min="1"
						onChange={handleQuantityChange}
						className={styles.quantityInput}
						aria-label="Quantidade do produto"
					/>
					<button type="button" onClick={handleQuantityIncrement} aria-label="Aumentar quantidade">+</button>
				</div>
			</div>
			<button
				type="button"
				onClick={handleAddToCart}
				className={styles.addToCartButton}
				disabled={!!feedbackMessage}
			>
				{feedbackMessage || 'Adicionar à Lista'}
			</button>
		</div>
	);
}