import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.footerGrid}>
					{/* Coluna 1: Sobre / Logo */}
					<div className={styles.footerColumn}>
						<Link href="/" className={styles.footerLogoLink}>
							{/* Usar uma versão do logo que funcione bem no fundo do footer */}
							{/* Pode ser a mesma branca, ou uma específica para fundos escuros */}
							<Image
								src="/images/logo-062-embalagens-branca.png" // Ou uma versão monocromática
								alt="062 Embalagens"
								width={120} // Ajuste conforme necessário
								height={50} // Ajuste conforme necessário
							/>
						</Link>
						<p className={styles.footerSlogan}>
							Sua solução completa em embalagens, festas e muito mais em Goiânia!
						</p>
					</div>

					{/* Coluna 2: Links Rápidos */}
					<div className={styles.footerColumn}>
						<h4>Navegação</h4>
						<ul>
							<li><Link href="/">Início</Link></li>
							<li><Link href="/produtos">Produtos</Link></li>
							<li><Link href="/sobre">Sobre Nós</Link></li>
							<li><Link href="/contato">Contato</Link></li>
							{/* Adicione mais links conforme necessário, ex: Política de Privacidade */}
							{/* <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li> */}
						</ul>
					</div>

					{/* Coluna 3: Contato */}
					<div className={styles.footerColumn}>
						<h4>Entre em Contato</h4>
						<address>
							{/* Se tiver endereço físico: */}
							{/* Rua Exemplo, Nº 123, Setor Bueno<br />
              Goiânia - GO, CEP 74000-000<br /> */}
							<a href="tel:+556200000000">(62) 3000-0000</a><br />
							<a href="https://wa.me/5562900000000" target="_blank" rel="noopener noreferrer">(62) 90000-0000 (WhatsApp)</a><br />
							<a href="mailto:contato@062embalagens.com.br">contato@062embalagens.com.br</a>
						</address>
						{/* Opcional: Horário de funcionamento */}
						{/* <p className={styles.openingHours}>Seg - Sex: 8h às 18h | Sáb: 8h às 12h</p> */}
					</div>

					{/* Opcional: Coluna 4: Redes Sociais */}
					<div className={styles.footerColumn}>
						<h4>Siga-nos</h4>
						<div className={styles.socialIcons}>
							<a href="https://facebook.com/062embalagens" target="_blank" rel="noopener noreferrer" aria-label="Facebook 062 Embalagens">
								<FaFacebook />
							</a>
							<a href="https://instagram.com/062embalagens" target="_blank" rel="noopener noreferrer" aria-label="Instagram 062 Embalagens">
								<FaInstagram />
							</a>
							<a href="https://wa.me/5562900000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp 062 Embalagens">
								<FaWhatsapp />
							</a>
						</div>
					</div>

				</div>

				<div className={styles.footerBottom}>
					<p>&copy; {currentYear} 062 Embalagens. Todos os direitos reservados.</p>
					{/* <p>Desenvolvido com <span role="img" aria-label="coração">❤️</span> por [Seu Nome/Empresa]</p> */}
				</div>
			</div>
		</footer>
	);
}