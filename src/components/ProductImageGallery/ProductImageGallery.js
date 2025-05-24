// src/components/ProductImageGallery/ProductImageGallery.js
'use client'; // ESSENCIAL: Define este como um Componente de Cliente

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProductImageGallery.module.scss';

export default function ProductImageGallery({ images = [], productName = "Produto" }) {
	// Define a imagem inicial. Se não houver imagens, usa um placeholder.
	const initialImage = images.length > 0
		? images[0]
		: 'https://placehold.co/600x400/E0E0E0/333333?text=Imagem+Indispon%C3%ADvel';

	const [selectedImage, setSelectedImage] = useState(initialImage);

	// Efeito para atualizar a imagem selecionada se as props de 'images' mudarem
	// Isso é útil se o componente for reutilizado e as imagens mudarem dinamicamente.
	useEffect(() => {
		if (images.length > 0 && !images.includes(selectedImage)) {
			setSelectedImage(images[0]);
		} else if (images.length === 0) {
			setSelectedImage('https://placehold.co/600x400/E0E0E0/333333?text=Imagem+Indispon%C3%ADvel');
		}
	}, [images, selectedImage]);


	if (!images || images.length === 0) {
		// Caso não haja imagens, exibe apenas o placeholder principal
		return (
			<div className={styles.galleryContainer}>
				<div className={styles.mainImageWrapper}>
					<Image
						src={selectedImage} // Será o placeholder definido em initialImage/useEffect
						alt={`Imagem principal de ${productName}`}
						width={600} // Tamanho base para a imagem principal
						height={450} // Tamanho base para a imagem principal
						objectFit="contain" // 'contain' para ver a imagem toda, 'cover' para preencher
						priority // A primeira imagem é importante
						unoptimized={selectedImage.includes('placehold.co')}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.galleryContainer}>
			<div className={styles.mainImageWrapper}>
				<Image
					src={selectedImage}
					alt={`Imagem principal de ${productName}`}
					width={600}
					height={450}
					objectFit="contain"
					priority
					unoptimized={selectedImage.includes('placehold.co')}
					key={selectedImage} // Adicionar key para forçar re-renderização se src mudar (útil para transições)
				/>
			</div>

			{images.length > 1 && (
				<div className={styles.thumbnailGrid}>
					{images.map((imgUrl, index) => (
						<button
							key={index}
							className={`${styles.thumbnailButton} ${selectedImage === imgUrl ? styles.activeThumbnail : ''}`}
							onClick={() => setSelectedImage(imgUrl)}
							aria-label={`Ver imagem ${index + 1} de ${productName}`}
						// Considerar aria-current="true" para o thumbnail ativo,
						// mas a classe .activeThumbnail já dá o feedback visual.
						>
							<div className={styles.thumbnailImageWrapper}>
								<Image
									src={imgUrl}
									alt={`Miniatura ${index + 1} de ${productName}`}
									width={100}  // Largura da miniatura
									height={75} // Altura da miniatura
									objectFit="cover"
									unoptimized={imgUrl.includes('placehold.co')}
								/>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}