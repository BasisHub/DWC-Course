import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '12 Progressive Chapters',
    description: (
      <>
        A structured curriculum that takes you from BBj GUI fundamentals
        through advanced responsive design and production deployment.
      </>
    ),
  },
  {
    title: 'Hands-On Code Samples',
    description: (
      <>
        Every chapter includes runnable BBj source files so you can
        experiment, modify, and learn by doing.
      </>
    ),
  },
  {
    title: 'Modern Web Standards',
    description: (
      <>
        Learn CSS Grid, Flexbox, web components, theming, and responsive
        design patterns used in today's web applications.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className={styles.featureCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
