import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ChapterItem = {
  number: number;
  title: string;
  slug: string;
  icon: string;
  description: ReactNode;
};

const ChapterList: ChapterItem[] = [
  {
    number: 1,
    title: 'GUI to BUI to DWC',
    slug: '/gui-to-bui-to-dwc',
    icon: '🖥️',
    description: (
      <>
        Learn the fundamentals of transitioning from BBj GUI applications to Browser User Interface (BUI) and Dynamic Web Client (DWC).
      </>
    ),
  },
  {
    number: 2,
    title: 'Browser Developer Tools, CSS, and Themes',
    slug: '/browser-developer-tools',
    icon: '🎨',
    description: (
      <>
        Master browser Developer Tools, CSS fundamentals, CSS custom properties, and DWC themes for styling your applications.
      </>
    ),
  },
  {
    number: 3,
    title: 'DWC Debugging',
    slug: '/dwc-debugging',
    icon: '🐛',
    description: (
      <>
        Explore debugging techniques specific to the Dynamic Web Client including the DWC debug console and browser tools.
      </>
    ),
  },
  {
    number: 4,
    title: 'Upgrading Apps to DWC',
    slug: '/upgrading-apps',
    icon: '⬆️',
    description: (
      <>
        Learn how to upgrade existing GUI or BUI applications to DWC, including working with ARC files and BBjGrids.
      </>
    ),
  },
  {
    number: 5,
    title: 'DWC Controls With Extended Attributes',
    slug: '/dwc-controls',
    icon: '🎛️',
    description: (
      <>
        Discover BBj controls implemented as web components with extended attributes, themes, and enhanced functionality.
      </>
    ),
  },
  {
    number: 6,
    title: 'Flow Layouts and CSS for Responsive Design',
    slug: '/flow-layouts',
    icon: '📐',
    description: (
      <>
        Master CSS layout strategies including Flexbox and Grid to create responsive BBj applications that adapt to any screen size.
      </>
    ),
  },
  {
    number: 7,
    title: 'Icon Pools',
    slug: '/icon-pools',
    icon: '🎯',
    description: (
      <>
        Learn to use built-in icon pools to easily add icons to your BBj controls without managing image files.
      </>
    ),
  },
  {
    number: 8,
    title: 'Control Validation',
    slug: '/control-validation',
    icon: '✅',
    description: (
      <>
        Implement control validation with visual feedback using built-in validation capabilities and custom validation logic.
      </>
    ),
  },
  {
    number: 9,
    title: 'Browser Constraints',
    slug: '/browser-constraints',
    icon: '🌐',
    description: (
      <>
        Understand browser environment constraints and limitations including file handling, printing, and security considerations.
      </>
    ),
  },
  {
    number: 10,
    title: 'Embedding 3rd Party Components',
    slug: '/embedding-components',
    icon: '🔌',
    description: (
      <>
        Embed third-party JavaScript components like charts, maps, and widgets into your DWC applications.
      </>
    ),
  },
  {
    number: 11,
    title: 'Advanced Responsive Design',
    slug: '/advanced-responsive',
    icon: '📱',
    description: (
      <>
        Master advanced responsive design techniques including media queries and CSS transitions for engaging user experiences.
      </>
    ),
  },
  {
    number: 12,
    title: 'Deployment Options',
    slug: '/deployment',
    icon: '🚀',
    description: (
      <>
        Explore deployment options including embedded deployment and Progressive Web Apps (PWA) for mobile and offline support.
      </>
    ),
  },
];

function ChapterCard({number, title, slug, icon, description}: ChapterItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.chapterIcon}>{icon}</div>
        <div className={styles.chapterNumber}>Chapter {number}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Link to={slug} className={styles.chapterLink}>
            {title}
          </Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ChapterCards(): ReactNode {
  return (
    <section className={styles.chapters}>
      <div className="container">
        <div className="row">
          {ChapterList.map((props, idx) => (
            <ChapterCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
