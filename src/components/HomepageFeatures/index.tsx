import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'BBj to Web',
    Svg: require('@site/static/img/bbj-to-web.svg').default,
    description: (
      <>
        Learn how to transform your BBj applications into modern web experiences
        using the Dynamic Web Client.
      </>
    ),
  },
  {
    title: 'Modern CSS Layouts',
    Svg: require('@site/static/img/css-layouts.svg').default,
    description: (
      <>
        Master CSS Grid and Flexbox to create responsive, professional layouts
        for your DWC applications.
      </>
    ),
  },
  {
    title: 'Control Validation',
    Svg: require('@site/static/img/validation.svg').default,
    description: (
      <>
        Implement robust input validation with custom validators and real-time
        user feedback.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
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
