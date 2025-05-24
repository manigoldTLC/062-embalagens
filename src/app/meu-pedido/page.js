'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCartItems,
	selectCartTotal,
	selectCartItemCount,
	updateItemQuantity,
	removeItem,
	clearCart
} from '@/lib/store/features/cart/cartSlice';
import styles from './meuPedido.module.scss';
import { useEffect } from 'react';

export default function MeuPedidoPage() {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);
	const itemCount = useSelector(selectCartItemCount);

	const handleQuantityChange = (cartItemId, newQuantity) => {
		const quantityNum = parseInt(newQuantity, 10);
		if (quantityNum >= 1) {
			dispatch(updateItemQuantity({ cartItemId, quantity: quantityNum }));
		} else if (newQuantity === "" || quantityNum === 0) { // Allow deleting to set to 1 or handle empty input
			dispatch(updateItemQuantity({ cartItemId, quantity: 1 }));
		}
	};

	const handleRemoveItem = (cartItemId) => {
		dispatch(removeItem(cartItemId));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	const formatPrice = (price) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price);
	};

	const generateOrderMessage = () => {
		let message = "Olá, 062 Embalagens!\n\nGostaria de fazer um pedido com os seguintes itens:\n\n";
		cartItems.forEach(item => {
			message += `- ${item.name}`;
			if (item.selectedColor) {
				message += ` (Cor: ${item.selectedColor})`;
			}
			message += ` (ID Base: ${item.id})\n`;
			message += `  Quantidade: ${item.quantity}\n`;
			message += `  Preço Unit.: ${formatPrice(parseFloat(item.price))}\n`;
			message += `  Subtotal: ${formatPrice(parseFloat(item.price) * item.quantity)}\n\n`;
		});
		message += `Total de Itens: ${itemCount}\n`;
		message += `Valor Total Estimado: ${formatPrice(cartTotal)}\n\n`;
		message += "Aguardo contato para confirmar e combinar pagamento/entrega.\n\n";
		message += "Obrigado(a)!";
		return message;
	};

	const handleWhatsAppOrder = () => {
		if (cartItems.length === 0) {
			alert('Sua lista de pedido está vazia!');
			return;
		}
		const message = generateOrderMessage();
		const whatsappNumber = "5562000000000"; // SUBSTITUA PELO SEU NÚMERO REAL
		const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, '_blank');
	};

	const handleEmailOrder = () => {
		if (cartItems.length === 0) {
			alert('Sua lista de pedido está vazia!');
			return;
		}
		const recipientEmail = "contato@062embalagens.com.br"; // SEU EMAIL DE PEDIDOS
		const subject = encodeURIComponent("Novo Pedido do Catálogo Online - 062 Embalagens");
		const body = encodeURIComponent(generateOrderMessage());
		const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
		window.location.href = mailtoLink;
	};

	useEffect(() => {
		document.title = "Minha Lista de Pedido - 062 Embalagens";
	}, []);

	if (cartItems.length === 0) {
		return (
			<div className={`${styles.meuPedidoContainer} ${styles.emptyCartContainer}`}>
				<header className={styles.pageHeader}>
					<h1>Minha Lista de Pedido</h1>
				</header>
				<p>Sua lista de pedido está vazia.</p>
				<Link href="/produtos" className={styles.actionButton}>
					Ver Produtos
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.meuPedidoContainer}>
			<header className={styles.pageHeader}>
				<h1>Minha Lista de Pedido</h1>
				<p>Confira os itens selecionados e finalize seu pedido.</p>
			</header>

			<div className={styles.cartItemsList}>
				{cartItems.map(item => (
					<div key={item.cartItemId} className={styles.cartItem}>
						<div className={styles.itemImage}>
							<Image
								src={item.image || 'https://placehold.co/80x80/E0E0E0/333333?text=Sem+Img'}
								alt={item.name}
								width={80}
								height={80}
								objectFit="cover"
								unoptimized={item.image && item.image.includes('placehold.co')}
							/>
						</div>
						<div className={styles.itemDetails}>
							<Link href={`/produtos/${item.slug}`} className={styles.itemName}>
								{item.name}
								{item.selectedColor && <span className={styles.itemSelectedColor}> - Cor: {item.selectedColor}</span>}
							</Link>
							<p className={styles.itemPrice}>{formatPrice(parseFloat(item.price))}</p>
						</div>
						<div className={styles.itemQuantity}>
							<label htmlFor={`qty-${item.cartItemId}`} className="visually-hidden">Quantidade para {item.name}</label>
							<input
								type="number"
								id={`qty-${item.cartItemId}`}
								value={item.quantity}
								min="1"
								onChange={(e) => handleQuantityChange(item.cartItemId, e.target.value)}
								className={styles.quantityInput}
								aria-label={`Quantidade de ${item.name}`}
							/>
						</div>
						<div className={styles.itemSubtotal}>
							{formatPrice(parseFloat(item.price) * item.quantity)}
						</div>
						<button
							onClick={() => handleRemoveItem(item.cartItemId)}
							className={styles.removeItemButton}
							aria-label={`Remover ${item.name} ${item.selectedColor || ''} da lista`}
						>
							&times;
						</button>
					</div>
				))}
			</div>

			<div className={styles.cartSummary}>
				<div className={styles.summaryActions}>
					<button onClick={handleClearCart} className={`${styles.actionButton} ${styles.clearButton}`}>
						Limpar Lista
					</button>
				</div>
				<div className={styles.summaryTotals}>
					<p>Total de Itens: <strong>{itemCount}</strong></p>
					<p className={styles.grandTotal}>Valor Total: <strong>{formatPrice(cartTotal)}</strong></p>
					<div className={styles.finalizeActions}>
						<button onClick={handleWhatsAppOrder} className={`${styles.actionButton} ${styles.finalizeButton}`}>
							Enviar via WhatsApp
						</button>
						<button onClick={handleEmailOrder} className={`${styles.actionButton} ${styles.emailButton}`}>
							Enviar via Email
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}