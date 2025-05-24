// src/app/contato/page.js
import Image from 'next/image'; // Opcional, para um mapa estático ou imagem de fachada
import styles from './contato.module.scss';
// Opcional: Ícones para telefone, email, etc. (ex: react-icons)
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

// METADADOS PARA A PÁGINA "CONTATO" (SEO!)
export const metadata = {
	title: 'Contato - Fale com a 062 Embalagens em Goiânia',
	description: 'Entre em contato com a 062 Embalagens. Encontre nosso telefone, WhatsApp, email e endereço em Goiânia. Estamos prontos para atender você!',
	alternates: {
		canonical: 'https://www.062embalagens.com.br/contato', // ATUALIZE QUANDO TIVER O DOMÍNIO
	},
	openGraph: {
		title: 'Fale com a 062 Embalagens - Contato em Goiânia',
		description: 'Informações de contato da 062 Embalagens. Ligue, envie uma mensagem ou visite-nos!',
		url: 'https://www.062embalagens.com.br/contato', // ATUALIZE
		type: 'profile', // 'profile' pode ser usado para uma página de contato de uma organização
		// ou 'website' se preferir.
	},
};

export default function ContatoPage() {
	// Preencha com seus dados reais!
	const contactInfo = {
		phone: '(62) 3000-0000',
		phoneHref: 'tel:+556230000000',
		whatsapp: '(62) 90000-0000',
		whatsappHref: 'https://wa.me/5562900000000', // Substitua pelo seu número real
		email: 'contato@062embalagens.com.br',
		emailHref: 'mailto:contato@062embalagens.com.br',
		addressLine1: 'Av. Exemplo, Quadra X, Lote Y, Nº 1234',
		addressLine2: 'Setor Bueno, Goiânia - GO',
		zipCode: '74000-000',
		googleMapsLink: 'https://www.google.com/maps/search/?api=1&query=Seu+Endereço+Completo+Goiânia', // Link para o Google Maps
		openingHours: [
			'Segunda a Sexta: 08:00 - 18:00',
			'Sábado: 08:00 - 12:00',
			'Domingo: Fechado',
		],
	};

	return (
		<div className={styles.contatoContainer}>
			<header className={styles.pageHeader}>
				<h1>Entre em Contato Conosco</h1>
				<p className={styles.subheadline}>
					Estamos aqui para ajudar! Tire suas dúvidas, envie sugestões ou faça seu pedido.
				</p>
			</header>

			<div className={styles.contactGrid}>
				<section className={styles.contactDetails}>
					<h2>Nossas Informações</h2>
					{/* Telefone */}
					<div className={styles.contactItem}>
						{/* <FaPhone className={styles.icon} /> */}
						<strong>Telefone:</strong>
						<a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
					</div>

					{/* WhatsApp */}
					<div className={styles.contactItem}>
						{/* <FaWhatsapp className={styles.icon} /> */}
						<strong>WhatsApp:</strong>
						<a href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
							{contactInfo.whatsapp}
						</a>
					</div>

					{/* Email */}
					<div className={styles.contactItem}>
						{/* <FaEnvelope className={styles.icon} /> */}
						<strong>Email:</strong>
						<a href={contactInfo.emailHref}>{contactInfo.email}</a>
					</div>

					{/* Endereço (se houver loja física) */}
					{contactInfo.addressLine1 && (
						<div className={styles.contactItem}>
							{/* <FaMapMarkerAlt className={styles.icon} /> */}
							<strong>Nosso Endereço:</strong>
							<address>
								{contactInfo.addressLine1}<br />
								{contactInfo.addressLine2}<br />
								CEP: {contactInfo.zipCode}<br />
								<a href={contactInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
									Ver no Google Maps
								</a>
							</address>
						</div>
					)}

					{/* Horário de Funcionamento */}
					{contactInfo.openingHours && contactInfo.openingHours.length > 0 && (
						<div className={styles.contactItem}>
							<strong>Horário de Funcionamento:</strong>
							<ul>
								{contactInfo.openingHours.map((line, index) => (
									<li key={index}>{line}</li>
								))}
							</ul>
						</div>
					)}
				</section>

				{contactInfo.addressLine1 && (
					<section className={styles.mapSectionIframe}>
						<h3>Nossa Localização</h3>
						<div className={styles.mapWrapper}>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d244579.2601750034!2d-49.3032074!3d-16.6993402!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef3386d755bb1%3A0x52e26da09c66248e!2s062%20Embalagens%20Goi%C3%A2nia!5e0!3m2!1spt-BR!2sbr!4v1748060204987!5m2!1spt-BR!2sbr"
								width="100%"
								height="450"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title={`Mapa da localização da 062 Embalagens em ${contactInfo.addressLine2}`}
							></iframe>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}