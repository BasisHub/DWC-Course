import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          BBj DWC Training
        </Heading>
        <p className={styles.heroSubtitle}>
          A comprehensive 12-chapter course to master the Dynamic Web Client
          &mdash; from first concepts to production deployment.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg"
            to="/gui-to-bui-to-dwc">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}
