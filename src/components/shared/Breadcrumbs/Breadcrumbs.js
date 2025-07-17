import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';
import { FaChevronRight } from 'react-icons/fa';

export default function Breadcrumbs({ crumbs }) {
  if (!crumbs || crumbs.length === 0) {
    return null;
  }

  const siteBaseUrl = 'https://www.062embalagens.com.br';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": crumb.href ? `${siteBaseUrl}${crumb.href}` : undefined
    })),
  };

  return (
    <nav aria-label="Trilha de navegação" className={styles.breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key="breadcrumb-jsonld"
      />
      
      <ol className={styles.breadcrumbs__list}>
        {crumbs.map((crumb, index) => (
          <li key={index} className={styles.breadcrumbs__item}>
            {index < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} className={styles.breadcrumbs__link}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbs__current} aria-current="page">
                {crumb.label}
              </span>
            )}
            
            {index < crumbs.length - 1 && (
              <span className={styles.breadcrumbs__separator} aria-hidden="true">
                <FaChevronRight />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}