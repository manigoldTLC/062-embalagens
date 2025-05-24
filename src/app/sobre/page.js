// src/app/sobre/page.js
import Image from 'next/image';
import styles from './sobre.module.scss';

// METADADOS PARA A PÁGINA "SOBRE NÓS" (SEO!)
export const metadata = {
	title: 'Sobre Nós - Conheça a 062 Embalagens',
	description: 'Saiba mais sobre a história, missão e valores da 062 Embalagens, sua parceira em embalagens, festas e utilidades em Goiânia.',
	alternates: {
		canonical: 'https://www.062embalagens.com.br/sobre', // ATUALIZE QUANDO TIVER O DOMÍNIO
	},
	openGraph: {
		title: 'Sobre a 062 Embalagens',
		description: 'Descubra a paixão e o compromisso da 062 Embalagens com seus clientes.',
		url: 'https://www.062embalagens.com.br/sobre', // ATUALIZE
		type: 'article', // 'article' é adequado para uma página "Sobre Nós"
	},
	// Twitter card herdará do openGraph se não especificado aqui
};

export default function SobreNosPage() {
	return (
		<div className={styles.sobreContainer}>
			<header className={styles.pageHeader}>
				<h1>Nossa História: Paixão por Servir</h1>
				<p className={styles.subheadline}>
					Conheça a trajetória e os valores que fazem da 062 Embalagens a sua melhor escolha em Goiânia.
				</p>
			</header>

			<section className={styles.contentSection}>
				<div className={styles.textBlock}>
					<h2>Quem Somos</h2>
					<p>
						A 062 Embalagens nasceu em [Ano de Fundação, ex: 2015] em Goiânia, com o objetivo de oferecer soluções completas
						e de qualidade para as necessidades de embalagens, artigos para festa, produtos de higiene e limpeza,
						e itens de papelaria para nossos clientes. O nome "062" é uma homenagem ao código de área da nossa querida
						cidade, reforçando nosso compromisso com a comunidade local.
					</p>
					<p>
						Desde o início, nossa prioridade tem sido a satisfação do cliente, buscando sempre os melhores produtos,
						preços justos e um atendimento diferenciado e atencioso. Acreditamos que cada embalagem carrega mais
						do que um produto; carrega carinho, cuidado e a intenção de quem presenteia ou utiliza.
					</p>
				</div>

				{/* Opcional: Adicionar uma imagem representativa da loja ou equipe */}
				{/* <div className={styles.imageBlock}>
          <Image
            src="/images/loja-frente.jpg" // Crie esta imagem em public/images
            alt="Fachada da loja 062 Embalagens"
            width={500}
            height={350}
            className={styles.featureImage}
          />
        </div> */}
			</section>

			<section className={styles.contentSection}>
				<div className={styles.textBlock}>
					<h2>Nossa Missão</h2>
					<p>
						Facilitar o dia a dia dos nossos clientes, oferecendo uma vasta gama de produtos de qualidade que atendam
						suas necessidades de forma prática e criativa, seja para celebrar momentos especiais, organizar o lar,
						cuidar da higiene ou para as atividades de estudo e trabalho.
					</p>
				</div>
				<div className={styles.textBlock}>
					<h2>Nossa Visão</h2>
					<p>
						Ser a loja de referência em Goiânia e região no segmento de embalagens e utilidades, reconhecida pela
						excelência no atendimento, variedade de produtos e por contribuir positivamente com a comunidade.
					</p>
				</div>
				<div className={styles.textBlock}>
					<h2>Nossos Valores</h2>
					<ul>
						<li>**Foco no Cliente:** Entender e atender às necessidades dos nossos clientes com proatividade e cortesia.</li>
						<li>**Qualidade:** Oferecer produtos duráveis, funcionais e com bom acabamento.</li>
						<li>**Variedade:** Manter um portfólio diversificado que acompanhe as tendências e demandas.</li>
						<li>**Ética e Transparência:** Conduzir nossos negócios com honestidade e clareza.</li>
						<li>**Compromisso Local:** Valorizar e contribuir para o desenvolvimento da nossa comunidade em Goiânia.</li>
					</ul>
				</div>
			</section>
			{/* Adicione mais seções se desejar, como "Nossa Equipe", etc. */}
		</div>
	);
}