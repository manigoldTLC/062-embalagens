// src/app/layout.js
import { Open_Sans, Montserrat } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '../styles/globals.scss';
import StoreProvider from '@/components/StoreProvider/StoreProvider';

const openSans = Open_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-open-sans',
	display: 'swap',
});

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['500', '700', '800'],
	variable: '--font-montserrat',
	display: 'swap',
});

// --- METADADOS GLOBAIS (como antes) ---
export const metadata = {
	title: {
		default: '062 Embalagens - Loja de Embalagens em Goiânia',
		template: '%s | 062 Embalagens',
	},
	description: 'Encontre na 062 Embalagens a maior variedade de embalagens para presente, artigos de festa, produtos de higiene, limpeza e papelaria em Goiânia. Qualidade e preço baixo!',
	// ... (resto dos seus metadados: keywords, openGraph, twitter, robots, icons)
	// Mantenha sua URL base correta aqui para openGraph e alternates.canonical se tiver uma URL canônica para o site todo.
	// Ex:
	// alternates: {
	//   canonical: 'https://www.062embalagens.com.br',
	// },
	// openGraph: {
	//   url: 'https://www.062embalagens.com.br',
	//   siteName: '062 Embalagens',
	//   // ... resto
	// }
};

// --- DADOS ESTRUTURADOS (JSON-LD) ---
const websiteStructuredData = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"name": "062 Embalagens",
	"url": "https://www.062embalagens.com.br", // <-- SUBSTITUA PELA SUA URL REAL
	"potentialAction": { // Para o Sitelinks Search Box
		"@type": "SearchAction",
		"target": {
			"@type": "EntryPoint",
			"urlTemplate": "https://www.062embalagens.com.br/produtos?q={search_term_string}" // <-- AJUSTE SE TIVER BUSCA
		},
		"query-input": "required name=search_term_string"
	}
};

// PREENCHA COM OS DADOS REAIS DA 062 EMBALAGENS!
const localBusinessStructuredData = {
	"@context": "https://schema.org",
	"@type": "Store", // Ou "LocalBusiness", "HomeGoodsStore", etc. "Store" é bom para varejo.
	"name": "062 Embalagens",
	"url": "https://www.062embalagens.com.br", // <-- SUBSTITUA PELA SUA URL REAL
	"logo": "https://www.062embalagens.com.br/images/logo-062-og.png", // <-- SUBSTITUA PELA URL REAL DO SEU LOGO (um arquivo .png ou .jpg)
	"image": "https://www.062embalagens.com.br/images/fachada-loja.jpg", // <-- SUBSTITUA PELA URL DE UMA IMAGEM REPRESENTATIVA DA LOJA (opcional, mas bom)
	"description": "Loja especializada em embalagens, artigos para festa, produtos de higiene e limpeza, e papelaria em Goiânia.",
	"telephone": "+556230000000", // <-- SUBSTITUA PELO SEU TELEFONE REAL no formato E.164
	"email": "contato@062embalagens.com.br", // <-- SUBSTITUA PELO SEU EMAIL REAL
	"address": {
		"@type": "PostalAddress",
		"streetAddress": "Av. Exemplo, Quadra X, Lote Y, Nº 1234", // <-- SUBSTITUA
		"addressLocality": "Goiânia",
		"addressRegion": "GO",
		"postalCode": "74000-000", // <-- SUBSTITUA
		"addressCountry": "BR"
	},
	"geo": { // Opcional, mas EXCELENTE para SEO Local
		"@type": "GeoCoordinates",
		"latitude": "-16.6869",  // <-- SUBSTITUA PELA LATITUDE REAL (Ex: Goiânia)
		"longitude": "-49.2648" // <-- SUBSTITUA PELA LONGITUDE REAL (Ex: Goiânia)
	},
	"openingHoursSpecification": [ // Ajuste os horários ou remova se não quiser especificar
		{
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday"
			],
			"opens": "08:00", // Formato HH:MM
			"closes": "18:00"
		},
		{
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": "Saturday",
			"opens": "08:00",
			"closes": "12:00"
		}
		// Se fechar no Domingo, não precisa adicionar, ou pode adicionar com opens/closes iguais se a ferramenta de teste reclamar
	],
	// "priceRange": "$$", // Opcional: Indique a faixa de preço (ex: $, $$, $$$)
	"sameAs": [ // Opcional: Links para suas redes sociais
		// "https://www.facebook.com/sua_pagina_062embalagens",
		// "https://www.instagram.com/062embalagens"
	]
};


export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR" className={`${openSans.variable} ${montserrat.variable}`}>
			<head>
				{/* Script para WebSite Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
				/>
				{/* Script para LocalBusiness/Store Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
				/>
				{/* Favicons e outras tags <head> que não são gerenciadas pelo `metadata` podem ir aqui,
            mas a maioria deve estar no objeto `metadata` ou em arquivos na pasta `public`.
        */}
			</head>
			<body>
				<StoreProvider>
					<div className="siteWrapper">
						<a href="#main-content" className="visually-hidden focusable">
							Pular para o Conteúdo Principal
						</a>
						<Header />
						<main id="main-content" className="siteContent">
							{children}
						</main>
						<Footer />
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}