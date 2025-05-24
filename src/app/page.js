// src/app/page.js
// Metadata permanece o mesmo

import FeaturedCategoriesSection from "@/containers/Homepage/FeaturedCategoriesSection/FeaturedCategoriesSection";
import HeroSection from "@/containers/Homepage/HeroSection/HeroSection";

// import styles from './page.module.scss'; // Pode não ser mais necessário ou ter poucos estilos

export const metadata = {
  title: '062 Embalagens - Loja de Embalagens e Artigos para Festa em Goiânia',
  description: 'Sua principal loja em Goiânia para embalagens de todos os tipos, artigos para festa, produtos de higiene, limpeza e itens de papelaria. Qualidade, variedade e o melhor atendimento!',
  alternates: {
    canonical: 'https://www.062embalagens.com.br', // ATUALIZE QUANDO TIVER O DOMÍNIO
  },
  openGraph: {
    title: '062 Embalagens - Loja de Embalagens e Artigos para Festa em Goiânia',
    description: 'Sua principal loja em Goiânia para embalagens de todos os tipos e muito mais!',
    url: 'https://www.062embalagens.com.br', // ATUALIZE
  },
  twitter: {
    title: '062 Embalagens - Loja de Embalagens e Artigos para Festa em Goiânia',
    description: 'Sua principal loja em Goiânia para embalagens de todos os tipos e muito mais!',
  }
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategoriesSection />
    </>
  );
}