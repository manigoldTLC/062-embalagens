'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cart/cartSlice';
import styles from './ProductCard.module.scss';
import { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';

export default function ProductCard({ product }) {
	const dispatch = useDispatch();

	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(
		product.default_color || (product.available_colors && product.available_colors.length > 0 ? product.available_colors[0] : null)
	);
	const [showFeedback, setShowFeedback] = useState(false);

	useEffect(() => {
		setSelectedColor(product.default_color || (product.available_colors && product.available_colors.length > 0 ? product.available_colors[0] : null));
		setQuantity(1);
		setShowFeedback(false);
	}, [product]);

	const primaryImage = product.images && product.images.length > 0
		? product.images[0]
		: 'https://placehold.co/400x400/E0E0E0/333333?text=Sem+Imagem';

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
		setShowFeedback(true);
		setQuantity(1);
		setTimeout(() => setShowFeedback(false), 2000);
	};

	const handleQuantityChange = (amount) => {
		setQuantity(prev => Math.max(1, prev + amount));
	};

	return (
		<div className={styles.productCard}>
			<Link href={`/produtos/${product.slug}`} className={styles.imageLink} aria-label={`Ver detalhes de ${product.name}`}>
				<div className={styles.imageWrapper}>
					<Image
						src={primaryImage}
						alt={product.name}
						fill
						sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
						className={styles.productImage}
						unoptimized={primaryImage.includes('placehold.co')}
					/>
				</div>
			</Link>

			<div className={styles.content}>
				<Link href={`/produtos/${product.slug}`} className={styles.nameLink}>
					<h3 className={styles.name}>
						{product.name}
						{selectedColor && product.available_colors && <span className={styles.selectedColorName}> ({selectedColor})</span>}
					</h3>
				</Link>
				<p className={styles.price}>{formattedPrice}</p>

				{product.available_colors && product.available_colors.length > 0 && (
					<div className={styles.optionSelector}>
						<span className={styles.selectorLabel}>Cor:</span>
						<div className={styles.colorSwatches}>
							{product.available_colors.map(color => (
								<button
									key={color}
									type="button"
									className={`${styles.colorSwatch} ${selectedColor === color ? styles.activeColor : ''}`}
									style={{ backgroundColor: color.toLowerCase() }}
									onClick={() => setSelectedColor(color)}
									aria-label={`Selecionar cor ${color}`}
									title={color}
								/>
							))}
						</div>
					</div>
				)}

				<div className={`${styles.optionSelector} ${styles.quantityRow}`}>
					<span className={styles.selectorLabel}>Qtd:</span>
					<div className={styles.quantityAdjuster}>
						<button type="button" onClick={() => handleQuantityChange(-1)} aria-label="Diminuir quantidade"><FaMinus /></button>
						<input
							type="number"
							value={quantity}
							min="1"
							onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
							className={styles.quantityInput}
							aria-label="Quantidade do produto"
						/>
						<button type="button" onClick={() => handleQuantityChange(1)} aria-label="Aumentar quantidade"><FaPlus /></button>
					</div>
				</div>

				<button
					type="button"
					onClick={handleAddItem}
					className={`${styles.addToListButton} ${showFeedback ? styles.feedbackActive : ''}`}
					disabled={showFeedback}
				>
					{showFeedback ? (
						<>
							<FaCheckCircle className={styles.feedbackIcon} /> Adicionado
						</>
					) : (
						'Adicionar à Lista'
					)}
				</button>
			</div>
		</div>
	);
}