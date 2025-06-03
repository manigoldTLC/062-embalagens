import BestSellersSection from "@/containers/Homepage/BestSellersSection/BestSellersSection";
import FeaturedCategoriesSection from "@/containers/Homepage/FeaturedCategoriesSection/FeaturedCategoriesSection";
import FeaturedProductsSection from "@/containers/Homepage/FeaturedProductsSection/FeaturedProductsSection";
import HeroSection from "@/containers/Homepage/HeroSection/HeroSection";
import HomepageContactSection from "@/containers/Homepage/HomepageContactSection/HomepageContactSection";
import NewArrivalsSection from "@/containers/Homepage/NewArrivalsSection/NewArrivalsSection";


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
      <NewArrivalsSection />
      <FeaturedProductsSection />
      <BestSellersSection />
      <HomepageContactSection />
    </>
  );
}