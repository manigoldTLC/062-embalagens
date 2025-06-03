// src/app/busca/page.js

// METADADOS ESTÁTICOS PARA A PÁGINA /busca
// (O título dinâmico será atualizado no cliente via useEffect)
export const metadata = {
	title: 'Resultados da Busca - 062 Embalagens',
	description: 'Encontre os produtos que você procura no catálogo da 062 Embalagens. Variedade em embalagens, artigos para festa, higiene, limpeza e papelaria em Goiânia.',
	// É comum não indexar páginas de resultados de busca interna para evitar conteúdo duplicado
	// ou de baixa qualidade percebida pelo Google, mas a decisão é sua.
	// Se quiser permitir a indexação, remova ou ajuste a linha 'robots' abaixo.
	robots: 'noindex, follow'
};

// A diretiva 'use client' SÓ DEVE ESTAR no topo dos arquivos de componentes que REALMENTE precisam ser Client Components.
// O componente de página em si pode ser um Server Component que renderiza Client Components.
// No entanto, como SearchResults usa useSearchParams, ele precisa ser um Client Component.
// E para usar Suspense com useSearchParams, o componente que o usa diretamente é o que precisa ser cliente.

import { Suspense } from 'react';
import SearchResultsClient from './SearchResultsClient'; // Vamos mover a lógica para este arquivo
import styles from './busca.module.scss'; // Usaremos para o fallback do Suspense

// Componente de Página (Server Component por padrão)
export default function BuscaPage() {
	return (
		<Suspense fallback={<div className={styles.loadingState}>Carregando resultados da busca...</div>}>
			<SearchResultsClient />
		</Suspense>
	);
}