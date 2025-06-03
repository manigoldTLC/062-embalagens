"use client";

import Link from 'next/link';
import styles from './HomepageContactSection.module.scss';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const HomepageContactSection = () => {
	const whatsappNumber = "5562991525978";
	const phoneNumber = "(62) 99152-5978";
	const emailAddress = "contato@062embalagens.com.br";
	const fullAddress = "Rua 44, Galeria Hyper Modas, Loja 45, Setor Norte Ferroviário, Goiânia - GO, Brazil 74063300";

	const handleSubmit = (event) => {
		event.preventDefault();
		alert("Obrigado pela sua mensagem! (Funcionalidade de envio não implementada neste catálogo).");
	};

	return (
		<section className={styles.contactSection}>
			<div className={styles.container}>
				<div className={styles.leftColumn}>
					<h2 className={styles.sectionTitle}>Fale Conosco</h2>
					<p className={styles.sectionDescription}>
						Tem alguma dúvida ou precisa de um orçamento personalizado? Nossa equipe da 062 Embalagens está pronta para te ajudar a encontrar as melhores soluções.
					</p>
					<div className={styles.contactInfo}>
						<div className={styles.infoItem}>
							<FaWhatsapp className={styles.icon} />
							<a href={`https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20mais%20informações.`} target="_blank" rel="noopener noreferrer" className={styles.link}>
								{phoneNumber} (WhatsApp)
							</a>
						</div>
						<div className={styles.infoItem}>
							<FaEnvelope className={styles.icon} />
							<a href={`mailto:${emailAddress}`} className={styles.link}>
								{emailAddress}
							</a>
						</div>
						<div className={styles.infoItem}>
							<FaMapMarkerAlt className={styles.icon} />
							<span>{fullAddress}</span>
						</div>
					</div>
					<div className={styles.moreInfoLinkWrapper}>
						<Link href="/contato" className={styles.moreInfoLink}>
							Ver todos os detalhes de contato <FaArrowRight className={styles.arrowIcon} />
						</Link>
					</div>
				</div>
				<div className={styles.rightColumn}>
					<div className={styles.formWrapper}>
						<h3 className={styles.formTitle}>Envie uma Mensagem</h3>
						<form className={styles.contactForm} onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<label htmlFor="home-contact-name" className={styles.label}>Nome Completo</label>
								<input type="text" id="home-contact-name" name="name" className={styles.input} placeholder="Seu nome completo" required />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="home-contact-email" className={styles.label}>Email</label>
								<input type="email" id="home-contact-email" name="email" className={styles.input} placeholder="exemplo@email.com" required />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="home-contact-phone" className={styles.label}>Telefone (Opcional)</label>
								<input type="tel" id="home-contact-phone" name="phone" className={styles.input} placeholder="(62) 99999-9999" />
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="home-contact-message" className={styles.label}>Sua Mensagem</label>
								<textarea id="home-contact-message" name="message" rows="5" className={styles.textarea} placeholder="Digite sua dúvida ou solicitação aqui..." required></textarea>
							</div>
							<button type="submit" className={styles.submitButton}>Enviar Mensagem</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomepageContactSection;